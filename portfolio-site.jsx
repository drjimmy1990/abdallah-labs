import { useState, useEffect, useRef } from "react";
import Chatbot from "./src/Chatbot";

const PROJECTS = [
  {
    id: 1, name: "مجلسي", type: "منصة ذكاء اصطناعي",
    problem: "غياب أداة عربية تمنح رواد الأعمال استشارات متعددة التخصصات",
    solution: "منصة مجالس استشارية ذكية تجمع خبراء افتراضيين في الأسهم والقانون والتجارة",
    tools: ["Claude API", "React", "Supabase"],
    aiRole: "توليد استشارات متخصصة عبر Claude API بسياق سعودي مخصص",
    duration: "أسبوع واحد",
    result: "+4,000 مستخدم",
    resultSub: "1,100+ مستخدم يومي نشط — بدون إعلانات",
    link: "https://majlisai.online", icon: "⚖️",
  },
  {
    id: 2, name: "عرضي", type: "أداة SaaS",
    problem: "صعوبة إنشاء عروض أسعار احترافية بسرعة للمستقلين السعوديين",
    solution: "مولّد عروض أسعار عربي ذكي بـ 5 قوالب صناعية مع تصدير PDF",
    tools: ["Claude API", "React", "Moyasar"],
    aiRole: "صياغة بنود العرض تلقائياً بناءً على نوع الخدمة",
    duration: "5 أيام",
    result: "منتج SaaS جاهز",
    resultSub: "نموذج Freemium واشتراك 29 ريال/شهر",
    link: "https://3ardiai.com", icon: "📄",
  },
  {
    id: 3, name: "مداد", type: "أداة محتوى ذكي",
    problem: "صناع المحتوى العرب يقضون وقتاً طويلاً في صياغة تغريدات مؤثرة",
    solution: "أداة ذكاء اصطناعي لإنتاج محتوى تويتر عربي بأسلوب المستخدم",
    tools: ["Claude API", "React", "Supabase"],
    aiRole: "تحليل أسلوب الكاتب وتوليد محتوى متوافق مع نبرته",
    duration: "أسبوع واحد",
    result: "أداة حيّة",
    resultSub: "شراكة تطوير فعّالة وقاعدة مستخدمين متنامية",
    link: "https://medaddai.com", icon: "✍️",
  },
  {
    id: 4, name: "Promptt", type: "أداة إنتاجية",
    problem: "المستخدمون العرب لا يعرفون كيف يكتبون Prompts فعّالة",
    solution: "مولّد بروميتات عربي يحوّل الأفكار البسيطة إلى أوامر احترافية",
    tools: ["Claude API", "React", "Hostinger"],
    aiRole: "فهم نية المستخدم وتحويلها إلى Prompt مهيكل ومحسّن",
    duration: "3 أيام",
    result: "+8,000 مستخدم",
    resultSub: "في الأسبوع الأول من الإطلاق",
    link: "https://promptt.pro", icon: "⚡",
  },
];

const SERVICES = [
  { title: "بناء صفحات هبوط", desc: "صفحة هبوط احترافية عالية التحويل جاهزة خلال 3–5 أيام", icon: "🚀" },
  { title: "بناء MVP", desc: "تحويل فكرتك إلى نموذج أولي قابل للاختبار خلال 1–2 أسبوع", icon: "💡" },
  { title: "مواقع احترافية", desc: "موقع يمثّل هويتك بأفضل صورة — تصميم وتطوير كامل", icon: "🌐" },
  { title: "نماذج SaaS", desc: "بناء النسخة الأولى من منتجك البرمجي كخدمة", icon: "⚙️" },
  { title: "من فكرة إلى Prototype", desc: "نموذج تفاعلي تعرضه على المستثمرين خلال 3–5 أيام", icon: "🎯" },
  { title: "تحسين تجربة المنتج", desc: "إعادة تصميم واجهتك الحالية لتحقيق نتائج أفضل", icon: "✨" },
];

