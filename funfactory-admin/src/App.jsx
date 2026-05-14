import { useState, useCallback, useEffect } from "react";

// ════════════════════════════════════════════
// CONFIG — Laravel API URL change karanna
// ════════════════════════════════════════════
const API_BASE = "http://localhost:8000/api/cms";

// ════════════════════════════════════════════
// DEFAULT DATA — API fail unoth meka use wenawa
// ════════════════════════════════════════════
const defaultData = {
  topBanner: {
    emoji: "🎉",
    text: "NOW OPEN at 2 locations!",
    location1: "Nawala",
    location2: "Mount Lavinia",
    suffix: "Birthday parties available 7 days a week! 🎈",
  },
  navbar: {
    links: [
      { label: "Home",          href: "index.html" },
      { label: "About Us",      href: "about.html" },
      { label: "Facilities",    href: "#Facilities" },
      { label: "Services",      href: "#services-section" },
      { label: "Party Packages",href: "party-packages.html" },
      { label: "Membership",    href: "#" },
      { label: "Photo Album",   href: "#ff-gallery" },
      { label: "Contact Us",    href: "contact-Us.html" },
    ],
    ctaLabel: "Book Now",
    ctaHref: "#",
  },
  hero: {
    line1: "Where Kids",
    line2: "Play, Laugh",
    line3: "& Grow!",
    subtitle: "The Ultimate Kids Venue",
    description:
      "Fun Factory is Sri Lanka's first supervised, totally air-conditioned, indoor playground for children ages 0 to 11 years. Jungle gym, toddler zones, library & activity areas, café, and so much more — all under one roof!",
    cta1: "🎂 Book a Party",
    cta2: "Explore Attractions →",
  },
  stats: [
    { number: "10+",  label: "Attractions" },
    { number: "2",    label: "Locations" },
    { number: "0–11", label: "Age Range" },
    { number: "7",    label: "Days a Week" },
  ],
  features: [
    { icon: "🛝", title: "Safe Play Zones",     subtitle: "Designed for every age" },
    { icon: "🎂", title: "Birthday Parties",    subtitle: "Unforgettable celebrations" },
    { icon: "🎨", title: "Creative Activities", subtitle: "Art, crafts & more" },
    { icon: "🏆", title: "#1 in Sri Lanka",     subtitle: "First & finest since day one" },
  ],
  locations: [
    {
      name: "Nawala Branch",
      address: "573, Nawala Road, Rajagiriya",
      phone1: "011 286 2656",
      phone2: "077 360 3777",
    },
    {
      name: "Mount Lavinia Branch",
      address: "3rd Floor, Mount City Building, Galle Road",
      phone1: "011 588 2656",
      phone2: "077 360 3777",
    },
  ],
  footer: {
    copyright: "© 2025 Fun Factory — All Rights Reserved.",
    tagline: "Made for kids, by people who love them",
  },
};

const SECTIONS = [
  { key: "topBanner", label: "Top Banner",      icon: "📢" },
  { key: "navbar",    label: "Navigation",       icon: "🧭" },
  { key: "hero",      label: "Hero Section",     icon: "🌟" },
  { key: "stats",     label: "Stats Bar",        icon: "📊" },
  { key: "features",  label: "Features Strip",   icon: "✨" },
  { key: "locations", label: "Locations",        icon: "📍" },
  { key: "footer",    label: "Footer",           icon: "📄" },
];

// ════ SHARED COMPONENTS ════

