import React from "react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
};

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Aisha Khan",
    role: "Product Lead",
    bio: "Designs delightful experiences.",
  },
  {
    id: "2",
    name: "Emran H.",
    role: "Backend Engineer",
    bio: "Builds and scales APIs.",
  },
  {
    id: "3",
    name: "Lina M.",
    role: "Frontend Engineer",
    bio: "Creates polished UIs.",
  },
];

const styles: { [k: string]: React.CSSProperties } = {
  container: {
    maxWidth: 980,
    margin: "32px auto",
    padding: "24px",
    fontFamily:
      "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial",
    color: "#0f172a",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    margin: 0,
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    color: "#475569",
  },
  section: {
    background: "#fff",
    borderRadius: 10,
    padding: 18,
    boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
    marginBottom: 18,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  card: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    background: "#f8fafc",
    padding: 12,
    borderRadius: 8,
  },
  avatar: {
    flex: "0 0 56px",
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#0f172a",
    fontSize: 16,
  },
  memberInfo: {
    flex: 1,
  },
  name: {
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
  },
  role: {
    margin: "4px 0 8px",
    color: "#475569",
    fontSize: 13,
  },
  bio: {
    margin: 0,
    fontSize: 13,
    color: "#334155",
  },
  footer: {
    marginTop: 12,
    color: "#475569",
    fontSize: 14,
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AboutUs({
  team = defaultTeam,
}: {
  team?: TeamMember[];
}) {
  return (
    <main style={styles.container} aria-labelledby="about-heading">
      <header style={styles.header}>
        <h1 id="about-heading" style={styles.title}>
          About Us
        </h1>
        <p style={styles.subtitle}>
          We build simple, reliable software that helps teams communicate and
          ship faster. Our focus is on delightful UX, good performance, and
          practical engineering.
        </p>
      </header>

      <section style={styles.section} aria-labelledby="mission-heading">
        <h2
          id="mission-heading"
          style={{ margin: 0, fontSize: 18, fontWeight: 700 }}
        >
          Our mission
        </h2>
        <p style={{ marginTop: 10, color: "#334155" }}>
          Deliver tools that empower teams to collaborate effortlessly and build
          products that matter. We believe in small teams, continuous learning,
          and shipping frequently.
        </p>
      </section>

      <section style={styles.section} aria-labelledby="team-heading">
        <h2
          id="team-heading"
          style={{ margin: 0, fontSize: 18, fontWeight: 700 }}
        >
          Team
        </h2>
        <p style={{ marginTop: 8, marginBottom: 12, color: "#475569" }}>
          A small cross-functional group of engineers, designers, and operators.
        </p>

        <div style={styles.grid}>
          {team.map((m) => (
            <article
              key={m.id}
              style={styles.card}
              aria-label={`${m.name} - ${m.role}`}
            >
              <div style={styles.avatar} aria-hidden>
                {m.avatarUrl ? (
                  <img
                    src={m.avatarUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  initials(m.name)
                )}
              </div>

              <div style={styles.memberInfo}>
                <h3 style={styles.name}>{m.name}</h3>
                <div style={styles.role}>{m.role}</div>
                {m.bio && <p style={styles.bio}>{m.bio}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <strong>Contact</strong>: hello@example.com — Built with care.
      </footer>
    </main>
  );
}
