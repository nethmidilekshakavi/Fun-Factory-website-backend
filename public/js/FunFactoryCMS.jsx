const { useState, useCallback, useEffect, useRef } = React;

const defaultData = {
  topBanner: {
    emoji: "🎉",
    text: "NOW OPEN at 2 locations!",
    location1: "Nawala",
    location2: "Mount Lavinia",
    suffix: "Birthday parties available 7 days a week! 🎈",
  },
  navbar: {
    logoSrc: "images/logo.png",
    links: [
      { label: "Home",           href: "index.html" },
      { label: "About Us",       href: "about.html" },
      { label: "Facilities",     href: "#Facilities" },
      { label: "Services",       href: "#services-section" },
      { label: "Party Packages", href: "party-packages.html" },
      { label: "Membership",     href: "#" },
      { label: "Photo Album",    href: "#ff-gallery" },
      { label: "Contact Us",     href: "contact-Us.html" },
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
    // slider: array of image URLs (max 6). Empty array = no slider shown.
    sliderImages: [],
  },
  stats: {
    items: [
      { number: "10+",  label: "Attractions" },
      { number: "2",    label: "Locations" },
      { number: "0–11", label: "Age Range" },
      { number: "7",    label: "Days a Week" },
    ],
    imageSrc: "images/0376e8b9e8e3e782802c617c98f5de07-removebg-preview.png",
  },
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
  hero2: {
    eyebrow: "Sri Lanka's First & Finest",
    titleLine1: "The Ultimate",
    accentKids: "Kids",
    accentBlue: " Venue!",
    desc: "Premium indoor playground for children aged 0–11. A world of safe exploration at Nawala & Mount Lavinia.",
    badges: [
      { icon: "❄️", label: "Air-Conditioned" },
      { icon: "👀", label: "Fully Supervised" },
      { icon: "✨", label: "Always Clean" },
    ],
    mascotImage: "images/e23c90ee4a9a6b0f4e35418229891932-removebg-preview.png",
  },
  ageBanner: {
    heading: "Perfect for Kids Aged 0–11",
    desc: "From tiny toddlers to adventurous pre-teens — we have dedicated zones built just for them.",
    badgeNum: "0–11",
    badgeLabel: "Years Old",
  },
  whoWeAre: {
    eyebrow: "Who We Are",
    heading: "A Place Built For Kids",
    cards: [
      {
        icon: "⭐",
        color: "yellow",
        title: "More Than a Playground",
        desc: "Fun Factory is a one-of-a-kind space where children learn to build a healthy and active physical and mental development. We've got soft play, ball pits, go-karts, and so much more — connection and fun are waiting at every corner!",
        listItems: [
          "Soft play zones for all ages",
          "Go-karts & adventure tracks",
          "Creative art & craft areas",
          "Birthday party packages",
        ],
      },
      {
        icon: "🛡️",
        color: "blue",
        title: "Safe. Clean. Exciting.",
        desc: "Our fantastic facilities and friendly staff attract families from all over Colombo. We sanitise every inch of our venue daily — and for parents to relax, you can rest easy knowing your little ones are in the safest hands.",
        listItems: [
          "Trained supervisors always present",
          "Deep cleaned every day",
          "Fully air conditioned spaces",
          "Safe, padded equipment",
        ],
      },
    ],
  },
  missionBanner: {
    quote: "To be the first choice of parents when selecting a safe, clean, secure and exciting facility for children to play in a stimulating environment.",
    hlSafe: "safe,",
    hlClean: "clean,",
    hlSecure: "secure",
    attr: "— Fun Factory Mission Statement",
  },
  facilities: {
    cards: [
      { icon: "🌴", title: "Jungle Gym",          desc: "Sri Lanka's largest indoor jungle gym. Slides, climbing walls & adventure zones!", color: "fac-blue"   },
      { icon: "📚", title: "Library & Activity",   desc: "Reading corners, arts & crafts, learning stations",                              color: "fac-pink"   },
      { icon: "👶", title: "Toddlers & Infants",   desc: "Safe, dedicated soft-play area for tiny adventurers",                           color: "fac-yellow" },
      { icon: "☕", title: "Café",                  desc: "Delicious food & beverages while kids play",                                    color: "fac-navy"   },
    ],
    mascotImage: "images/25d9c599743e1b42f78bef12965dd34f-removebg-preview.png",
  },
  footer: {
    copyright: "© 2025 Fun Factory — All Rights Reserved.",
    tagline: "Made for kids, by people who love them",
  },
};

const SECTIONS = [
  { key: "topBanner", label: "Top Banner",    icon: "📢" },
  { key: "navbar",    label: "Navigation",    icon: "🧭" },
  { key: "hero",      label: "Hero Section",  icon: "🌟" },
  { key: "hero2",     label: "Hero 2",        icon: "🧒" },
  { key: "ageBanner", label: "Age Banner",    icon: "🎈" },
  { key: "stats",     label: "Stats Bar",     icon: "📊" },
  { key: "features",  label: "Features Strip",icon: "✨" },
  { key: "locations",  label: "Locations",      icon: "📍" },
  { key: "facilities",   label: "Facilities",       icon: "🏟️" },
  { key: "whoWeAre",    label: "Who We Are",       icon: "🏫" },
  { key: "missionBanner", label: "Mission Banner", icon: "💬" },
  { key: "footer",      label: "Footer",           icon: "📄" },
];

const MAX_SLIDER_IMAGES = 6;

// ════ SHARED COMPONENTS ════

function Field({ label, value, onChange, multiline, hint }) {
  const inputStyle = {
    width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
    padding: "8px 10px", fontSize: 13, fontFamily: "inherit",
    outline: "none", boxSizing: "border-box", background: "#fff", color: "#222",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555",
        marginBottom: 4, letterSpacing: 0.3, textTransform: "uppercase" }}>
        {label}
      </label>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
            style={{ ...inputStyle, resize: "vertical" }} />
        : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      }
      {hint && <p style={{ fontSize: 11, color: "#888", margin: "4px 0 0" }}>{hint}</p>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1.5px solid #e0eaf5", borderRadius: 14,
      padding: "20px 22px", marginBottom: 18 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a3a6b", margin: "0 0 16px",
        paddingBottom: 10, borderBottom: "1px solid #e8f0fb" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ════ LOGO UPLOAD BLOCK ════

function ImageUploadBlock({ label, imageSrc, uploadEndpoint, fieldName, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555",
        marginBottom: 8, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{ width: 100, height: 68, borderRadius: 8, border: "1.5px solid #d0e0f0",
          background: "#f4f8fc", display: "flex", alignItems: "center",
          justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
          {imageSrc
            ? <img src={imageSrc} alt={label}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                onError={(e) => { e.target.style.display = "none"; }} />
            : <span style={{ fontSize: 11, color: "#aaa" }}>No image</span>
          }
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#333", marginBottom: 4 }}>
            {imageSrc ? imageSrc.split("/").pop() : "No file selected"}
          </div>
          <div style={{ fontSize: 11, color: "#888" }}>PNG, JPG, SVG — saved to <code>public/images/</code></div>
        </div>
      </div>
      <label style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#e0edff",
        color: "#1a5fa8", borderRadius: 8, padding: "8px 14px",
        cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
        🖼 Choose Image
        <input type="file" accept="image/*" style={{ display: "none" }}
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const fd = new FormData();
            fd.append(fieldName, file);
            try {
              const res  = await fetch(uploadEndpoint, { method: "POST", body: fd });
              const json = await res.json();
              if (json.path) onChange(json.path);
              else alert("Upload failed: " + (json.error || "unknown error"));
            } catch (err) { alert("Upload error: " + err.message); }
          }} />
      </label>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="text" value={imageSrc || ""} onChange={(e) => onChange(e.target.value)}
          placeholder="or type path / URL manually"
          style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8,
            padding: "7px 10px", fontSize: 12, outline: "none", background: "#fff", color: "#555" }} />
        {imageSrc && (
          <button onClick={() => onChange("")}
            style={{ background: "#fce8e8", color: "#a32d2d", border: "none",
              borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✕</button>
        )}
      </div>
    </div>
  );
}