const STEPS = [
  { num: "01", title: "اكتشاف", desc: "نفهم فكرتك وأهدافك في جلسة واحدة مركّزة" },
  { num: "02", title: "تصميم", desc: "نبني الهيكل والواجهة بأدوات التصميم الذكية" },
  { num: "03", title: "تنفيذ", desc: "نطوّر المنتج بسرعة مستفيدين من قوة AI" },
  { num: "04", title: "إطلاق", desc: "ننشر ونسلّمك منتجاً جاهزاً للعالم" },
];

const FAQS = [
  { q: "هل يمكنك بناء موقع كامل بالذكاء الاصطناعي؟", a: "الذكاء الاصطناعي يسرّع البناء بشكل كبير، لكن الخبرة في التصميم والتخطيط هي التي تصنع الفارق. أستخدمه كأداة ضمن منهجية واضحة." },
  { q: "كم تستغرق مدة التنفيذ؟", a: "صفحة هبوط: 3–5 أيام. موقع تعريفي: أسبوع. MVP كامل: 1–2 أسبوع. الذكاء الاصطناعي يختصر الأشهر إلى أيام." },
  { q: "ما الأدوات المستخدمة؟", a: "Claude API للذكاء الاصطناعي، Lovable.dev للتطوير، Supabase لقواعد البيانات، Hostinger للاستضافة." },
  { q: "هل تقدم دعم بعد التسليم؟", a: "نعم. كل مشروع يتضمن فترة دعم بعد الإطلاق، مع إمكانية الاتفاق على صيانة مستمرة." },
];

