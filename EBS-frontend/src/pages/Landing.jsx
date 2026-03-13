import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: "bi-shield-lock-fill",        title: "Bank-Grade Security",    desc: "JWT authentication, BCrypt encryption, and dual-password protection keep your money safe."        },
    { icon: "bi-arrow-left-right",         title: "Instant Fund Transfers", desc: "Transfer money to any beneficiary in real-time with SMS and email confirmation."                  },
    { icon: "bi-safe2",                    title: "Fixed Deposits",         desc: "Grow your savings with competitive FD rates. Monthly, quarterly, or reinvestment payouts."        },
    { icon: "bi-file-earmark-text-fill",   title: "Account Statements",     desc: "Download PDF or CSV statements for any date range, anytime."                                      },
    { icon: "bi-building-fill",            title: "Virtual ATM",            desc: "Simulate ATM operations — withdrawals, balance inquiry, mini statements — from your browser."    },
    { icon: "bi-graph-up-arrow",           title: "Real-Time Dashboard",    desc: "See all your accounts, balances, recent transactions, and FDs at a glance."                       },
  ];

  const stats = [
    { value: "8+",     label: "Microservices"      },
    { value: "99.9%",  label: "Uptime SLA"         },
    { value: "JWT",    label: "Secured Auth"       },
    { value: "Kafka",  label: "Event Driven"       },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#1a0f0a", minHeight: "100vh", color: "#f5ede8" }}>

      {/* ── Navbar ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 60px", borderBottom: "1px solid rgba(232,184,75,0.15)",
        background: "rgba(26,15,10,0.95)", position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(10px)",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "linear-gradient(135deg, #C49A3C, #8B6914)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, color: "#fff", boxShadow: "0 4px 15px rgba(196,154,60,0.3)",
          }}>
            <i className="bi bi-bank2" />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f5ede8", letterSpacing: 0.5 }}>Aapli Bank</div>
            <div style={{ fontSize: 10, color: "#C49A3C", letterSpacing: 2, textTransform: "uppercase" }}>Digital Banking</div>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Features", "Security", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "#C9ADA7", fontSize: 14, textDecoration: "none", letterSpacing: 0.5,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#C49A3C"}
              onMouseLeave={e => e.target.style.color = "#C9ADA7"}
            >{item}</a>
          ))}
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "linear-gradient(135deg, #C49A3C, #8B6914)",
              border: "none", borderRadius: 8, padding: "10px 24px",
              color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 15px rgba(196,154,60,0.3)", letterSpacing: 0.5,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(196,154,60,0.45)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 15px rgba(196,154,60,0.3)"; }}
          >
            <i className="bi bi-box-arrow-in-right me-2" />Login
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 40px",
        background: "radial-gradient(ellipse at 50% 0%, rgba(196,154,60,0.12) 0%, transparent 70%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative rings */}
        {[300, 500, 700].map((size, i) => (
          <div key={size} style={{
            position: "absolute", width: size, height: size, borderRadius: "50%",
            border: `1px solid rgba(196,154,60,${0.06 - i * 0.015})`,
            top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "relative", maxWidth: 720 }}>
          <div style={{
            display: "inline-block", background: "rgba(196,154,60,0.12)",
            border: "1px solid rgba(196,154,60,0.3)", borderRadius: 99,
            padding: "6px 18px", fontSize: 12, color: "#C49A3C",
            letterSpacing: 2, textTransform: "uppercase", marginBottom: 28,
          }}>
            <i className="bi bi-shield-check me-2" />Distributed Digital Banking Platform
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 700, lineHeight: 1.1,
            color: "#f5ede8", marginBottom: 24,
            textShadow: "0 2px 40px rgba(196,154,60,0.2)",
          }}>
            Banking Built for the<br />
            <span style={{ color: "#C49A3C" }}>Digital Age</span>
          </h1>

          <p style={{
            fontSize: 18, color: "#C9ADA7", lineHeight: 1.7, marginBottom: 40,
            maxWidth: 520, margin: "0 auto 40px",
          }}>
            A production-grade microservices banking platform with real-time transfers,
            fixed deposits, virtual ATM, and enterprise-level security.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "linear-gradient(135deg, #C49A3C, #8B6914)",
                border: "none", borderRadius: 10, padding: "14px 36px",
                color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer",
                boxShadow: "0 6px 24px rgba(196,154,60,0.35)", letterSpacing: 0.5,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(196,154,60,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(196,154,60,0.35)"; }}
            >
              <i className="bi bi-box-arrow-in-right me-2" />Open Internet Banking
            </button>
            <button
              onClick={() => navigate("/atm")}
              style={{
                background: "transparent", border: "1px solid rgba(196,154,60,0.4)",
                borderRadius: 10, padding: "14px 36px",
                color: "#C49A3C", fontSize: 16, fontWeight: 600, cursor: "pointer",
                letterSpacing: 0.5, transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,154,60,0.1)"; e.currentTarget.style.borderColor = "#C49A3C"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,154,60,0.4)"; }}
            >
              <i className="bi bi-building-fill me-2" />Virtual ATM
            </button>
          </div>
        </div>
      </section>

    
      {/* ── Features ── */}
      <section id="features" style={{ padding: "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 12, color: "#C49A3C", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>What We Offer</div>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: "#f5ede8", margin: 0 }}>Everything You Need</h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,154,60,0.12)",
              borderRadius: 16, padding: "32px 28px", transition: "all 0.25s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,154,60,0.07)"; e.currentTarget.style.borderColor = "rgba(196,154,60,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(196,154,60,0.12)"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(196,154,60,0.2), rgba(139,105,20,0.1))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, color: "#C49A3C", marginBottom: 20,
                border: "1px solid rgba(196,154,60,0.2)",
              }}>
                <i className={`bi ${f.icon}`} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#f5ede8", marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#8F7265", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Security ── */}
      <section id="security" style={{
        padding: "100px 60px",
        background: "radial-gradient(ellipse at 50% 50%, rgba(196,154,60,0.06) 0%, transparent 70%)",
        borderTop: "1px solid rgba(196,154,60,0.1)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#C49A3C", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Security</div>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: "#f5ede8", marginBottom: 48 }}>Built Secure From the Ground Up</h2>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: "bi-shield-check",         label: "Dual Password Model"    },
              { icon: "bi-clock-history",        label: "12hr Cooling Period"    },
              { icon: "bi-journal-text",         label: "Immutable Audit Logs"   },
              { icon: "bi-arrow-repeat",         label: "Circuit Breaker"        },
            ].map((item) => (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(196,154,60,0.08)", border: "1px solid rgba(196,154,60,0.2)",
                borderRadius: 99, padding: "10px 20px",
                fontSize: 14, color: "#C9ADA7",
              }}>
                <i className={`bi ${item.icon}`} style={{ color: "#C49A3C" }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "100px 60px", borderTop: "1px solid rgba(196,154,60,0.1)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#C49A3C", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>About</div>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: "#f5ede8", marginBottom: 24 }}>About This Platform</h2>
          <p style={{ fontSize: 16, color: "#8F7265", lineHeight: 1.8, marginBottom: 40 }}>
            The Distributed Digital Banking Platform (DDBP) is a production-grade,
            cloud-native banking system built using microservices architecture.
            Powered by Spring Boot, Apache Kafka, PostgreSQL, and React —
            it delivers internet banking, virtual ATM simulation, real-time fund transfers,
            fixed deposit management, and complete account management.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            {["Spring Boot", "Apache Kafka", "Netflix Eureka", "PostgreSQL", "React", "Docker"].map((tech) => (
              <span key={tech} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6, padding: "6px 14px", fontSize: 13, color: "#C9ADA7",
              }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "80px 40px", textAlign: "center",
        background: "linear-gradient(135deg, rgba(196,154,60,0.1), rgba(139,105,20,0.05))",
        borderTop: "1px solid rgba(196,154,60,0.15)",
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: "#f5ede8", marginBottom: 16 }}>Ready to Get Started?</h2>
        <p style={{ fontSize: 16, color: "#8F7265", marginBottom: 36 }}>Log in to access your accounts, transfers, and more.</p>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "linear-gradient(135deg, #C49A3C, #8B6914)",
            border: "none", borderRadius: 10, padding: "16px 48px",
            color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 6px 24px rgba(196,154,60,0.35)", letterSpacing: 0.5,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(196,154,60,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(196,154,60,0.35)"; }}
        >
          <i className="bi bi-box-arrow-in-right me-2" />Login to Internet Banking
        </button>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: "24px 60px", borderTop: "1px solid rgba(196,154,60,0.1)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 13, color: "#8F7265", flexWrap: "wrap", gap: 12,
      }}>
        <span>© 2026 Aapli Bank · DDBP</span>
        <span>Secured by JWT + OAuth2 · Microservices Architecture</span>
        <span>Built with Spring Boot + React</span>
      </footer>

    </div>
  );
}
