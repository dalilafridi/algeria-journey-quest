/**
 * ConnectionMap — an interactive "archive connection wall" for a figure.
 *
 * The central figure medallion sits in the middle; related figures, the figure's
 * era, region and themed collections radiate around it, joined by curved bronze
 * connector lines. It is deliberately NOT a technical network graph — it reads
 * like a museum wall of linked exhibit cards. Visitors can filter the node types
 * and click any node to travel to the related page.
 *
 * Accessibility: every node is a real link with an explicit aria-label, focus is
 * visible, filters are toggle buttons, and the curved lines are decorative
 * (aria-hidden). All motion respects prefers-reduced-motion.
 */

import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { figures, type Figure } from "@/data/figures";
import { figureMeta } from "@/data/figureMeta";
import { mapRegions } from "@/data/mapRegions";
import { collectionOf } from "@/lib/figureCollections";
import { eraOfCategory, LEGEND_ERAS } from "@/lib/figureEras";
import {
  DISCOVERY_ROWS,
  ERA_ROWS,
  slugOfRow,
  type DiscoveryRow,
} from "@/lib/figureDiscovery";
import { EraBadge, type EraBadgeKind } from "@/components/brand/EraBadge";
import { t, type Lang } from "@/lib/i18n";

type NodeType = "figure" | "era" | "region" | "theme";

type Nav =
  | { kind: "figure"; figureId: string }
  | { kind: "collection"; slug: string }
  | { kind: "region"; regionId: string };

type MapNode = {
  id: string;
  type: NodeType;
  label: string;
  emoji?: string;
  badge?: EraBadgeKind;
  accent: string;
  nav: Nav;
  ariaLabel: string;
};

const TYPE_ORDER: NodeType[] = ["figure", "era", "region", "theme"];