// ════ HERO SLIDER EDITOR ════

function HeroSliderEditor({ images, onChange }) {
  // images = string[] max 6
  const slots = Array.from({ length: MAX_SLIDER_IMAGES }, (_, i) => images[i] || "");

  const setSlot = (i, val) => {
    const next = [...slots];
    next[i] = val;
    // trim trailing empty slots
    let arr = next;
    while (arr.length > 0 && arr[arr.length - 1] === "") arr = arr.slice(0, -1);
    onChange(arr);
  };

  const uploadSlot = async (i, file) => {
    const fd = new FormData();
    fd.append("hero_image", file);
    try {
      const res  = await fetch("/api/cms/upload-hero-image", { method: "POST", body: fd });
      const json = await res.json();
      if (json.path) setSlot(i, json.path);
      else alert("Upload failed: " + (json.error || "unknown"));
    } catch (err) { alert("Upload error: " + err.message); }
  };

  const removeSlot = (i) => setSlot(i, "");

  const activeCount = slots.filter(Boolean).length;

  return (
    <div style={{ marginTop: 4, paddingTop: 14, borderTop: "1px dashed #e0eaf5" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: "#555",
          textTransform: "uppercase", letterSpacing: 0.3 }}>
          Hero Slider Images
        </label>
        <span style={{ fontSize: 11, background: activeCount > 0 ? "#e0edff" : "#f4f4f4",
          color: activeCount > 0 ? "#1a5fa8" : "#999", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>
          {activeCount}/{MAX_SLIDER_IMAGES} images
        </span>
      </div>

      <p style={{ fontSize: 11, color: "#888", margin: "0 0 12px" }}>
        Add up to 6 images. Empty slots are ignored. Slider auto-plays on the website.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {slots.map((src, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center",
            background: src ? "#f0f7ff" : "#fafafa",
            border: `1.5px solid ${src ? "#c0d8f5" : "#e4edf8"}`,
            borderRadius: 10, padding: "10px 12px" }}>

            {/* Slot number + thumb */}
            <div style={{ width: 52, height: 40, borderRadius: 7, border: "1.5px solid #d0e0f0",
              background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", flexShrink: 0, position: "relative" }}>
              {src
                ? <img src={src} alt={`Slide ${i+1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; }} />
                : <span style={{ fontSize: 10, color: "#bbb", fontWeight: 700 }}>{i + 1}</span>
              }
            </div>

            {/* URL input */}
            <input type="text" value={src} onChange={(e) => setSlot(i, e.target.value)}
              placeholder={`Slide ${i + 1} — URL or upload`}
              style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8,
                padding: "7px 10px", fontSize: 12, outline: "none",
                background: "#fff", color: "#444" }} />

            {/* Upload button */}
            <label style={{ display: "inline-flex", alignItems: "center", gap: 4,
              background: "#e0edff", color: "#1a5fa8", borderRadius: 8,
              padding: "7px 11px", cursor: "pointer", fontSize: 12, fontWeight: 700,
              flexShrink: 0, whiteSpace: "nowrap" }}>
              📁 Upload
              <input type="file" accept="image/*" style={{ display: "none" }}
                onChange={(e) => { const f = e.target.files[0]; if (f) uploadSlot(i, f); }} />
            </label>

            {/* Remove */}
            {src && (
              <button onClick={() => removeSlot(i)}
                style={{ background: "#fce8e8", color: "#a32d2d", border: "none",
                  borderRadius: 8, padding: "7px 10px", cursor: "pointer",
                  fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✕</button>
            )}
          </div>
        ))}
      </div>

      {activeCount === 0 && (
        <div style={{ marginTop: 10, padding: "10px 14px", background: "#fff8e1",
          border: "1.5px solid #ffe082", borderRadius: 8, fontSize: 11, color: "#7a5000" }}>
          ⚠️ No images added — hero section will show text only (no slider).
        </div>
      )}
    </div>
  );
}

// ════ LIVE SLIDER PREVIEW WIDGET ════

function SliderPreview({ images }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const active = images.filter(Boolean);

  useEffect(() => {
    if (active.length <= 1) return;
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % active.length), 3000);
    return () => clearInterval(timerRef.current);
  }, [active.length]);

  useEffect(() => { setIdx(0); }, [active.length]);

  if (active.length === 0) return null;

  return (
    <div style={{ position: "relative", width: 220, height: 160, borderRadius: 14,
      overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.15)", flexShrink: 0 }}>

      {/* Slides */}
      {active.map((src, i) => (
        <img key={i} src={src} alt={`Slide ${i + 1}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", transition: "opacity 0.6s ease",
            opacity: i === idx ? 1 : 0 }}
          onError={(e) => { e.target.style.display = "none"; }} />
      ))}

      {/* Dots */}
      {active.length > 1 && (
        <div style={{ position: "absolute", bottom: 8, left: 0, right: 0,
          display: "flex", justifyContent: "center", gap: 5 }}>
          {active.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{ width: i === idx ? 18 : 7, height: 7, borderRadius: 4,
                background: i === idx ? "#F7C416" : "rgba(255,255,255,0.7)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.3s" }} />
          ))}
        </div>
      )}

      {/* Prev / Next arrows */}
      {active.length > 1 && (
        <>
          <button onClick={() => setIdx((idx - 1 + active.length) % active.length)}
            style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.35)", color: "#fff", border: "none",
              borderRadius: "50%", width: 24, height: 24, cursor: "pointer",
              fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <button onClick={() => setIdx((idx + 1) % active.length)}
            style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.35)", color: "#fff", border: "none",
              borderRadius: "50%", width: 24, height: 24, cursor: "pointer",
              fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </>
      )}
    </div>
  );
}

// ════ SECTION EDITORS ════

function TopBannerEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  return (
    <SectionCard title="Top Banner">
      <Field label="Emoji"       value={data.emoji}     onChange={set("emoji")}     hint="Shown at start of banner" />
      <Field label="Main Text"   value={data.text}      onChange={set("text")} />
      <Field label="Location 1"  value={data.location1} onChange={set("location1")} />
      <Field label="Location 2"  value={data.location2} onChange={set("location2")} />
      <Field label="Suffix Text" value={data.suffix}    onChange={set("suffix")} />
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
      <ImageUploadBlock
        label="Logo Image"
        imageSrc={data.logoSrc}
        uploadEndpoint="/api/cms/upload-logo"
        fieldName="logo"
        onChange={(path) => onChange({ ...data, logoSrc: path })}
      />
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#555",
          textTransform: "uppercase", letterSpacing: 0.3 }}>Nav Links</label>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {data.links.map((link, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input value={link.label} onChange={(e) => setLink(i, "label", e.target.value)}
                placeholder="Label"
                style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
              <input value={link.href} onChange={(e) => setLink(i, "href", e.target.value)}
                placeholder="URL / anchor"
                style={{ flex: 1.5, border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#555" }} />
              <button onClick={() => removeLink(i)}
                style={{ background: "#fce8e8", color: "#a32d2d", border: "none",
                  borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✕</button>
            </div>
          ))}
        </div>
        <button onClick={addLink}
          style={{ marginTop: 10, background: "#e0edff", color: "#1a5fa8", border: "none",
            borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
          + Add Link
        </button>
      </div>
      <Field label="CTA Button Label" value={data.ctaLabel} onChange={(v) => onChange({ ...data, ctaLabel: v })} />
      <Field label="CTA Button URL"   value={data.ctaHref}  onChange={(v) => onChange({ ...data, ctaHref: v })} />
    </SectionCard>
  );
}

function HeroEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  const sliderImages = data.sliderImages || [];

  return (
    <SectionCard title="Hero Section">
      {/* Title Lines */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {["line1", "line2", "line3"].map((k, i) => (
          <div key={k}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>
              Line {i + 1}
            </label>
            <input value={data[k]} onChange={(e) => set(k)(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                padding: "7px 10px", fontSize: 13, marginTop: 4, outline: "none",
                boxSizing: "border-box", background: "#fff", color: "#222" }} />
          </div>
        ))}
      </div>
      <Field label="Subtitle"     value={data.subtitle}    onChange={set("subtitle")} />
      <Field label="Description"  value={data.description} onChange={set("description")} multiline />
      <Field label="CTA Button 1" value={data.cta1}        onChange={set("cta1")} />
      <Field label="CTA Button 2" value={data.cta2}        onChange={set("cta2")} />

      {/* Slider Images */}
      <HeroSliderEditor
        images={sliderImages}
        onChange={(arr) => onChange({ ...data, sliderImages: arr })}
      />
    </SectionCard>
  );
}

function StatsEditor({ data, onChange }) {
  // data = { items: [...], imageSrc: "..." }
  const items = data.items || data; // backward compat if array
  const imageSrc = data.imageSrc || "";

  const setItem = (i, field, val) => {
    const next = [...items]; next[i] = { ...next[i], [field]: val };
    onChange({ ...data, items: next });
  };

  const uploadStatImage = async (file) => {
    const fd = new FormData();
    fd.append("stats_image", file);
    try {
      const res  = await fetch("/api/cms/upload-stats-image", { method: "POST", body: fd });
      const json = await res.json();
      if (json.path) onChange({ ...data, imageSrc: json.path });
      else alert("Upload failed: " + (json.error || "unknown"));
    } catch (err) { alert("Upload error: " + err.message); }
  };

  return (
    <SectionCard title="Stats Bar">
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {items.map((stat, i) => (
          <div key={i} style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Number</label>
              <input value={stat.number} onChange={(e) => setItem(i, "number", e.target.value)}
                style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 13, marginTop: 4, outline: "none",
                  boxSizing: "border-box", background: "#fff", color: "#222" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Label</label>
              <input value={stat.label} onChange={(e) => setItem(i, "label", e.target.value)}
                style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 13, marginTop: 4, outline: "none",
                  boxSizing: "border-box", background: "#fff", color: "#222" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Stats Bar Image Upload */}
      <div style={{ paddingTop: 14, borderTop: "1px dashed #e0eaf5" }}>
        <ImageUploadBlock
          label="Stats Bar Image (e.g. character / mascot)"
          imageSrc={imageSrc}
          uploadEndpoint="/api/cms/upload-stats-image"
          fieldName="stats_image"
          onChange={(path) => onChange({ ...data, imageSrc: path })}
        />
        {imageSrc && (
          <p style={{ fontSize: 11, color: "#888", margin: "4px 0 0" }}>
            ✅ Image will appear on the right side of the stats bar — same as <code>img-ss</code> in your HTML.
          </p>
        )}
      </div>
    </SectionCard>
  );
}

function FeaturesEditor({ data, onChange }) {
  const setItem = (i, field, val) => {
    const next = [...data]; next[i] = { ...next[i], [field]: val }; onChange(next);
  };
  return (
    <SectionCard title="Features Strip">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.map((feat, i) => (
          <div key={i} style={{ display: "flex", gap: 10 }}>
            <input value={feat.icon} onChange={(e) => setItem(i, "icon", e.target.value)}
              placeholder="Emoji"
              style={{ width: 50, border: "1.5px solid #d0e0f0", borderRadius: 8,
                padding: "7px 8px", fontSize: 18, textAlign: "center", outline: "none", background: "#fff" }} />
            <input value={feat.title} onChange={(e) => setItem(i, "title", e.target.value)}
              placeholder="Title"
              style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8,
                padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
            <input value={feat.subtitle} onChange={(e) => setItem(i, "subtitle", e.target.value)}
              placeholder="Subtitle"
              style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8,
                padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function LocationsEditor({ data, onChange }) {
  const setItem = (i, field, val) => {
    const next = [...data]; next[i] = { ...next[i], [field]: val }; onChange(next);
  };
  return (
    <SectionCard title="Locations">
      {data.map((loc, i) => (
        <div key={i} style={{
          marginBottom: i < data.length - 1 ? 18 : 0,
          paddingBottom: i < data.length - 1 ? 18 : 0,
          borderBottom: i < data.length - 1 ? "1px dashed #e0eaf5" : "none",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1a5fa8", marginBottom: 8,
            textTransform: "uppercase", letterSpacing: 0.5 }}>Branch {i + 1}</div>
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

// ════ HERO 2 EDITOR ════

function Hero2Editor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });

  const setBadge = (i, field, val) => {
    const next = [...data.badges];
    next[i] = { ...next[i], [field]: val };
    onChange({ ...data, badges: next });
  };
  const addBadge    = () => onChange({ ...data, badges: [...data.badges, { icon: "⭐", label: "New Badge" }] });
  const removeBadge = (i) => onChange({ ...data, badges: data.badges.filter((_, idx) => idx !== i) });

  return (
    <div>
      <SectionCard title="Hero 2 — Text">
        <Field label="Eyebrow Text"  value={data.eyebrow}    onChange={set("eyebrow")}    hint="Small uppercase label above the title" />
        <Field label="Title Line 1"  value={data.titleLine1} onChange={set("titleLine1")} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Accent Word (Red)</label>
            <input value={data.accentKids} onChange={(e) => set("accentKids")(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px",
                fontSize: 13, outline: "none", background: "#fff", color: "#E63329", fontWeight: 800,
                boxSizing: "border-box", marginTop: 4 }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Accent Word (Blue)</label>
            <input value={data.accentBlue} onChange={(e) => set("accentBlue")(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8, padding: "7px 10px",
                fontSize: 13, outline: "none", background: "#fff", color: "#1A5FA8", fontWeight: 800,
                boxSizing: "border-box", marginTop: 4 }} />
          </div>
        </div>
        <Field label="Description" value={data.desc} onChange={set("desc")} multiline />
      </SectionCard>

      <SectionCard title="Badges">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.badges.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input value={b.icon} onChange={(e) => setBadge(i, "icon", e.target.value)}
                style={{ width: 52, border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 6px", fontSize: 20, textAlign: "center", outline: "none", background: "#fff" }} />
              <input value={b.label} onChange={(e) => setBadge(i, "label", e.target.value)}
                placeholder="Badge label"
                style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
              <button onClick={() => removeBadge(i)}
                style={{ background: "#fce8e8", color: "#a32d2d", border: "none",
                  borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✕</button>
            </div>
          ))}
        </div>
        <button onClick={addBadge}
          style={{ marginTop: 10, background: "#e0edff", color: "#1a5fa8", border: "none",
            borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
          + Add Badge
        </button>
      </SectionCard>

      <SectionCard title="Mascot Image (Right Side)">
        <ImageUploadBlock
          label="Hero 2 Mascot Image"
          imageSrc={data.mascotImage}
          uploadEndpoint="/api/cms/upload-stats-image"
          fieldName="stats_image"
          onChange={(path) => onChange({ ...data, mascotImage: path })}
        />
      </SectionCard>
    </div>
  );
}

// ════ AGE BANNER EDITOR ════

function AgeBannerEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  return (
    <SectionCard title="Age Banner">
      <Field label="Heading"      value={data.heading}     onChange={set("heading")} />
      <Field label="Description"  value={data.desc}        onChange={set("desc")} multiline />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Field label="Badge Number (e.g. 0–11)" value={data.badgeNum}   onChange={set("badgeNum")} />
        <Field label="Badge Label (e.g. Years Old)" value={data.badgeLabel} onChange={set("badgeLabel")} />
      </div>
    </SectionCard>
  );
}

// ════ WHO WE ARE EDITOR ════

function WhoWeAreEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });

  const setCard = (ci, field, val) => {
    const next = data.cards.map((c, i) => i === ci ? { ...c, [field]: val } : c);
    onChange({ ...data, cards: next });
  };

  const setListItem = (ci, li, val) => {
    const items = [...data.cards[ci].listItems];
    items[li] = val;
    setCard(ci, "listItems", items);
  };

  const addListItem    = (ci) => setCard(ci, "listItems", [...data.cards[ci].listItems, "New item"]);
  const removeListItem = (ci, li) => setCard(ci, "listItems", data.cards[ci].listItems.filter((_, i) => i !== li));

  const WWA_COLORS = [
    { value: "yellow", label: "Yellow" },
    { value: "blue",   label: "Blue"   },
  ];

  return (
    <div>
      <SectionCard title="Section Header">
        <Field label="Eyebrow" value={data.eyebrow} onChange={set("eyebrow")} hint="Small label above heading (e.g. 'Who We Are')" />
        <Field label="Heading" value={data.heading}  onChange={set("heading")} />
      </SectionCard>

      {data.cards.map((card, ci) => (
        <SectionCard key={ci} title={`Card ${ci + 1} — ${card.title}`}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px", gap: 10, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Icon</label>
              <input value={card.icon} onChange={(e) => setCard(ci, "icon", e.target.value)}
                style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 6px", fontSize: 20, textAlign: "center", outline: "none",
                  background: "#fff", boxSizing: "border-box", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Card Title</label>
              <input value={card.title} onChange={(e) => setCard(ci, "title", e.target.value)}
                style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff",
                  color: "#222", boxSizing: "border-box", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Color</label>
              <select value={card.color} onChange={(e) => setCard(ci, "color", e.target.value)}
                style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                  padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff",
                  color: "#222", boxSizing: "border-box", marginTop: 4, cursor: "pointer" }}>
                {WWA_COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Description</label>
            <textarea value={card.desc} onChange={(e) => setCard(ci, "desc", e.target.value)} rows={3}
              style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff",
                color: "#222", boxSizing: "border-box", marginTop: 4, resize: "vertical", fontFamily: "inherit" }} />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase",
              display: "block", marginBottom: 8 }}>List Items</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {card.listItems.map((item, li) => (
                <div key={li} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input value={item} onChange={(e) => setListItem(ci, li, e.target.value)}
                    style={{ flex: 1, border: "1.5px solid #d0e0f0", borderRadius: 8,
                      padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
                  <button onClick={() => removeListItem(ci, li)}
                    style={{ background: "#fce8e8", color: "#a32d2d", border: "none",
                      borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✕</button>
                </div>
              ))}
            </div>
            <button onClick={() => addListItem(ci)}
              style={{ marginTop: 8, background: "#e0edff", color: "#1a5fa8", border: "none",
                borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              + Add Item
            </button>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

// ════ MISSION BANNER EDITOR ════

function MissionBannerEditor({ data, onChange }) {
  const set = (k) => (v) => onChange({ ...data, [k]: v });
  return (
    <SectionCard title="Mission Statement Banner">
      <Field label="Full Quote Text" value={data.quote} onChange={set("quote")} multiline
        hint="Write the full quote. The highlighted words below will be auto-replaced with coloured spans." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <Field label="Highlight: Safe (Yellow)" value={data.hlSafe}   onChange={set("hlSafe")} />
        <Field label="Highlight: Clean (Green)" value={data.hlClean}  onChange={set("hlClean")} />
        <Field label="Highlight: Secure (Blue)" value={data.hlSecure} onChange={set("hlSecure")} />
      </div>
      <Field label="Attribution" value={data.attr} onChange={set("attr")} hint="e.g. — Fun Factory Mission Statement" />
      <div style={{ marginTop: 12, background: "#1a3a6b", borderRadius: 12, padding: "16px 20px",
        color: "#fff", fontSize: 12, lineHeight: 1.8, textAlign: "center" }}>
        <em>
          "{data.quote.replace(data.hlSafe, `<mark style="background:none;color:#F7C416">${data.hlSafe}</mark>`)}"
        </em>
        <div style={{ marginTop: 8, fontSize: 10, opacity: 0.5, letterSpacing: 2, textTransform: "uppercase" }}>{data.attr}</div>
      </div>
    </SectionCard>
  );
}

// ════ FACILITIES EDITOR ════

const FAC_COLORS = [
  { value: "fac-blue",   label: "Blue"   },
  { value: "fac-pink",   label: "Pink"   },
  { value: "fac-yellow", label: "Yellow" },
  { value: "fac-navy",   label: "Navy"   },
];

function FacilitiesEditor({ data, onChange }) {
  const cards     = data.cards || [];
  const mascotImage = data.mascotImage || "";

  const setCard = (i, field, val) => {
    const next = [...cards];
    next[i] = { ...next[i], [field]: val };
    onChange({ ...data, cards: next });
  };

  const addCard = () => {
    onChange({
      ...data,
      cards: [...cards, { icon: "🎯", title: "New Facility", desc: "Description here", color: "fac-blue" }],
    });
  };

  const removeCard = (i) => {
    onChange({ ...data, cards: cards.filter((_, idx) => idx !== i) });
  };

  const uploadMascot = async (file) => {
    const fd = new FormData();
    fd.append("stats_image", file);
    try {
      const res  = await fetch("/api/cms/upload-stats-image", { method: "POST", body: fd });
      const json = await res.json();
      if (json.path) onChange({ ...data, mascotImage: json.path });
      else alert("Upload failed: " + (json.error || "unknown"));
    } catch (err) { alert("Upload error: " + err.message); }
  };

  return (
    <div>
      <SectionCard title="Facility Cards">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              border: "1.5px solid #d0e0f0", borderRadius: 12, padding: "14px 16px",
              background: "#f8fbff", position: "relative",
            }}>
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <button onClick={() => removeCard(i)}
                  style={{ background: "#fce8e8", color: "#a32d2d", border: "none",
                    borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✕</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 120px", gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Icon</label>
                  <input value={card.icon} onChange={(e) => setCard(i, "icon", e.target.value)}
                    style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                      padding: "7px 6px", fontSize: 20, textAlign: "center", outline: "none",
                      background: "#fff", boxSizing: "border-box", marginTop: 4 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Title</label>
                  <input value={card.title} onChange={(e) => setCard(i, "title", e.target.value)}
                    style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                      padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff",
                      color: "#222", boxSizing: "border-box", marginTop: 4 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Color</label>
                  <select value={card.color} onChange={(e) => setCard(i, "color", e.target.value)}
                    style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                      padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff",
                      color: "#222", boxSizing: "border-box", marginTop: 4, cursor: "pointer" }}>
                    {FAC_COLORS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    background:
                      card.color === "fac-blue"   ? "#b2e0f7" :
                      card.color === "fac-pink"   ? "#f7cfe4" :
                      card.color === "fac-yellow" ? "#fde68a" :
                      card.color === "fac-navy"   ? "#3b4f7c" : "#e0e0e0",
                    border: "1.5px solid #d0e0f0",
                    marginBottom: 0,
                  }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>Description</label>
                <textarea value={card.desc} onChange={(e) => setCard(i, "desc", e.target.value)} rows={2}
                  style={{ width: "100%", border: "1.5px solid #d0e0f0", borderRadius: 8,
                    padding: "7px 10px", fontSize: 13, outline: "none", background: "#fff",
                    color: "#222", boxSizing: "border-box", marginTop: 4, resize: "vertical",
                    fontFamily: "inherit" }} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addCard}
          style={{ marginTop: 12, background: "#e0edff", color: "#1a5fa8", border: "none",
            borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
          + Add Facility Card
        </button>
      </SectionCard>

      <SectionCard title="Mascot / Side Image">
        <ImageUploadBlock
          label="Facilities Section — Mascot Image"
          imageSrc={mascotImage}
          uploadEndpoint="/api/cms/upload-stats-image"
          fieldName="stats_image"
          onChange={(path) => onChange({ ...data, mascotImage: path })}
        />
        <p style={{ fontSize: 11, color: "#888", margin: "4px 0 0" }}>
          This is the image shown on the right side of the facilities section (mascot / kid photo).
        </p>
      </SectionCard>
    </div>
  );
}

// ════ LIVE PREVIEW ════

function LivePreview({ data }) {
  const sliderImages = (data.hero.sliderImages || []).filter(Boolean);

  return (
    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, color: "#222" }}>

      {/* TOP BANNER */}
      <div style={{ background: "#3BAEE8", color: "#fff", textAlign: "center",
        padding: "8px 16px", fontSize: 12, fontWeight: 700, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        <span>{data.topBanner.emoji} {data.topBanner.text}</span>
        <span style={{ opacity: 0.5 }}>—</span>
        <span style={{ color: "#F7C416" }}>{data.topBanner.location1} &amp; {data.topBanner.location2}</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>{data.topBanner.suffix}</span>
      </div>

      {/* NAVBAR */}
      <div style={{ background: "#D6EFFA", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "8px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)", gap: 6, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {data.navbar.logoSrc
            ? <img src={data.navbar.logoSrc} alt="Fun Factory"
                style={{ height: 40, width: "auto", objectFit: "contain" }}
                onError={(e) => { e.target.style.display = "none"; }} />
            : <span style={{ fontWeight: 800, fontSize: 14, color: "#1A5FA8" }}>🎉 Fun Factory</span>
          }
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
          {data.navbar.links.map((link, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "4px 8px",
              borderRadius: 6, color: "#222" }}>{link.label}</span>
          ))}
          <span style={{ background: "#F7C416", color: "#222", fontWeight: 800, fontSize: 11,
            padding: "6px 14px", borderRadius: 20, marginLeft: 6, boxShadow: "0 3px 0 #c9980e" }}>
            {data.navbar.ctaLabel}
          </span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: "28px 24px 20px", background: "rgba(255,255,255,0.9)",
        display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontFamily: "serif", fontSize: 28, lineHeight: 1.15, marginBottom: 10 }}>
            <div style={{ color: "#1A5FA8", fontWeight: 900 }}>{data.hero.line1}</div>
            <div style={{ color: "#F7C416", fontWeight: 900 }}>{data.hero.line2}</div>
            <div style={{ color: "#F47920", fontWeight: 900 }}>{data.hero.line3}</div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{data.hero.subtitle}</div>
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 14, maxWidth: 400 }}>
            {data.hero.description}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ background: "#F7C416", color: "#222", fontWeight: 800, fontSize: 12,
              padding: "8px 18px", borderRadius: 20, boxShadow: "0 3px 0 #c9980e" }}>{data.hero.cta1}</span>
            <span style={{ color: "#1A5FA8", fontWeight: 800, fontSize: 12, padding: "8px 0" }}>{data.hero.cta2}</span>
          </div>
        </div>
        {sliderImages.length > 0 && <SliderPreview images={sliderImages} />}
      </div>

      {/* HERO 2 */}
      {data.hero2 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
          padding: "32px 28px", background: "rgba(255,255,255,0.6)", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2,
              textTransform: "uppercase", color: "#E63329" }}>{data.hero2.eyebrow}</div>
            <div style={{ fontFamily: "serif", fontSize: 28, lineHeight: 1.1, color: "#1a1a2e" }}>
              {data.hero2.titleLine1}<br />
              <span style={{ color: "#E63329" }}>{data.hero2.accentKids}</span>
              <span style={{ color: "#1A5FA8" }}>{data.hero2.accentBlue}</span>
            </div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{data.hero2.desc}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(data.hero2.badges || []).map((b, i) => (
                <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8,
                  border: "2px solid #dde", borderRadius: 50, padding: "7px 16px",
                  fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.8)",
                  width: "fit-content", color: "#333" }}>
                  <span>{b.icon}</span>{b.label}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {data.hero2.mascotImage
              ? <img src={data.hero2.mascotImage} alt="Mascot"
                  style={{ maxHeight: 200, width: "auto", objectFit: "contain" }}
                  onError={(e) => { e.target.style.display = "none"; }} />
              : <div style={{ width: 160, height: 160, background: "#f0f0f0",
                  borderRadius: 12, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 11, color: "#aaa" }}>No image</div>
            }
          </div>
        </div>
      )}

      {/* AGE BANNER */}
      {data.ageBanner && (
        <div style={{ margin: "0 16px 16px", background: "linear-gradient(135deg,#fff9c4,#ffe082)",
          borderRadius: 20, padding: "28px 32px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 20, border: "2px solid #fdd835", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "serif", fontSize: 22, fontWeight: 900,
              color: "#1a1a2e", marginBottom: 6 }}>{data.ageBanner.heading}</div>
            <div style={{ fontSize: 12, color: "#555", fontWeight: 600, maxWidth: 320 }}>
              {data.ageBanner.desc}
            </div>
          </div>
          <div style={{ background: "#fff", border: "3px solid #F7C416", borderRadius: 16,
            padding: "14px 28px", textAlign: "center",
            boxShadow: "0 6px 20px rgba(247,196,22,0.3)", flexShrink: 0 }}>
            <div style={{ fontFamily: "serif", fontSize: 36, lineHeight: 1,
              color: "#1A5FA8", fontWeight: 900 }}>{data.ageBanner.badgeNum}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#555", marginTop: 4 }}>
              {data.ageBanner.badgeLabel}
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      <div style={{ display: "flex", gap: 20, padding: "16px 24px", background: "#fff",
        borderTop: "2px solid #D6EFFA", flexWrap: "wrap", justifyContent: "center",
        alignItems: "center" }}>
        {(data.stats.items || data.stats).map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 900, fontSize: 22, color: "#1A5FA8" }}>{s.number}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#888",
              textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
        {data.stats.imageSrc && (
          <img src={data.stats.imageSrc} alt="Stats"
            style={{ height: 70, width: "auto", objectFit: "contain", marginLeft: 8 }}
            onError={(e) => { e.target.style.display = "none"; }} />
        )}
      </div>

      {/* FEATURES */}
      <div style={{ background: "linear-gradient(135deg,#1A5FA8,#3BAEE8)", padding: "18px 24px",
        display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
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

      {/* FACILITIES */}
      {data.facilities && (
        <div style={{ background: "rgba(255,255,255,0.7)", padding: "20px 24px" }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 14, flex: 2, flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, minWidth: 140 }}>
                {(data.facilities.cards || []).filter((_, i) => i % 2 === 0).map((card, i) => (
                  <div key={i} style={{ borderRadius: 16, padding: "14px 16px",
                    background: card.color === "fac-blue" ? "#b2e0f7" : card.color === "fac-pink" ? "#f7cfe4" : card.color === "fac-yellow" ? "#fde68a" : card.color === "fac-navy" ? "#3b4f7c" : "#e0e0e0" }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{card.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: card.color === "fac-navy" ? "#fff" : "#1a1a2e", marginBottom: 4 }}>{card.title}</div>
                    <div style={{ fontSize: 11, color: card.color === "fac-navy" ? "rgba(255,255,255,0.8)" : "#555" }}>{card.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, minWidth: 140 }}>
                {(data.facilities.cards || []).filter((_, i) => i % 2 === 1).map((card, i) => (
                  <div key={i} style={{ borderRadius: 16, padding: "14px 16px",
                    background: card.color === "fac-blue" ? "#b2e0f7" : card.color === "fac-pink" ? "#f7cfe4" : card.color === "fac-yellow" ? "#fde68a" : card.color === "fac-navy" ? "#3b4f7c" : "#e0e0e0" }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{card.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: card.color === "fac-navy" ? "#fff" : "#1a1a2e", marginBottom: 4 }}>{card.title}</div>
                    <div style={{ fontSize: 11, color: card.color === "fac-navy" ? "rgba(255,255,255,0.8)" : "#555" }}>{card.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {data.facilities.mascotImage && (
              <div style={{ flex: 1, minWidth: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={data.facilities.mascotImage} alt="Mascot"
                  style={{ maxHeight: 180, width: "auto", objectFit: "contain", borderRadius: 12 }}
                  onError={(e) => { e.target.style.display = "none"; }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* WHO WE ARE */}
      {data.whoWeAre && (
        <div style={{ padding: "24px 24px 16px", background: "#fff" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#E63329",
            textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>{data.whoWeAre.eyebrow}</div>
          <div style={{ fontFamily: "serif", fontSize: 22, fontWeight: 900,
            color: "#1a1a2e", marginBottom: 14 }}>{data.whoWeAre.heading}</div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {(data.whoWeAre.cards || []).map((card, i) => (
              <div key={i} style={{ flex: 1, minWidth: 180, borderRadius: 16, padding: "16px 18px",
                background: card.color === "yellow" ? "#fffde7" : "#e3f2fd",
                border: `2px solid ${card.color === "yellow" ? "#fdd835" : "#90caf9"}` }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e", marginBottom: 6 }}>{card.title}</div>
                <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>{card.desc}</div>
                <ul style={{ paddingLeft: 16, margin: 0 }}>
                  {(card.listItems || []).map((item, j) => (
                    <li key={j} style={{ fontSize: 11, color: "#444", fontWeight: 600, marginBottom: 3 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MISSION BANNER */}
      {data.missionBanner && (
        <div style={{ background: "#1a4a8a", padding: "28px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.8, fontWeight: 700, maxWidth: 600, margin: "0 auto" }}>
            "{data.missionBanner.quote}"
          </div>
          <div style={{ marginTop: 10, fontSize: 10, color: "rgba(255,255,255,0.5)",
            letterSpacing: 2, textTransform: "uppercase" }}>{data.missionBanner.attr}</div>
        </div>
      )}

      {/* LOCATIONS */}
      <div style={{ padding: "20px 24px", background: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#F47920",
          textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Find Us</div>
        <div style={{ fontWeight: 900, fontSize: 18, color: "#1a1a2e", marginBottom: 14 }}>Two Locations</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {data.locations.map((loc, i) => (
            <div key={i} style={{ flex: 1, minWidth: 160,
              background: i === 0 ? "#F8D7DA" : "#FFF9C4",
              border: `2px solid ${i === 0 ? "#f0b8be" : "#FFD600"}`,
              borderRadius: 16, padding: "14px 16px" }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e", marginBottom: 4 }}>{loc.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>📍 {loc.address}</div>
              <div style={{ fontSize: 11, color: "#666", fontWeight: 700 }}>📞 {loc.phone1} · {loc.phone2}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0e3d6e", color: "rgba(255,255,255,0.5)",
        textAlign: "center", padding: "14px", fontSize: 11 }}>
        {data.footer?.copyright} &nbsp;·&nbsp; ♥ {data.footer?.tagline}
      </div>
    </div>
  );
}

// ════ CODE OUTPUT ════

function CodeOutput({ data }) {
  const sliderImages = (data.hero.sliderImages || []).filter(Boolean);
  const statsItems   = data.stats.items || data.stats;
  const statsImgSrc  = data.stats.imageSrc || "";

  const sliderHtml = sliderImages.length > 0
    ? `\n<!-- HERO SLIDER -->\n<div class="hero-slider">\n` +
      sliderImages.map((src, i) =>
        `    <div class="hero-slide${i === 0 ? ' active' : ''}">\n        <img src="${src}" alt="Slide ${i+1}">\n    </div>`
      ).join("\n") +
      `\n    <div class="hero-slider-dots">\n` +
      sliderImages.map((_, i) =>
        `        <button class="dot${i === 0 ? ' active' : ''}" data-slide="${i}"></button>`
      ).join("\n") +
      `\n    </div>\n</div>`
    : '';

  const statsHtml = `\n<!-- STATS BAR -->\n<div class="stats-bar">\n` +
    statsItems.map((s) =>
      `    <div class="stat"><div class="stat-number">${s.number}</div><div class="stat-label">${s.label}</div></div>`
    ).join("\n") +
    (statsImgSrc ? `\n    <img class="img-ss" src="${statsImgSrc}" alt="Fun Factory">` : "") +
    `\n</div>`;

  const hero2Data   = data.hero2   || defaultData.hero2;
  const ageBannerData = data.ageBanner || defaultData.ageBanner;

  const hero2Html = `
<!-- HERO 2 -->
<section class="hero2">
    <div class="hero2-left">
        <p class="eyebrow">${hero2Data.eyebrow}</p>
        <h1 class="hero2-title">
            ${hero2Data.titleLine1}<br>
            <span class="accent-kids">${hero2Data.accentKids}</span>
            <span class="accent-blue">${hero2Data.accentBlue}</span>
        </h1>
        <p class="hero2-desc">${hero2Data.desc}</p>
        <div class="badges">
${(hero2Data.badges || []).map((b) => `            <div class="badge"><span class="badge-icon">${b.icon}</span> ${b.label}</div>`).join("\n")}
        </div>
    </div>
    <div class="hero2-right">
        <div class="mascot-wrap">
            <div class="mascot-glow"></div>
            <div class="splash s1"></div><div class="splash s2"></div>
            <div class="splash s3"></div><div class="splash s4"></div>
            <img class="mascot-img" src="${hero2Data.mascotImage}" alt="Fun Factory Mascot">
        </div>
    </div>
</section>`;

  const ageBannerHtml = `
<!-- AGE BANNER -->
<div class="age-banner">
    <div class="age-left">
        <h2>${ageBannerData.heading}</h2>
        <p>${ageBannerData.desc}</p>
    </div>
    <div class="age-badge">
        <div class="num">${ageBannerData.badgeNum}</div>
        <div class="label">${ageBannerData.badgeLabel}</div>
    </div>
</div>`;

  const facilitiesData = data.facilities || { cards: [], mascotImage: "" };
  const facilitiesHtml = facilitiesData.cards.length > 0
    ? `\n<!-- FACILITIES -->\n<section class="section" style="background:rgba(255,255,255,0.7);" id="Facilities">\n    <div class="facilities-grid">\n` +
      // column 1: even-indexed cards
      `        <div class="fac-col">\n` +
      facilitiesData.cards.filter((_, i) => i % 2 === 0).map((c) =>
        `            <div class="fac-card ${c.color}">\n                <div class="fac-icon">${c.icon}</div>\n                <div class="fac-title">${c.title}</div>\n                <div class="fac-desc">${c.desc}</div>\n            </div>`
      ).join("\n") +
      `\n        </div>\n` +
      // column 2: odd-indexed cards
      `        <div class="fac-col">\n` +
      facilitiesData.cards.filter((_, i) => i % 2 === 1).map((c) =>
        `            <div class="fac-card ${c.color}">\n                <div class="fac-icon">${c.icon}</div>\n                <div class="fac-title">${c.title}</div>\n                <div class="fac-desc">${c.desc}</div>\n            </div>`
      ).join("\n") +
      `\n        </div>\n` +
      // mascot column
      (facilitiesData.mascotImage
        ? `        <div class="mascot-col">\n            <div class="mascot-wrap">\n                <div class="mascot-glow"></div>\n                <div class="splash s1"></div>\n                <div class="splash s2"></div>\n                <div class="splash s3"></div>\n                <div class="splash s4"></div>\n                <img class="mascot-img" src="${facilitiesData.mascotImage}" alt="Kids playing">\n            </div>\n        </div>\n`
        : "") +
      `    </div>\n</section>`
    : "";

  const wwaData = data.whoWeAre || defaultData.whoWeAre;
  const whoWeAreHtml = `
<!-- WHO WE ARE -->
<section class="who-we-are">
    <p class="wwa-eyebrow">${wwaData.eyebrow}</p>
    <h2 class="wwa-heading">${wwaData.heading}</h2>
    <div class="wwa-cards">
${(wwaData.cards || []).map((c) =>
`        <div class="wwa-card wwa-card-${c.color}">
            <div class="wwa-card-icon icon-${c.color}">${c.icon}</div>
            <h3 class="wwa-card-title">${c.title}</h3>
            <p class="wwa-card-desc">${c.desc}</p>
            <ul class="wwa-list">
${(c.listItems || []).map((li) => `                <li>${li}</li>`).join("\n")}
            </ul>
        </div>`).join("\n")}
    </div>
</section>`;

  const mbData = data.missionBanner || defaultData.missionBanner;
  // Build quote with highlights
  const buildQuote = (mb) => {
    let q = mb.quote;
    if (mb.hlSafe)   q = q.replace(mb.hlSafe,   `<span class="hl-safe">${mb.hlSafe}</span>`);
    if (mb.hlClean)  q = q.replace(mb.hlClean,  `<span class="hl-clean">${mb.hlClean}</span>`);
    if (mb.hlSecure) q = q.replace(mb.hlSecure, `<span class="hl-secure">${mb.hlSecure}</span>`);
    return q;
  };
  const missionHtml = `
<!-- MISSION STATEMENT BANNER -->
<div class="mission-banner">
    <p class="mission-quote">
        "${buildQuote(mbData)}"
    </p>
    <p class="mission-attr">${mbData.attr}</p>
</div>`;

  const code = `<!-- TOP BANNER -->
<div class="top-banner">
    ${data.topBanner.emoji} ${data.topBanner.text}
    <span class="divider">—</span>
    <span>${data.topBanner.location1} &amp; ${data.topBanner.location2}</span>
    <span class="divider">|</span>
    ${data.topBanner.suffix}
</div>

<!-- NAVBAR -->
<nav>
    <div class="logo">
        <img src="${data.navbar.logoSrc || 'images/logo.png'}" alt="Fun Factory">
    </div>
    <ul class="nav-links">
${data.navbar.links.map((l) => `        <li><a href="${l.href}">${l.label}</a></li>`).join("\n")}
        <li><a href="${data.navbar.ctaHref}" class="btn-book-nav">${data.navbar.ctaLabel}</a></li>
    </ul>
</nav>

<!-- HERO TEXT -->
<h1 class="hero-title-1">
    <span class="line1">${data.hero.line1}</span><br>
    <span class="line2">${data.hero.line2}</span><br>
    <span class="line3">${data.hero.line3}</span>
</h1>
<p class="hero-subtitle">${data.hero.subtitle}</p>
<p class="hero-desc-1">${data.hero.description}</p>
<div class="hero-buttons">
    <a href="#" class="btn-yellow">${data.hero.cta1}</a>
    <a href="#" class="btn-outline-blue">${data.hero.cta2}</a>
</div>
${sliderHtml}
${statsHtml}
${hero2Html}
${ageBannerHtml}
${facilitiesHtml}
${whoWeAreHtml}
${missionHtml}`;

  return (
    <div style={{ position: "relative" }}>
      <pre style={{ background: "#0e1929", color: "#7dd3fc", borderRadius: 12,
        padding: "16px 18px", fontSize: 11, lineHeight: 1.6, overflowX: "auto",
        margin: 0, fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {code}
      </pre>
      <button onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(code); }}
        style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.1)",
          color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6,
          padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>Copy</button>
    </div>
  );
}

// ════ MAIN APP ════

function FunFactoryCMS() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("ff_cms_data");
      return saved ? JSON.parse(saved) : defaultData;
    } catch { return defaultData; }
  });
  const [activeSection, setActiveSection] = useState("topBanner");
  const [activeTab,     setActiveTab]     = useState("edit");
  const [saved,         setSaved]         = useState(false);
  const [aiLoading,     setAiLoading]     = useState(false);
  const [aiPrompt,      setAiPrompt]      = useState("");

  const updateSection = useCallback((section, val) => {
    setData((prev) => ({ ...prev, [section]: val }));
    setSaved(false);
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/cms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API error");

      // ✅ API response ලෙස updated data return කළොත් state update කරනවා
      const updated = await res.json();
      if (updated?.data) {
        setData(updated.data);        // ← API data එකෙන් UI update
        localStorage.setItem("ff_cms_data", JSON.stringify(updated.data));
      } else {
        localStorage.setItem("ff_cms_data", JSON.stringify(data));
      }
    } catch (e) {
      try { localStorage.setItem("ff_cms_data", JSON.stringify(data)); }
      catch (le) { alert("Save failed: " + le.message); return; }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAI = async () => {
    if (!aiPrompt.trim() || aiLoading) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/cms/ai-edit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `You are helping edit a Fun Factory kids indoor playground website in Sri Lanka.
Current section data: ${JSON.stringify(data[activeSection], null, 2)}
User request: "${aiPrompt}"
Reply ONLY with a valid JSON object matching the same structure. No explanation, no markdown.`
          }]
        }),
      });
      const result = await res.json();
      const text   = result.content?.[0]?.text || "";
      const clean  = text.replace(/```json|```/g, "").trim();
      updateSection(activeSection, JSON.parse(clean));
      setAiPrompt("");
    } catch (e) { alert("AI edit failed. Check console."); console.error(e); }
    setAiLoading(false);
  };

  const renderEditor = () => {
    switch (activeSection) {
      case "topBanner": return <TopBannerEditor data={data.topBanner} onChange={(v) => updateSection("topBanner", v)} />;
      case "navbar":    return <NavbarEditor    data={data.navbar}    onChange={(v) => updateSection("navbar", v)} />;
      case "hero":      return <HeroEditor      data={data.hero}      onChange={(v) => updateSection("hero", v)} />;
      case "hero2":     return <Hero2Editor     data={data.hero2 || defaultData.hero2} onChange={(v) => updateSection("hero2", v)} />;
      case "ageBanner": return <AgeBannerEditor data={data.ageBanner || defaultData.ageBanner} onChange={(v) => updateSection("ageBanner", v)} />;
      case "stats":     return <StatsEditor     data={data.stats}     onChange={(v) => updateSection("stats", v)} />;
      case "features":   return <FeaturesEditor   data={data.features}   onChange={(v) => updateSection("features", v)} />;
      case "locations":  return <LocationsEditor  data={data.locations}  onChange={(v) => updateSection("locations", v)} />;
      case "facilities":    return <FacilitiesEditor    data={data.facilities    || { cards: [], mascotImage: "" }} onChange={(v) => updateSection("facilities", v)} />;
      case "whoWeAre":      return <WhoWeAreEditor      data={data.whoWeAre      || defaultData.whoWeAre}          onChange={(v) => updateSection("whoWeAre", v)} />;
      case "missionBanner": return <MissionBannerEditor data={data.missionBanner || defaultData.missionBanner}     onChange={(v) => updateSection("missionBanner", v)} />;
      case "footer":        return <FooterEditor        data={data.footer}                                         onChange={(v) => updateSection("footer", v)} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Nunito, sans-serif",
      background: "#f4f8fc", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <div style={{ width: 210, background: "#1a3a6b", display: "flex",
        flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "20px 16px 14px" }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 2 }}>🎉 Fun Factory</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 1 }}>CONTENT MANAGER</div>
        </div>
        <div style={{ flex: 1, padding: "6px 10px" }}>
          {SECTIONS.map((s) => (
            <button key={s.key} onClick={() => setActiveSection(s.key)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "10px 12px", borderRadius: 10, border: "none",
                background: activeSection === s.key ? "rgba(255,255,255,0.15)" : "transparent",
                color: activeSection === s.key ? "#fff" : "rgba(255,255,255,0.65)",
                fontWeight: activeSection === s.key ? 800 : 600, fontSize: 13,
                cursor: "pointer", textAlign: "left", marginBottom: 2,
                transition: "all 0.15s", fontFamily: "inherit" }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              {s.label}
              {activeSection === s.key && (
                <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                  background: "#F7C416", flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>
        <div style={{ padding: "14px 10px 18px" }}>
          <button onClick={handleSave}
            style={{ width: "100%", background: saved ? "#0f6e56" : "#F7C416",
              color: saved ? "#fff" : "#1a1a2e", border: "none", borderRadius: 10,
              padding: "11px", fontWeight: 900, fontSize: 13, cursor: "pointer",
              transition: "all 0.2s", fontFamily: "inherit" }}>
            {saved ? "✓ Saved!" : "💾 Save Changes"}
          </button>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: 8 }}>
            Changes update in real-time
          </div>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1.5px solid #e0eaf5", padding: "12px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1a3a6b" }}>
              {SECTIONS.find((s) => s.key === activeSection)?.icon}{" "}
              {SECTIONS.find((s) => s.key === activeSection)?.label}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>Edit content below — preview updates instantly</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["edit", "preview", "code"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ padding: "7px 16px", borderRadius: 8, border: "1.5px solid",
                  borderColor: activeTab === tab ? "#1a5fa8" : "#d0e0f0",
                  background: activeTab === tab ? "#1a5fa8" : "#fff",
                  color: activeTab === tab ? "#fff" : "#555",
                  fontWeight: 700, fontSize: 12, cursor: "pointer",
                  textTransform: "capitalize", fontFamily: "inherit" }}>
                {tab === "edit" ? "✏️ Edit" : tab === "preview" ? "👁 Preview" : "🔧 Code"}
              </button>
            ))}
          </div>
        </div>

        {/* AI Bar */}
        <div style={{ background: "linear-gradient(90deg,#e8f0ff,#f0e8ff)",
          borderBottom: "1.5px solid #d0d0f0", padding: "10px 24px",
          display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 14 }}>🤖</span>
          <input value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAI()}
            placeholder={`Ask AI to edit "${SECTIONS.find(s => s.key === activeSection)?.label}"...`}
            style={{ flex: 1, border: "1.5px solid #c0c8f0", borderRadius: 8,
              padding: "8px 12px", fontSize: 13, outline: "none", background: "#fff", color: "#222" }} />
          <button onClick={handleAI} disabled={aiLoading || !aiPrompt.trim()}
            style={{ background: aiLoading ? "#888" : "#534AB7", color: "#fff", border: "none",
              borderRadius: 8, padding: "8px 18px", fontWeight: 800, fontSize: 13,
              cursor: aiLoading ? "not-allowed" : "pointer", flexShrink: 0, fontFamily: "inherit" }}>
            {aiLoading ? "Thinking..." : "✨ Apply"}
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: activeTab === "edit" ? "20px 24px" : 0 }}>
          {activeTab === "edit" && renderEditor()}
          {activeTab === "preview" && (
            <div style={{ background: "#fff", minHeight: "100%" }}>
              <div style={{ background: "#e8f0fb", padding: "8px 16px", fontSize: 11,
                fontWeight: 700, color: "#1a5fa8", borderBottom: "1px solid #d0e0f5" }}>
                📱 LIVE PREVIEW — All sections shown
              </div>
              <LivePreview data={data} />
            </div>
          )}
          {activeTab === "code" && (
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 12, fontSize: 13, color: "#555", fontWeight: 600 }}>
                Copy this HTML and paste it into your <strong>index.html</strong>:
              </div>
              <CodeOutput data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('cms-root'));
root.render(<FunFactoryCMS />);