function Field({ label, value, onChange, multiline, hint }) {
  const inputStyle = {
    width: "100%",
    border: "1.5px solid #d0e0f0",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    color: "#222",
    transition: "border-color 0.2s",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 5, letterSpacing: 0.5, textTransform: "uppercase" }}>
        {label}
      </label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
      {hint && <p style={{ fontSize: 11, color: "#999", margin: "4px 0 0" }}>{hint}</p>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1.5px solid #e4edf8", borderRadius: 14, padding: "20px 22px", marginBottom: 18, boxShadow: "0 2px 8px rgba(26,95,168,0.04)" }}>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: "#1a3a6b", margin: "0 0 16px", paddingBottom: 10, borderBottom: "1.5px solid #edf3fb", letterSpacing: 0.3 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ════ SECTION EDITORS ════

function TopBannerEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  return (
    <SectionCard title="Top Banner">
      <Field label="Emoji"        value={data.emoji}     onChange={set("emoji")}     hint="Shown at start" />
      <Field label="Main Text"    value={data.text}      onChange={set("text")} />
      <Field label="Location 1"   value={data.location1} onChange={set("location1")} />
      <Field label="Location 2"   value={data.location2} onChange={set("location2")} />
      <Field label="Suffix Text"  value={data.suffix}    onChange={set("suffix")} />
    </SectionCard>
  );
}

function NavbarEditor({ data, onChange }) {
  const setLink = (i, field, val) => {
    const links = [...data.links];
    links[i] = { ...links[i], [field]: val };
    onChange({ ...data, links });
  };
  const addLink    = () => onChange({ ...data, links: [...data.links, { label: "New Link", href: "#" }] });
  const removeLink = (i) => onChange({ ...data, links: data.links.filter((_, idx) => idx !== i) });

  return (
    <SectionCard title="Navigation Bar">
      <label style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 0.5 }}>Nav Links</label>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        {data.links.map((link, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={link.label} onChange={(e) => setLink(i, "label", e.target.value)} placeholder="Label"
              style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
            <input value={link.href} onChange={(e) => setLink(i, "href", e.target.value)} placeholder="URL / anchor"
              style={{ flex: 1.5, border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#555" }} />
            <button onClick={() => removeLink(i)}
              style={{ background: "#fce8e8", color: "#a32d2d", border: "none", borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 13, fontWeight: 800 }}>✕</button>
          </div>
        ))}
      </div>
      <button onClick={addLink}
        style={{ marginTop: 10, background: "#e0edff", color: "#1a5fa8", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 800 }}>
        + Add Link
      </button>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px dashed #e4edf8" }}>
        <Field label="CTA Button Label" value={data.ctaLabel} onChange={(v) => onChange({ ...data, ctaLabel: v })} />
        <Field label="CTA Button URL"   value={data.ctaHref}  onChange={(v) => onChange({ ...data, ctaHref: v })} />
      </div>
    </SectionCard>
  );
}

function HeroEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  return (
    <SectionCard title="Hero Section">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {["line1", "line2", "line3"].map((k, i) => (
          <div key={k}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Line {i + 1}</label>
            <input value={data[k]} onChange={(e) => set(k)(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px", fontSize: 13, marginTop: 4, outline: "none", boxSizing: "border-box", background: "#fff", color: "#222" }} />
          </div>
        ))}
      </div>
      <Field label="Subtitle"     value={data.subtitle}     onChange={set("subtitle")} />
      <Field label="Description"  value={data.description}  onChange={set("description")} multiline />
      <Field label="CTA Button 1" value={data.cta1}         onChange={set("cta1")} />
      <Field label="CTA Button 2" value={data.cta2}         onChange={set("cta2")} />
    </SectionCard>
  );
}

function StatsEditor({ data, onChange }) {
  const setItem = (i, field, val) => { const next = [...data]; next[i] = { ...next[i], [field]: val }; onChange(next); };
  return (
    <SectionCard title="Stats Bar">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((stat, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Number</label>
              <input value={stat.number} onChange={(e) => setItem(i, "number", e.target.value)}
                style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px", fontSize: 13, marginTop: 4, outline: "none", boxSizing: "border-box", background: "#fff", color: "#222" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#888", fontWeight: 700, textTransform: "uppercase" }}>Label</label>
              <input value={stat.label} onChange={(e) => setItem(i, "label", e.target.value)}
                style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px", fontSize: 13, marginTop: 4, outline: "none", boxSizing: "border-box", background: "#fff", color: "#222" }} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function FeaturesEditor({ data, onChange }) {
  const setItem = (i, field, val) => { const next = [...data]; next[i] = { ...next[i], [field]: val }; onChange(next); };
  return (
    <SectionCard title="Features Strip">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((feat, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={feat.icon} onChange={(e) => setItem(i, "icon", e.target.value)}
              style={{ width: 48, border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 6px", fontSize: 20, textAlign: "center", outline: "none", background: "#fff" }} />
            <input value={feat.title} onChange={(e) => setItem(i, "title", e.target.value)} placeholder="Title"
              style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
            <input value={feat.subtitle} onChange={(e) => setItem(i, "subtitle", e.target.value)} placeholder="Subtitle"
              style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#555" }} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function LocationsEditor({ data, onChange }) {
  const setItem = (i, field, val) => { const next = [...data]; next[i] = { ...next[i], [field]: val }; onChange(next); };
  return (
    <SectionCard title="Locations">
      {data.map((loc, i) => (
        <div key={i} style={{ marginBottom: i < data.length - 1 ? 20 : 0, paddingBottom: i < data.length - 1 ? 20 : 0, borderBottom: i < data.length - 1 ? "1.5px dashed #e4edf8" : "none" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#1a5fa8", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
            📍 Branch {i + 1}
          </div>
          <Field label="Branch Name" value={loc.name}    onChange={(v) => setItem(i, "name", v)} />
          <Field label="Address"     value={loc.address} onChange={(v) => setItem(i, "address", v)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Phone 1" value={loc.phone1} onChange={(v) => setItem(i, "phone1", v)} />
            <Field label="Phone 2" value={loc.phone2} onChange={(v) => setItem(i, "phone2", v)} />
          </div>
        </div>
      ))}
    </SectionCard>
  );
}

function FooterEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  return (
    <SectionCard title="Footer">
      <Field label="Copyright Text" value={data.copyright} onChange={set("copyright")} />
      <Field label="Tagline"        value={data.tagline}   onChange={set("tagline")} />
    </SectionCard>
  );
}

// ════ LIVE PREVIEW ════

function LivePreview({ data }) {
  return (
    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#222" }}>
      {/* TOP BANNER */}
      <div style={{ background: "#3BAEE8", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        <span>{data.topBanner.emoji} {data.topBanner.text}</span>
        <span style={{ opacity: 0.5 }}>—</span>
        <span style={{ color: "#F7C416" }}>{data.topBanner.location1} &amp; {data.topBanner.location2}</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>{data.topBanner.suffix}</span>
      </div>

      {/* NAVBAR */}
      <div style={{ background: "#D6EFFA", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", gap: 6, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: "#1A5FA8" }}>🎉 Fun Factory</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
          {data.navbar.links.map((link, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "4px 8px", borderRadius: 6, color: "#222" }}>{link.label}</span>
          ))}
          <span style={{ background: "#F7C416", color: "#222", fontWeight: 800, fontSize: 11, padding: "6px 14px", borderRadius: 20, marginLeft: 6, boxShadow: "0 3px 0 #c9980e" }}>
            {data.navbar.ctaLabel}
          </span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: "28px 24px 20px", background: "rgba(255,255,255,0.9)" }}>
        <div style={{ fontFamily: "serif", fontSize: 28, lineHeight: 1.15, marginBottom: 10 }}>
          <div style={{ color: "#1A5FA8", fontWeight: 900 }}>{data.hero.line1}</div>
          <div style={{ color: "#F7C416", fontWeight: 900 }}>{data.hero.line2}</div>
          <div style={{ color: "#F47920", fontWeight: 900 }}>{data.hero.line3}</div>
        </div>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{data.hero.subtitle}</div>
        <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 14, maxWidth: 400 }}>{data.hero.description}</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span style={{ background: "#F7C416", color: "#222", fontWeight: 800, fontSize: 12, padding: "8px 18px", borderRadius: 20, boxShadow: "0 3px 0 #c9980e" }}>{data.hero.cta1}</span>
          <span style={{ color: "#1A5FA8", fontWeight: 800, fontSize: 12, padding: "8px 0" }}>{data.hero.cta2}</span>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "flex", gap: 20, padding: "16px 24px", background: "#fff", borderTop: "2px solid #D6EFFA", flexWrap: "wrap", justifyContent: "center" }}>
        {data.stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 22, color: "#1A5FA8" }}>{s.number}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div style={{ background: "linear-gradient(135deg,#1A5FA8,#3BAEE8)", padding: "18px 24px", display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
        {data.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
            <span style={{ fontSize: 22 }}>{f.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>{f.title}</div>
              <div style={{ fontSize: 10, opacity: 0.8 }}>{f.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* LOCATIONS */}
      <div style={{ padding: "20px 24px", background: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#F47920", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Find Us</div>
        <div style={{ fontWeight: 900, fontSize: 18, color: "#1a1a2e", marginBottom: 14 }}>Two Locations</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {data.locations.map((loc, i) => (
            <div key={i} style={{ flex: 1, minWidth: 160, background: i === 0 ? "#F8D7DA" : "#FFF9C4", border: `2px solid ${i === 0 ? "#f0b8be" : "#FFD600"}`, borderRadius: 16, padding: "14px 16px" }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e", marginBottom: 4 }}>{loc.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>📍 {loc.address}</div>
              <div style={{ fontSize: 11, color: "#666", fontWeight: 700 }}>📞 {loc.phone1} · {loc.phone2}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0e3d6e", color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "14px", fontSize: 11 }}>
        {data.footer?.copyright} &nbsp;·&nbsp; ♥ {data.footer?.tagline}
      </div>
    </div>
  );
}

// ════ MAIN APP ════

export default function FunFactoryCMS() {
  const [data,          setData]          = useState(defaultData);
  const [activeSection, setActiveSection] = useState("topBanner");
  const [activeTab,     setActiveTab]     = useState("edit");
  const [status,        setStatus]        = useState(null); // null | 'saving' | 'saved' | 'error' | 'loading'
  const [apiConnected,  setApiConnected]  = useState(false);

  // ── Load from Laravel API on mount ──
  useEffect(() => {
    async function loadFromApi() {
      setStatus("loading");
      try {
        const res  = await fetch(`${API_BASE}/all`);
        const json = await res.json();
        if (json && Object.keys(json).length > 0) {
          setData((prev) => ({ ...prev, ...json }));
          setApiConnected(true);
        }
        setStatus(null);
      } catch {
        // API neti unama default data + localStorage fallback
        try {
          const local = localStorage.getItem("ff_cms_data");
          if (local) setData(JSON.parse(local));
        } catch {}
        setStatus(null);
      }
    }
    loadFromApi();
  }, []);

  const updateSection = useCallback((section, val) => {
    setData((prev) => ({ ...prev, [section]: val }));
    setStatus(null);
  }, []);

  // ── Save to Laravel API ──
  const handleSave = async () => {
    setStatus("saving");
    try {
      const res = await fetch(`${API_BASE}/save`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API error");
      setStatus("saved");
      // localStorage backup also
      localStorage.setItem("ff_cms_data", JSON.stringify(data));
    } catch {
      // API neti unama localStorage to save
      try {
        localStorage.setItem("ff_cms_data", JSON.stringify(data));
        setStatus("saved");
      } catch {
        setStatus("error");
      }
    }
    setTimeout(() => setStatus(null), 2500);
  };

  const renderEditor = () => {
    switch (activeSection) {
      case "topBanner": return <TopBannerEditor data={data.topBanner} onChange={(v) => updateSection("topBanner", v)} />;
      case "navbar":    return <NavbarEditor    data={data.navbar}    onChange={(v) => updateSection("navbar", v)} />;
      case "hero":      return <HeroEditor      data={data.hero}      onChange={(v) => updateSection("hero", v)} />;
      case "stats":     return <StatsEditor     data={data.stats}     onChange={(v) => updateSection("stats", v)} />;
      case "features":  return <FeaturesEditor  data={data.features}  onChange={(v) => updateSection("features", v)} />;
      case "locations": return <LocationsEditor data={data.locations} onChange={(v) => updateSection("locations", v)} />;
      case "footer":    return <FooterEditor    data={data.footer}    onChange={(v) => updateSection("footer", v)} />;
      default: return null;
    }
  };

  const saveLabel = status === "saving" ? "Saving..." : status === "saved" ? "✓ Saved!" : status === "error" ? "⚠ Error" : "💾 Save Changes";
  const saveBg    = status === "saved"  ? "#0f6e56"  : status === "error" ? "#a32d2d" : "#F7C416";
  const saveColor = status === "saved" || status === "error" ? "#fff" : "#1a1a2e";

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Nunito, sans-serif", background: "#f0f5fc", overflow: "hidden" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 220, background: "linear-gradient(180deg,#1a3a6b 0%,#0e2548 100%)", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "22px 18px 14px" }}>
          <div style={{ fontSize: 19, fontWeight: 900, color: "#fff", marginBottom: 2 }}>🎉 Fun Factory</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Content Manager</div>
          <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, background: apiConnected ? "rgba(15,110,86,0.35)" : "rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 10px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: apiConnected ? "#4ade80" : "#f59e0b", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
              {apiConnected ? "API Connected" : "Offline Mode"}
            </span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "4px 10px" }}>
          {SECTIONS.map((s) => (
            <button key={s.key} onClick={() => setActiveSection(s.key)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 13px", borderRadius: 10, border: "none", background: activeSection === s.key ? "rgba(255,255,255,0.14)" : "transparent", color: activeSection === s.key ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: activeSection === s.key ? 800 : 600, fontSize: 13, cursor: "pointer", textAlign: "left", marginBottom: 3, transition: "all 0.15s", fontFamily: "inherit" }}>
              <span style={{ fontSize: 17 }}>{s.icon}</span>
              {s.label}
              {activeSection === s.key && <span style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "#F7C416", flexShrink: 0 }} />}
            </button>
          ))}
        </nav>

        <div style={{ padding: "14px 12px 20px" }}>
          <button onClick={handleSave} disabled={status === "saving"}
            style={{ width: "100%", background: saveBg, color: saveColor, border: "none", borderRadius: 10, padding: "12px", fontWeight: 900, fontSize: 13, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit", boxShadow: "0 3px 0 rgba(0,0,0,0.2)" }}>
            {saveLabel}
          </button>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 8 }}>
            {apiConnected ? "Saves to Laravel DB" : "Saves to localStorage"}
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <header style={{ background: "#fff", borderBottom: "1.5px solid #e0eaf5", padding: "12px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, boxShadow: "0 1px 6px rgba(26,95,168,0.06)" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1a3a6b" }}>
              {SECTIONS.find((s) => s.key === activeSection)?.icon}{" "}
              {SECTIONS.find((s) => s.key === activeSection)?.label}
            </div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>Edit below — preview updates live</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["edit", "preview"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "7px 18px", borderRadius: 8, border: "1.5px solid", borderColor: activeTab === tab ? "#1a5fa8" : "#d0e0f0", background: activeTab === tab ? "#1a5fa8" : "#fff", color: activeTab === tab ? "#fff" : "#666", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
                {tab === "edit" ? "✏️ Edit" : "👁 Preview"}
              </button>
            ))}
          </div>
        </header>

        {/* Loading bar */}
        {status === "loading" && (
          <div style={{ background: "#3BAEE8", height: 3, width: "100%", animation: "pulse 1s ease infinite" }} />
        )}

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: activeTab === "edit" ? "22px 26px" : 0 }}>
          {activeTab === "edit" && renderEditor()}
          {activeTab === "preview" && (
            <div style={{ background: "#fff", minHeight: "100%" }}>
              <div style={{ background: "#edf5ff", padding: "8px 18px", fontSize: 11, fontWeight: 700, color: "#1a5fa8", borderBottom: "1px solid #d0e0f5" }}>
                📱 LIVE PREVIEW — reflects your current edits
              </div>
              <LivePreview data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