export function ConnectionMap({ figure: f, lang }: { figure: Figure; lang: Lang }) {
  const [filter, setFilter] = useState<"all" | NodeType>("all");

  const era = LEGEND_ERAS.find((e) => e.id === eraOfCategory(f.category))!;
  const relatedRegion = mapRegions.find(
    (r) => r.id === f.region || (f.region === "mascara-west" && r.id === "oran-west"),
  );

  const nodes = useMemo<MapNode[]>(() => {
    const out: MapNode[] = [];
    const meta = figureMeta[f.id];

    // Era gallery node
    const eraRow = ERA_ROWS.find((r) => r.members.includes(f.id));
    out.push({
      id: `era-${era.id}`,
      type: "era",
      label: t(era.label, lang),
      accent: "var(--brand-gold-deep)",
      badge: era.badge,
      nav: eraRow
        ? { kind: "collection", slug: slugOfRow(eraRow) }
        : { kind: "figure", figureId: f.id },
      ariaLabel:
        (lang === "fr" ? "Ère : " : lang === "ar" ? "الحقبة: " : "Era: ") + t(era.label, lang),
    });

    // Region node
    if (relatedRegion) {
      out.push({
        id: `region-${relatedRegion.id}`,
        type: "region",
        label: t(relatedRegion.name, lang),
        emoji: "◈",
        accent: "var(--primary)",
        nav: { kind: "region", regionId: relatedRegion.id },
        ariaLabel:
          (lang === "fr" ? "Région : " : lang === "ar" ? "المنطقة: " : "Region: ") +
          t(relatedRegion.name, lang),
      });
    }

    // Themed collection nodes (the curated collections this figure belongs to)
    const themedRows: DiscoveryRow[] = DISCOVERY_ROWS.filter((r) => r.members.includes(f.id)).slice(0, 2);
    if (themedRows.length === 0) {
      const col = collectionOf(f.id);
      themedRows.push(
        DISCOVERY_ROWS.find((r) => slugOfRow(r) === col.id) ?? DISCOVERY_ROWS[0],
      );
    }
    for (const row of themedRows) {
      out.push({
        id: `theme-${row.id}`,
        type: "theme",
        label: t(row.label, lang),
        emoji: row.emblem,
        accent: "var(--secondary)",
        nav: { kind: "collection", slug: slugOfRow(row) },
        ariaLabel:
          (lang === "fr" ? "Thème : " : lang === "ar" ? "محور: " : "Theme: ") + t(row.label, lang),
      });
    }

    // Related figure nodes
    const related = Array.from(new Set(meta?.relatedFigureIds ?? []))
      .filter((id) => id !== f.id)
      .map((id) => figures.find((x) => x.id === id))
      .filter((x): x is Figure => Boolean(x))
      .slice(0, 5);
    for (const r of related) {
      const rEra = LEGEND_ERAS.find((e) => e.id === eraOfCategory(r.category))!;
      out.push({
        id: `figure-${r.id}`,
        type: "figure",
        label: t(r.displayName, lang),
        badge: rEra.badge,
        accent: "var(--brand-gold)",
        nav: { kind: "figure", figureId: r.id },
        ariaLabel:
          (lang === "fr" ? "Figure : " : lang === "ar" ? "شخصية: " : "Figure: ") +
          t(r.displayName, lang),
      });
    }

    return out;
  }, [f, lang, era, relatedRegion]);

  const visible = filter === "all" ? nodes : nodes.filter((n) => n.type === filter);
  const counts = useMemo(() => {
    const c: Record<NodeType, number> = { figure: 0, era: 0, region: 0, theme: 0 };
    nodes.forEach((n) => (c[n.type] += 1));
    return c;
  }, [nodes]);

  // Radial layout positions in percentage space (center at 50,50).
  const layout = useMemo(() => {
    const n = visible.length;
    return visible.map((node, i) => {
      const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / Math.max(n, 1);
      const rx = 40;
      const ry = 38;
      const x = 50 + rx * Math.cos(angle);
      const y = 50 + ry * Math.sin(angle);
      // Perpendicular control point for a gentle curve.
      const mx = (50 + x) / 2;
      const my = (50 + y) / 2;
      const dx = x - 50;
      const dy = y - 50;
      const cxp = mx - dy * 0.12;
      const cyp = my + dx * 0.12;
      return { node, x, y, cxp, cyp };
    });
  }, [visible]);

  const titleLabel = lang === "fr" ? "Mur des connexions" : lang === "ar" ? "جدار الروابط" : "Connection wall";
  const allLabel = lang === "fr" ? "Tout" : lang === "ar" ? "الكل" : "All";
  const typeLabel: Record<NodeType, string> = {
    figure: lang === "fr" ? "Figures" : lang === "ar" ? "شخصيات" : "Figures",
    era: lang === "fr" ? "Ères" : lang === "ar" ? "حقب" : "Eras",
    region: lang === "fr" ? "Régions" : lang === "ar" ? "مناطق" : "Regions",
    theme: lang === "fr" ? "Thèmes" : lang === "ar" ? "محاور" : "Themes",
  };

  // "Why these connections matter" storytelling note.
  const whyTitle =
    lang === "fr"
      ? "Pourquoi ces liens comptent"
      : lang === "ar"
        ? "لماذا تهمّ هذه الروابط"
        : "Why these connections matter";
  const whyBody =
    lang === "fr"
      ? `Aucune figure ne se tient seule. ${t(f.displayName, lang)} appartient à une ère, à une région et à des courants partagés avec d'autres légendes — autant de fils qui, tissés ensemble, racontent l'histoire plus vaste de l'Algérie.`
      : lang === "ar"
        ? `لا تقف أي شخصية وحدها. ينتمي ${t(f.displayName, lang)} إلى حقبة ومنطقة وتيارات يتقاسمها مع أساطير أخرى — خيوط تُنسج معًا لتروي قصة الجزائر الأوسع.`
        : `No figure stands alone. ${t(f.displayName, lang)} belongs to an era, a region and shared currents that connect to other legends — threads that, woven together, tell Algeria's larger story.`;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label={titleLabel}>
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label={allLabel} count={nodes.length} />
        {TYPE_ORDER.filter((tp) => counts[tp] > 0).map((tp) => (
          <FilterChip
            key={tp}
            active={filter === tp}
            onClick={() => setFilter(tp)}
            label={typeLabel[tp]}
            count={counts[tp]}
          />
        ))}
      </div>

      {/* Map canvas */}
      <div
        className="relative w-full mx-auto rounded-[1.5rem] border bg-parchment-card overflow-hidden"
        style={{
          maxWidth: "560px",
          aspectRatio: "1 / 1",
          borderColor: "color-mix(in oklab, var(--brand-gold) 26%, var(--border))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] text-[14rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          ⵣ
        </div>

        {/* Curved connectors */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {layout.map(({ node, x, y, cxp, cyp }) => (
            <path
              key={node.id}
              d={`M 50 50 Q ${cxp} ${cyp} ${x} ${y}`}
              fill="none"
              stroke="color-mix(in oklab, var(--brand-gold) 50%, transparent)"
              strokeWidth={1}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Center medallion */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <div
            className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--brand-gold-bright) 55%, var(--card)) 0%, color-mix(in oklab, var(--brand-gold) 30%, var(--card)) 45%, color-mix(in oklab, var(--brand-gold-deep) 28%, var(--card)) 100%)",
              boxShadow:
                "0 0 0 1px color-mix(in oklab, var(--brand-gold) 55%, transparent), var(--shadow-gold-glow)",
            }}
          >
            <span aria-hidden className="text-4xl sm:text-5xl">{f.emoji}</span>
          </div>
          <div className="mt-1.5 text-[11px] sm:text-xs font-bold max-w-[7rem] mx-auto leading-tight truncate">
            {t(f.displayName, lang)}
          </div>
        </div>

        {/* Nodes */}
        {layout.map(({ node, x, y }) => (
          <div
            key={node.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <NodeLink node={node} />
          </div>
        ))}
      </div>

      {/* Why these connections matter */}
      <div
        className="mt-6 rounded-2xl border p-4 sm:p-5"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 24%, var(--border))",
          background: "color-mix(in oklab, var(--brand-gold) 6%, var(--card))",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-bold mb-1.5">
          {whyTitle}
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{whyBody}</p>
      </div>
    </div>
  );
}