const STATS = [
  { num: "10+", label: "منتج رقمي" },
  { num: "4,000+", label: "مستخدم نشط" },
  { num: "7", label: "أيام متوسط التنفيذ" },
  { num: "8,000", label: "مستخدم في أسبوع" },
];

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { id: "projects", label: "الأعمال" },
    { id: "services", label: "الخدمات" },
    { id: "process", label: "المنهجية" },
    { id: "about", label: "عنّي" },
    { id: "faq", label: "الأسئلة" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      transition: "all 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "16px auto 0", padding: "0 24px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 56, padding: "0 24px", borderRadius: 16,
          background: scrolled ? "rgba(10,10,20,0.85)" : "rgba(10,10,20,0.4)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(139,92,246,0.1)",
          position: "relative",
        }}>
          <a href="#hero" style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: 20, fontWeight: 800, textDecoration: "none",
            background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            zIndex: 2,
          }}>
            <img src="/logo.png" alt="عبدالله لابز" style={{ width: 34, height: 34, borderRadius: 8 }} />
            عبدالله لابز
          </a>
          <div className="dsk-nav" style={{
            display: "flex", gap: 28, alignItems: "center",
            position: "absolute", left: "50%", transform: "translateX(-50%)",
          }}>
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} style={{
                color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13,
                fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500,
                transition: "color 0.3s",
              }} onMouseEnter={e => e.target.style.color = "#A78BFA"}
                 onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
              >{l.label}</a>
            ))}
          </div>
          <a href="#contact" className="dsk-nav" style={{
            background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
            color: "#fff", padding: "8px 22px", borderRadius: 10,
            textDecoration: "none", fontSize: 13, fontWeight: 600,
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            zIndex: 2,
          }}>ابدأ مشروعك</a>
          <button className="mob-toggle" onClick={() => setOpen(!open)} style={{
            display: "none", background: "none", border: "none",
            color: "#A78BFA", fontSize: 24, cursor: "pointer",
          }}>{open ? "✕" : "☰"}</button>
        </div>
      </div>
      {open && (
        <div style={{
          margin: "8px 24px 0", padding: 20, borderRadius: 16,
          background: "rgba(10,10,20,0.95)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(139,92,246,0.1)",
        }} className="mob-menu">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 0", color: "rgba(255,255,255,0.7)",
              textDecoration: "none", fontSize: 15, fontWeight: 500,
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} style={{
            display: "block", marginTop: 16, textAlign: "center",
            background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
            color: "#fff", padding: "12px", borderRadius: 10,
            textDecoration: "none", fontWeight: 600,
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          }}>ابدأ مشروعك</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [ref, vis] = useInView();
  return (
    <section id="hero" ref={ref} style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", position: "relative", overflow: "hidden",
      padding: "120px 24px 60px",
    }}>
      {/* Purple glow orbs */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 800,
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "10%", right: "-10%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "-5%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
      }} />

      <div style={{
        maxWidth: 860, textAlign: "center", position: "relative", zIndex: 2,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Hero Logo */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 28,
        }}>
          <img src="/logo.png" className="hero-logo-img" alt="عبدالله لابز" style={{
            width: 80, height: 80, borderRadius: 20,
            border: "1px solid rgba(124,58,237,0.2)",
            boxShadow: "0 0 40px rgba(124,58,237,0.25), 0 0 80px rgba(124,58,237,0.1)",
          }} />
          <span style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: 22, fontWeight: 800, letterSpacing: 1,
            background: "linear-gradient(135deg, #C4B5FD, #A78BFA, #7C3AED)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>عبدالله لابز</span>
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: 100, padding: "8px 20px 8px 12px", marginBottom: 36,
          backdropFilter: "blur(10px)",
        }}>
          <span style={{
            background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
            color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px",
            borderRadius: 100, fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            letterSpacing: 1,
          }}>AI</span>
          <span style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500,
          }}>أبني منتجات رقمية بالذكاء الاصطناعي</span>
        </div>

        <h1 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(34px, 6vw, 68px)", fontWeight: 900,
          lineHeight: 1.25, color: "#fff", margin: "0 0 24px",
        }}>
          من فكرة على ورقة
          <br />
          <span style={{
            background: "linear-gradient(135deg, #C4B5FD, #A78BFA, #7C3AED)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>إلى منتج رقمي حي</span>
        </h1>

        <p style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: "clamp(15px, 2vw, 19px)", color: "rgba(255,255,255,0.45)",
          lineHeight: 1.9, maxWidth: 580, margin: "0 auto 44px", fontWeight: 400,
        }}>
          أحوّل أفكار المؤسسين ورواد الأعمال إلى مواقع ومنصات وأدوات SaaS
          جاهزة للإطلاق — بسرعة لا تصدّق وجودة لا تقبل المساومة
        </p>

        <div className="hero-buttons" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#projects" style={{
            background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
            color: "#fff", padding: "14px 36px", borderRadius: 12,
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            boxShadow: "0 0 30px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            transition: "all 0.3s",
          }}>شاهد الأعمال</a>
          <a href="#contact" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)", padding: "14px 36px", borderRadius: 12,
            textDecoration: "none", fontSize: 15, fontWeight: 500,
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            backdropFilter: "blur(10px)",
          }}>تواصل معي ←</a>
        </div>

        {/* Floating dashboard mockup */}
        <div className="dashboard-mockup" style={{ marginTop: 64, perspective: 1000 }}>
          <div style={{
            background: "rgba(15,15,30,0.8)",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: 20, padding: "24px 28px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 80px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.05)",
            transform: "rotateX(2deg)",
          }}>
            {/* Mock browser bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
              paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
              </div>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8,
                padding: "6px 14px", fontSize: 12, color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace", textAlign: "left", direction: "ltr",
              }}>abdullahlabs.com</div>
            </div>

            {/* Stats inside mockup */}
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
            }}>
              {STATS.map((s, i) => (
                <div key={i} style={{
                  background: "rgba(124,58,237,0.06)", borderRadius: 14,
                  padding: "20px 12px", textAlign: "center",
                  border: "1px solid rgba(124,58,237,0.08)",
                  opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.12}s`,
                }}>
                  <div style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#A78BFA",
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Value() {
  const [ref, vis] = useInView();
  const items = [
    { icon: "⚡", title: "سرعة استثنائية", desc: "ما كان يحتاج أشهراً أنجزه في أيام. الذكاء الاصطناعي يختصر الطريق." },
    { icon: "🎯", title: "تركيز على النتيجة", desc: "لا أبني مواقع جميلة فقط. أبني أدوات تحقق أهدافك: مستخدمين ونمو." },
    { icon: "🔧", title: "تنفيذ متكامل", desc: "من التخطيط إلى الإطلاق. تصميم وتطوير ومحتوى — كل شيء في يد واحدة." },
  ];
  return (
    <section ref={ref} style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 300, background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div style={{
        textAlign: "center", marginBottom: 56,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <h2 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#fff", margin: "0 0 14px",
        }}>لماذا تبني معي؟</h2>
        <p style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "0 auto",
        }}>أجمع بين فهم الأعمال والتنفيذ التقني السريع بأدوات الذكاء الاصطناعي</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, position: "relative" }}>
        {items.map((v, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 20, padding: "36px 28px",
            backdropFilter: "blur(10px)",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -30, right: -30, width: 100, height: 100,
              background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, marginBottom: 20,
            }}>{v.icon}</div>
            <h3 style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 10px",
            }}>{v.title}</h3>
            <p style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: 14, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, margin: 0,
            }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, i, vis }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "rgba(124,58,237,0.04)" : "rgba(255,255,255,0.015)",
      border: `1px solid ${h ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)"}`,
      borderRadius: 24, overflow: "hidden",
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(40px) scale(0.98)",
      position: "relative",
    }}>
      {h && <div style={{
        position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)",
        width: 200, height: 100,
        background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
        pointerEvents: "none", transition: "opacity 0.5s",
      }} />}
      
      <div style={{ padding: "32px 32px 0", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, marginBottom: 14,
            }}>{p.icon}</div>
            <h3 style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 4px",
            }}>{p.name}</h3>
            <span style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: 12, color: "#A78BFA", fontWeight: 600,
            }}>{p.type}</span>
          </div>
          <span style={{
            fontSize: 11, color: "rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.04)", padding: "5px 12px", borderRadius: 8,
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            border: "1px solid rgba(255,255,255,0.04)",
          }}>{p.duration}</span>
        </div>

        <div style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: 13,
          color: "rgba(255,255,255,0.42)", lineHeight: 1.9, marginBottom: 16,
        }}>
          <p style={{ margin: "0 0 8px" }}><span style={{ color: "rgba(255,255,255,0.65)" }}>المشكلة:</span> {p.problem}</p>
          <p style={{ margin: "0 0 8px" }}><span style={{ color: "rgba(255,255,255,0.65)" }}>الحل:</span> {p.solution}</p>
          <p style={{ margin: 0 }}><span style={{ color: "#A78BFA" }}>دور AI:</span> {p.aiRole}</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {p.tools.map((t, j) => (
            <span key={j} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6,
              background: "rgba(124,58,237,0.08)", color: "#C4B5FD",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500,
              border: "1px solid rgba(124,58,237,0.1)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{
        padding: "18px 32px",
        background: "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(124,58,237,0.02))",
        borderTop: "1px solid rgba(124,58,237,0.08)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontSize: 16, fontWeight: 700, color: "#A78BFA",
          }}>{p.result}</div>
          <div style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2,
          }}>{p.resultSub}</div>
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
          background: "rgba(124,58,237,0.12)", color: "#C4B5FD",
          padding: "9px 18px", borderRadius: 10,
          textDecoration: "none", fontSize: 12, fontWeight: 600,
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          border: "1px solid rgba(124,58,237,0.2)",
          transition: "all 0.3s",
        }}>عاين المشروع ←</a>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, vis] = useInView();
  return (
    <section id="projects" ref={ref} style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, right: "20%", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        textAlign: "center", marginBottom: 56,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: 100, padding: "5px 16px", marginBottom: 20,
        }}>
          <span style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            fontSize: 12, color: "#A78BFA", fontWeight: 600,
          }}>PORTFOLIO</span>
        </div>
        <h2 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#fff", margin: "0 0 14px",
        }}>مشاريع حقيقية، نتائج حقيقية</h2>
        <p style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "0 auto",
        }}>كل مشروع هنا بُني بالذكاء الاصطناعي — من الفكرة إلى الإطلاق</p>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: 20,
      }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} vis={vis} />)}
      </div>
    </section>
  );
}

