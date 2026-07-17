import { createFileRoute } from "@tanstack/react-router";
import { SectionCard } from "@/components/curator-portal/primitives";
import { BLUEPRINT_SEED } from "@/data/curator-portal/seeds";

export const Route = createFileRoute("/curator/_studio/blueprint")({
  component: Blueprint,
});

function Blueprint() {
  return (
    <>
      <header>
        <h1 className="cp-page-title">Museum Constitution</h1>
        <p className="cp-page-sub">The living, maintainable representation of the DZ Odyssey blueprint.</p>
      </header>

      <nav aria-label="Blueprint sections" className="cp-row" style={{ gap: 8, flexWrap: "wrap" }}>
        {BLUEPRINT_SEED.map((s) => (
          <a key={s.id} href={`#bp-${s.id}`} style={{ padding: "4px 10px", borderRadius: 999, border: "1px solid var(--cp-border)", fontSize: 12, textDecoration: "none" }}>{s.title}</a>
        ))}
      </nav>

      {BLUEPRINT_SEED.map((s) => (
        <section key={s.id} id={`bp-${s.id}`}>
          <SectionCard title={s.title} subtitle={s.summary}>
            <ul style={{ paddingLeft: 18, listStyle: "disc", fontSize: 13.5, display: "flex", flexDirection: "column", gap: 4 }}>
              {s.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </SectionCard>
        </section>
      ))}
    </>
  );
}