function NodeLink({ node }: { node: MapNode }) {
  const cls =
    "group flex flex-col items-center gap-1 w-[5.25rem] sm:w-24 text-center focus-visible:outline-none rounded-xl";
  const chipCls =
    "flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border bg-card transition-transform duration-300 motion-safe:group-hover:scale-110 motion-safe:group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-primary/50";
  const labelCls =
    "text-[10px] sm:text-[11px] font-semibold leading-tight line-clamp-2 text-muted-foreground group-hover:text-primary group-focus-visible:text-primary transition-colors";

  const inner = (
    <>
      <span className={chipCls} style={{ borderColor: `color-mix(in oklab, ${node.accent} 50%, var(--border))` }}>
        {node.badge ? (
          <EraBadge kind={node.badge} size={40} />
        ) : (
          <span aria-hidden className="text-xl" style={{ color: node.accent }}>
            {node.emoji}
          </span>
        )}
      </span>
      <span className={labelCls}>{node.label}</span>
    </>
  );

  if (node.nav.kind === "figure") {
    return (
      <Link to="/figures/$figureId" params={{ figureId: node.nav.figureId }} aria-label={node.ariaLabel} className={cls}>
        {inner}
      </Link>
    );
  }
  if (node.nav.kind === "collection") {
    return (
      <Link
        to="/figures/collection/$collectionId"
        params={{ collectionId: node.nav.slug }}
        aria-label={node.ariaLabel}
        className={cls}
      >
        {inner}
      </Link>
    );
  }
  return (
    <Link to="/map" hash={`region-${node.nav.regionId}`} aria-label={node.ariaLabel} className={cls}>
      {inner}
    </Link>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-9"
      style={{
        borderColor: active ? "color-mix(in oklab, var(--brand-gold) 55%, var(--border))" : "var(--border)",
        background: active ? "color-mix(in oklab, var(--brand-gold) 14%, var(--card))" : "var(--card)",
        color: active ? "var(--brand-gold-deep)" : "var(--muted-foreground)",
      }}
    >
      {label}
      <span className="text-[11px] opacity-70">{count}</span>
    </button>
  );
}
