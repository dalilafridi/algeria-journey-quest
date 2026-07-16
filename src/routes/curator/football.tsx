import { createFileRoute, Link } from "@tanstack/react-router";
import { Workspace, BulletList, StatCard, SectionCard, StatusPill } from "@/components/curator-portal/primitives";
import { getDashboardCounts } from "@/lib/curator-portal/inventory";
import { CLUB_MUSEUMS } from "@/data/clubs";
import { MATCH_THEATERS } from "@/data/matchTheater";

export const Route = createFileRoute("/curator/football")({
  component: FootballStudio,
});

function FootballStudio() {
  const c = getDashboardCounts();
  const clubs = CLUB_MUSEUMS.map((m) => ({ id: m.id, name: (m.name?.en ?? m.id) as string, status: m.status }));
  const theaters = Object.values(MATCH_THEATERS).map((t) => ({ id: t.id, title: t.title?.en ?? t.id }));

  return (
    <Workspace
      title="Football Studio"
      subtitle="Dedicated workspace for the national team, FLN Team, World Cups, AFCON, clubs, players, coaches, stadiums, and Match Theater."
      purpose="Football is one of the museum's most active exhibits. It deserves its own operating workspace to manage the depth of matches, clubs, and cultural context."
      why="Algerian football history spans the FLN Team, 1982 Gijón, AFCON 2019, JS Kabylie's continental dominance, and generations of supporters. Managing it as a first-class collection prevents it from being flattened into a generic content list."
      dataModel={
        <BulletList items={[
          "National team, FLN Team, women's football, youth football",
          "World Cups (participations, matches, goals)",
          "AFCON campaigns and trophies",
          "Players, coaches, historic jerseys, trophies",
          "Stadiums (physical and cultural context)",
          "Match Theater (immersive per-match experiences)",
          "Club Museums (per-club permanent exhibitions)",
          "Supporters, chants, ultras culture",
          "Match archives, photography, film, audio commentary",
        ]} />
      }
      available={
        <>
          <div className="cp-grid cp-grid--stats" style={{ marginBottom: 8 }}>
            <StatCard label="Football exhibits" value={c.football} precision="exact" />
            <StatCard label="Legends" value={c.legends} precision="exact" />
            <StatCard label="Stadiums" value={c.stadiums} precision="exact" />
            <StatCard label="World Cups" value={c.worldCups} precision="exact" />
            <StatCard label="AFCON entries" value={c.afcon} precision="exact" />
            <StatCard label="Trophies" value={c.trophies} precision="exact" />
            <StatCard label="Coaches" value={c.coaches} precision="exact" />
            <StatCard label="FLN players" value={c.flnPlayers} precision="exact" />
            <StatCard label="Club Museums" value={c.clubs} hint={`${c.clubsComplete} complete · ${c.clubsPlaceholder} placeholder`} precision="exact" />
            <StatCard label="Match Theater" value={c.matchTheater} precision="exact" />
          </div>
          <SectionCard title="Club Museum status" subtitle="Only one club is a complete museum today.">
            <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {clubs.map((cl) => (
                <li key={cl.id} className="cp-row" style={{ justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--cp-border)" }}>
                  <span style={{ fontSize: 13 }}>{cl.name}</span>
                  <StatusPill tone={cl.status === "complete" ? "ok" : "warn"}>{cl.status}</StatusPill>
                </li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title="Match Theater catalogue" subtitle="Immersive per-match experiences.">
            <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {theaters.map((t) => (
                <li key={t.id} style={{ fontSize: 13 }}>
                  <Link to={"/theater/$matchId" as never} params={{ matchId: t.id }}>{t.title}</Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        </>
      }
      missing={
        <BulletList items={[
          "Six Club Museums are placeholders — no history, honours, or players yet.",
          "Only one Match Theater (Gijón 1982) is complete.",
          "No women's football or youth football collections.",
          "No supporter / ultras culture exhibit.",
          "No historic jerseys or memorabilia catalog with rights metadata.",
          "No structured match archive (goals, lineups, referees) beyond featured matches.",
        ]} />
      }
      future={
        <BulletList items={[
          "Phase 2: complete the six placeholder Club Museums to museum standard.",
          "Phase 2: expand Match Theater to a curated series of iconic matches.",
          "Phase 3: women's football and youth football as first-class collections.",
          "Phase 3: supporters culture room with rights-cleared media.",
        ]} />
      }
    />
  );
}