function Services() {
  const [ref, vis] = useInView();
  return (
    <section id="services" ref={ref} style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "30%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 60%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />
      <div style={{
        textAlign: "center", marginBottom: 56,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: 100, padding: "5px 16px", marginBottom: 20,
        }}>
          <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: 12, color: "#A78BFA", fontWeight: 600 }}>SERVICES</span>
        </div>
        <h2 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#fff", margin: "0 0 14px",
        }}>خدمات مصممة للسرعة</h2>
        <p style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 550, margin: "0 auto",
        }}>فهم سريع، تنفيذ أسرع، نتيجة ملموسة</p>
      </div>
      <div className="services-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 14,
      }}>
        {SERVICES.map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 20, padding: "28px 24px",
            backdropFilter: "blur(10px)", position: "relative", overflow: "hidden",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, marginBottom: 16,
            }}>{s.icon}</div>
            <h3 style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 8px",
            }}>{s.title}</h3>
            <p style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, margin: 0,
            }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const [ref, vis] = useInView();
  return (
    <section id="process" ref={ref} style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{
        textAlign: "center", marginBottom: 56,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          display: "inline-flex", background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.15)", borderRadius: 100,
          padding: "5px 16px", marginBottom: 20,
        }}>
          <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: 12, color: "#A78BFA", fontWeight: 600 }}>PROCESS</span>
        </div>
        <h2 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#fff", margin: "0 0 14px",
        }}>كيف تتحول فكرتك إلى منتج</h2>
      </div>
      <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{
            textAlign: "center", padding: 28, position: "relative",
            background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 20,
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
          }}>
            <div style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 42, fontWeight: 900,
              background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 10,
            }}>{s.num}</div>
            <h3 style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px",
            }}>{s.title}</h3>
            <p style={{
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0,
            }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const [ref, vis] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto", position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 500, height: 300, background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 60%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />
      <div style={{
        background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 28, padding: "clamp(32px, 5vw, 56px)", position: "relative",
        backdropFilter: "blur(10px)", overflow: "hidden",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60, width: 200, height: 200,
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          display: "inline-flex", background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.15)", borderRadius: 100,
          padding: "5px 16px", marginBottom: 20,
        }}>
          <span style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontSize: 12, color: "#A78BFA", fontWeight: 600 }}>ABOUT</span>
        </div>
        <h2 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 24px",
        }}>عبدالله — مؤسس ومنفّذ</h2>
        <div style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 15, color: "rgba(255,255,255,0.48)", lineHeight: 2,
        }}>
          <p style={{ margin: "0 0 18px" }}>رائد أعمال سعودي يبني منتجات رقمية بالذكاء الاصطناعي. أؤمن أن أفضل طريقة لإثبات قوة التقنية هي بناء أشياء حقيقية بها — لا التحدث عنها.</p>
          <p style={{ margin: "0 0 18px" }}>بنيت وأطلقت أكثر من 10 منتجات رقمية عربية، بعضها وصل إلى آلاف المستخدمين خلال أيام. أستخدم Claude API وأدوات التطوير الحديثة لتحويل الأفكار إلى منتجات جاهزة بسرعة غير مسبوقة.</p>
          <p style={{ margin: 0 }}>فلسفتي: ابنِ بسرعة، أطلق أسرع، تعلّم من السوق مباشرة.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
          {["Claude API", "Lovable.dev", "Supabase", "React", "Hostinger", "Moyasar"].map(t => (
            <span key={t} style={{
              fontSize: 11, padding: "5px 14px", borderRadius: 8,
              background: "rgba(124,58,237,0.08)", color: "#C4B5FD",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif", fontWeight: 500,
              border: "1px solid rgba(124,58,237,0.12)",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [ref, vis] = useInView();
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section id="faq" ref={ref} style={{ padding: "80px 24px", maxWidth: 750, margin: "0 auto" }}>
      <div style={{
        textAlign: "center", marginBottom: 48,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <h2 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "#fff", margin: 0,
        }}>أسئلة شائعة</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{
            background: openIdx === i ? "rgba(124,58,237,0.04)" : "rgba(255,255,255,0.015)",
            border: `1px solid ${openIdx === i ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.05)"}`,
            borderRadius: 16, overflow: "hidden",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
          }}>
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
              width: "100%", background: "none", border: "none",
              padding: "18px 22px", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              textAlign: "right",
            }}>
              <span style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontSize: 15, fontWeight: 600, color: "#fff",
              }}>{f.q}</span>
              <span style={{
                color: "#A78BFA", fontSize: 18, fontWeight: 300,
                transform: openIdx === i ? "rotate(45deg)" : "rotate(0)",
                transition: "transform 0.3s", flexShrink: 0, marginRight: 8,
              }}>+</span>
            </button>
            <div style={{
              maxHeight: openIdx === i ? 250 : 0, opacity: openIdx === i ? 1 : 0,
              overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.3s ease",
            }}>
              <p style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.9,
                padding: "0 22px 18px", margin: 0,
              }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [ref, vis] = useInView();
  return (
    <section id="contact" ref={ref} style={{
      padding: "80px 24px 100px", maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative",
    }}>
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 400,
        background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        background: "rgba(124,58,237,0.03)",
        border: "1px solid rgba(124,58,237,0.12)",
        borderRadius: 32, padding: "clamp(40px, 6vw, 72px) clamp(24px, 4vw, 56px)",
        position: "relative", overflow: "hidden",
        backdropFilter: "blur(20px)",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80, width: 200, height: 200,
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -80, width: 200, height: 200,
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <h2 style={{
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#fff", margin: "0 0 14px",
          position: "relative",
        }}>جاهز تبني شيء حقيقي؟</h2>
        <p style={{
          fontFamily: "'IBM Plex Sans Arabic', sans-serif",
          fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.9,
          maxWidth: 480, margin: "0 auto 36px", position: "relative",
        }}>
          أخبرني عن فكرتك. إذا كانت قابلة للتنفيذ —
          سأبني لك نموذجاً أولياً تراه بعينك قبل أن تلتزم.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <a href="https://twitter.com/Abdullah_Ops1" target="_blank" rel="noopener noreferrer" style={{
            background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
            color: "#fff", padding: "14px 36px", borderRadius: 12,
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            boxShadow: "0 0 30px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}>تواصل عبر تويتر</a>
          <a href="mailto:admin@abdullahlabs.com" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)", padding: "14px 36px", borderRadius: 12,
            textDecoration: "none", fontSize: 15, fontWeight: 500,
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            backdropFilter: "blur(10px)",
          }}>أرسل إيميل ←</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" style={{
      padding: "32px 24px", maxWidth: 1200, margin: "0 auto",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 12,
    }}>
      <span style={{
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: 16, fontWeight: 800,
        background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        <img src="/logo.png" alt="عبدالله لابز" style={{ width: 28, height: 28, borderRadius: 6 }} />
        عبدالله لابز
      </span>
      <span style={{
        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
        fontSize: 12, color: "rgba(255,255,255,0.2)",
      }}>© {new Date().getFullYear()} — بُني بالكامل بالذكاء الاصطناعي</span>
    </footer>
  );
}

export default function App() {
  return (
    <div dir="rtl" style={{ background: "#050509", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700;800;900&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { background: #050509; overflow-x: hidden; }
        
        ::selection { background: rgba(124,58,237,0.4); color: #fff; }
        
        a { transition: opacity 0.2s; }
        a:hover { opacity: 0.88; }
        
        @media (max-width: 768px) {
          .dsk-nav { display: none !important; }
          .mob-toggle { display: block !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .hero-logo-img { width: 64px !important; height: 64px !important; }
          .hero-buttons { flex-direction: column !important; width: 100%; }
          .hero-buttons a { width: 100% !important; text-align: center !important; }
          .site-footer { flex-direction: column !important; text-align: center !important; justify-content: center !important; }
          .dashboard-mockup { margin-top: 36px !important; }
          .dashboard-mockup > div { padding: 16px 14px !important; }
        }
        @media (min-width: 769px) {
          .mob-toggle { display: none !important; }
          .mob-menu { display: none !important; }
        }
        
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050509; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 3px; }
      `}</style>

      <Nav />
      <Hero />
      <Value />
      <Projects />
      <Services />
      <Process />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}
