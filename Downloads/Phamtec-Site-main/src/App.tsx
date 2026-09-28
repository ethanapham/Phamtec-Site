import { useState, useEffect, useRef } from 'react';

// Brand colors: #b2d237 lime, #aeafaf mid-gray, #2d3e51 steel-navy
const C = {
  lime: '#b2d237',
  limeHover: '#9ebb2e',
  gray: '#aeafaf',
  navy: '#2d3e51',
  navyDark: '#1e2d3a',
  bg: '#0d1822',
  bgCard: '#152030',
};

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Phamtec', href: '#why' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
];

const SERVICES = [
  {
    id: 'cnc',
    label: 'CNC Machining',
    headline: 'Precision CNC Machining for Complex Parts',
    description:
      'From prototypes to production runs, our CNC machining capabilities deliver tight-tolerance components in aluminum, steel, titanium, and more. We hold ±0.001" tolerances across 3-, 4-, and 5-axis configurations.',
    features: ['3-, 4-, and 5-axis milling', 'Turning & Swiss-type turning', 'Materials: Al, Ti, SS, brass', 'Tolerances to ±0.001"'],
    image: 'https://images.unsplash.com/photo-1666634157070-6fd830fb5672?w=800&h=560&fit=crop&auto=format',
  },
  {
    id: 'extrusion',
    label: 'Extrusion & Assembly',
    headline: 'Structural Extrusion Cutting & Assembly',
    description:
      'We cut and assemble 8020 and Bosch Rexroth T-slot profiles to your exact specifications. Ideal for machine frames, workstations, carts, and enclosures — delivered ready to integrate.',
    features: ['8020 & Bosch Rexroth systems', 'Custom cut lengths', 'Full sub-assembly', 'Hardware kitting included'],
    image: 'https://images.unsplash.com/photo-1713371398485-7bde1bde9def?w=800&h=560&fit=crop&auto=format',
  },
  {
    id: 'welding',
    label: 'Tube Frame Welding',
    headline: 'Tube Frame & Structural Welding',
    description:
      'Our certified welders fabricate tube frames, brackets, and structural weldments to your drawings. MIG, TIG, and spot welding across steel, aluminum, and stainless steel.',
    features: ['MIG, TIG & spot welding', 'Steel, Al & stainless', 'Certified welders', 'Drawing-based or design-assist'],
    image: 'https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=800&h=560&fit=crop&auto=format',
  },
  {
    id: 'laser',
    label: 'Laser Engraving',
    headline: 'High-Definition Laser Engraving',
    description:
      'Permanent marking for branding, part identification, serial numbers, and compliance labels. We engrave metals, plastics, anodized surfaces, and more with sub-millimeter precision.',
    features: ['Metals, plastics, anodized', 'Serial & batch marking', 'Logo & artwork engraving', 'Compliance labeling'],
    image: 'https://images.unsplash.com/photo-1738162837438-92ff852619a1?w=800&h=560&fit=crop&auto=format',
  },
  {
    id: 'sheetmetal',
    label: 'Sheet Metal',
    headline: 'Sheet Metal Fabrication & Outsourcing',
    description:
      'We coordinate precision sheet metal fabrication through vetted partners — laser cutting, bending, punching, and finishing — so you get a single point of contact for complex sheet-metal assemblies.',
    features: ['Laser cutting & punching', 'CNC bending & forming', 'Powder coat & anodize', 'Single-source coordination'],
    image: 'https://images.unsplash.com/photo-1738162837451-2041c1418f54?w=800&h=560&fit=crop&auto=format',
  },
  {
    id: 'fixture',
    label: 'Fixture Design',
    headline: 'Mechanical Fixture Design & Build',
    description:
      'Custom tooling and fixture design for manufacturing, inspection, and testing applications. We take your functional requirements and deliver production-ready fixtures that reduce setup time and improve repeatability.',
    features: ['Design-to-build capability', 'Machining & assembly jigs', 'Inspection fixtures', 'Rapid iteration'],
    image: 'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=800&h=560&fit=crop&auto=format',
  },
];

const STATS = [
  { value: '20+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '2', label: 'Countries Served' },
  { value: '100%', label: 'In-House Quality Control' },
];

const WHY_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Tight-Tolerance Expertise',
    desc: 'We hold ±0.001" across CNC and fixture work. Our machinists are hands-on from setup to final inspection.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Fast Turnaround',
    desc: 'From quote to delivery, we move fast. Rush projects are our specialty — without cutting corners on quality.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: 'One-Stop Fabrication',
    desc: 'CNC, welding, laser engraving, extrusion, and sheet metal under one roof. Fewer vendors, cleaner project flow.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Dedicated Account Support',
    desc: 'You work directly with our team — not a portal. Real people, real answers, real accountability.',
  },
];

const INDUSTRIES = [
  { name: 'Semiconductor', icon: '⬡' },
  { name: 'Defense & Aerospace', icon: '✈' },
  { name: 'Medical Devices', icon: '✚' },
  { name: 'Robotics & Automation', icon: '⚙' },
  { name: 'Energy', icon: '⚡' },
  { name: 'Consumer Electronics', icon: '◻' },
];

function useCountUp(target: number, trigger: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const numericPart = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const count = useCountUp(numericPart, visible);
  return (
    <div ref={ref} className="text-center px-8">
      <div className="text-4xl font-black font-display text-white mb-1" style={{ fontFamily: "'Barlow', sans-serif" }}>
        {visible ? `${count}${suffix}` : value}
      </div>
      <div className="text-sm uppercase tracking-widest" style={{ color: C.gray }}>{label}</div>
    </div>
  );
}

export default function App() {
  const [activeService, setActiveService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Phamtec Inquiry${formData.service ? ` — ${SERVICES.find(s => s.id === formData.service)?.label ?? formData.service}` : ''}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:cs@phamtecinc.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const service = SERVICES[activeService];

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: C.bg, fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? `${C.bg}f7` : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(255,255,255,0.07)` : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: C.lime }}>
              <span className="font-black text-sm leading-none" style={{ color: C.navyDark, fontFamily: "'Barlow', sans-serif" }}>P</span>
            </div>
            <span className="font-black text-xl tracking-tight text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>PHAMTEC</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-sm tracking-wide transition-colors duration-150 hover:text-white" style={{ color: C.gray }}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="px-5 py-2 rounded text-sm font-semibold transition-colors duration-150"
              style={{ background: C.lime, color: C.navyDark }}
              onMouseEnter={e => (e.currentTarget.style.background = C.limeHover)}
              onMouseLeave={e => (e.currentTarget.style.background = C.lime)}
            >
              Contact Us
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-white">
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mt-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mt-1.5 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4" style={{ background: C.bg }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: C.gray }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="px-5 py-2 rounded text-sm font-semibold text-center" style={{ background: C.lime, color: C.navyDark }}>
              Contact Us
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=1600&h=900&fit=crop&auto=format')" }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg} 45%, ${C.bg}bb 70%, ${C.bg}44 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg} 0%, transparent 40%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border" style={{ background: `${C.lime}18`, borderColor: `${C.lime}44` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.lime }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: C.lime }}>Milpitas, CA · Est. 2000</span>
            </div>

            <h1 className="font-black text-5xl lg:text-7xl leading-[0.95] uppercase tracking-tight mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Precision<br />
              <span style={{ color: C.lime }}>Fabrication</span><br />
              On Demand
            </h1>

            <p className="text-lg leading-relaxed max-w-lg mb-10" style={{ color: C.gray }}>
              CNC machining, tube welding, laser engraving, and structural assembly — all from a single team in Silicon Valley. We deliver tight-tolerance parts and assemblies for the most demanding applications.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-3.5 font-semibold rounded text-base transition-colors duration-150"
                style={{ background: C.lime, color: C.navyDark }}
                onMouseEnter={e => (e.currentTarget.style.background = C.limeHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.lime)}
              >
                Contact Us
              </a>
              <a href="#services" className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-white font-semibold rounded text-base transition-colors duration-150">
                View Services
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {['CNC Machining', 'Tube Welding', 'Laser Engraving', 'Sheet Metal', 'Fixture Design'].map(tag => (
                <span key={tag} className="px-3 py-1 border rounded-full text-xs tracking-wide" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: C.gray }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/10" style={{ background: C.navy }}>
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(s => <StatItem key={s.label} value={s.value} label={s.label} />)}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.lime }}>What We Do</p>
            <h2 className="font-black text-4xl lg:text-5xl uppercase leading-tight" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Full-Spectrum<br />Fabrication Services
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveService(i)}
                className="px-5 py-3 text-sm font-semibold rounded-t transition-all duration-150 -mb-px border-b-2"
                style={{
                  borderBottomColor: i === activeService ? C.lime : 'transparent',
                  color: i === activeService ? '#fff' : C.gray,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-black text-3xl lg:text-4xl uppercase leading-tight mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                {service.headline}
              </h3>
              <p className="leading-relaxed mb-8 text-base" style={{ color: C.gray }}>{service.description}</p>
              <ul className="space-y-3 mb-10">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-200">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border" style={{ background: `${C.lime}22`, borderColor: `${C.lime}55` }}>
                      <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke={C.lime} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8.5 2.5L4 7.5l-2-2" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 font-semibold rounded text-sm transition-colors duration-150"
                  style={{ background: C.lime, color: C.navyDark }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.limeHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.lime)}
                >
                  Get a Quote
                </a>
                <a href="#contact" className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded text-sm transition-colors duration-150">
                  Learn More
                </a>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden aspect-[4/3]" style={{ background: C.bgCard }}>
              <img key={service.id} src={service.image} alt={service.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PHAMTEC ── */}
      <section id="why" className="py-24 px-6" style={{ background: C.navyDark }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.lime }}>Why Choose Us</p>
              <h2 className="font-black text-4xl lg:text-5xl uppercase leading-tight" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Our Passion<br />Is Your Success
              </h2>
            </div>
            <p className="text-base leading-relaxed" style={{ color: C.gray }}>
              We're a family-owned shop in Silicon Valley that has been serving engineers, startups, and defense contractors for over two decades. When you work with Phamtec, you get direct access to the people doing the work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map(item => (
              <div
                key={item.title}
                className="p-6 rounded-lg border transition-colors duration-200 group"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: C.bg }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.lime}44`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 border transition-colors duration-200" style={{ background: `${C.lime}18`, borderColor: `${C.lime}33`, color: C.lime }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-base uppercase tracking-wide mb-3" style={{ fontFamily: "'Barlow', sans-serif" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.gray }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-24 px-6" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.lime }}>Who We Serve</p>
            <h2 className="font-black text-4xl lg:text-5xl uppercase leading-tight" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Industries We<br />Support
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map(ind => (
              <div
                key={ind.name}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border transition-all duration-200 cursor-default"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: C.navyDark }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.lime}44`; e.currentTarget.style.background = C.navy; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = C.navyDark; }}
              >
                <span className="text-3xl">{ind.icon}</span>
                <span className="text-xs text-center font-medium leading-tight" style={{ color: C.gray }}>{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / PROCESS ── */}
      <section id="about" className="py-24 px-6" style={{ background: C.navyDark }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-lg overflow-hidden aspect-[4/3]" style={{ background: C.bg }}>
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop&auto=format"
              alt="Phamtec welder at work"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded px-4 py-2 border border-white/10">
                <span className="w-2 h-2 rounded-full" style={{ background: C.lime }} />
                <span className="text-xs text-white font-medium">Based in Milpitas, CA</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.lime }}>Our Story</p>
            <h2 className="font-black text-4xl lg:text-5xl uppercase leading-tight mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Built on Precision,<br />Driven by Purpose
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: C.gray }}>
              Phamtec was founded with a single conviction: that small and mid-size manufacturers deserve the same quality and responsiveness that enterprise suppliers receive. For over 20 years, we've been the trusted fabrication partner for companies across Silicon Valley and beyond.
            </p>
            <p className="leading-relaxed mb-10" style={{ color: C.gray }}>
              Our shop in Milpitas houses CNC machining centers, welding equipment, and laser engraving systems — managed by a team that takes pride in every part that leaves our floor.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { step: '01', label: 'Send us your drawings or specs' },
                { step: '02', label: 'Receive a detailed quote within 24–48 hours' },
                { step: '03', label: 'We fabricate, inspect, and deliver' },
              ].map(item => (
                <div key={item.step} className="flex items-center gap-5">
                  <span className="flex-shrink-0 font-black text-2xl" style={{ color: `${C.lime}66`, fontFamily: "'Barlow', sans-serif" }}>{item.step}</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <span className="text-sm font-medium text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-20 px-6" style={{ background: C.navy }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-4xl lg:text-5xl uppercase leading-tight text-white mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
            Ready to Start Your Project?
          </h2>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: C.gray }}>
            Send us your drawings and we'll get back to you with a detailed quote within 24–48 hours. No automated portals — just our team reviewing your parts.
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 font-bold text-base rounded transition-colors duration-150"
            style={{ background: C.lime, color: C.navyDark }}
            onMouseEnter={e => (e.currentTarget.style.background = C.limeHover)}
            onMouseLeave={e => (e.currentTarget.style.background = C.lime)}
          >
            Contact Our Team
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.lime }}>Get in Touch</p>
            <h2 className="font-black text-4xl lg:text-5xl uppercase leading-tight mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Let's Talk<br />About Your Parts
            </h2>
            <p className="leading-relaxed mb-10 max-w-md" style={{ color: C.gray }}>
              Whether you have detailed drawings or just an idea, reach out and our team will help you find the right fabrication solution. All messages go directly to cs@phamtecinc.com.
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
                  label: 'Address',
                  value: '1019 Pecten Ct., Milpitas, CA 95035',
                  href: undefined,
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
                  label: 'Email',
                  value: 'cs@phamtecinc.com',
                  href: 'mailto:cs@phamtecinc.com',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
                  label: 'Phone',
                  value: '+1 (408) 210-4606',
                  href: 'tel:+14082104606',
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border" style={{ background: `${C.lime}18`, borderColor: `${C.lime}33`, color: C.lime }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{item.icon}</svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: C.lime }}>{item.value}</a>
                    ) : (
                      <div className="text-sm" style={{ color: C.gray }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-8 border border-white/10" style={{ background: C.navyDark }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border" style={{ background: `${C.lime}22`, borderColor: `${C.lime}44` }}>
                  <svg className="w-8 h-8" fill="none" stroke={C.lime} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-black text-2xl uppercase mb-3" style={{ fontFamily: "'Barlow', sans-serif" }}>Opening Your Email</h3>
                <p className="text-sm" style={{ color: C.gray }}>Your default mail app should open addressed to cs@phamtecinc.com. We'll respond within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-black text-xl uppercase mb-1" style={{ fontFamily: "'Barlow', sans-serif" }}>Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.gray }}>Name *</label>
                    <input
                      required type="text"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full border rounded px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                      style={{ background: C.bg, borderColor: 'rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = `${C.lime}66`)}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.gray }}>Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                      className="w-full border rounded px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                      style={{ background: C.bg, borderColor: 'rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = `${C.lime}66`)}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.gray }}>Email *</label>
                    <input
                      required type="email"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full border rounded px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                      style={{ background: C.bg, borderColor: 'rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = `${C.lime}66`)}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.gray }}>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full border rounded px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                      style={{ background: C.bg, borderColor: 'rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = `${C.lime}66`)}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                      placeholder="+1 (408) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.gray }}>Service Needed</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                    className="w-full border rounded px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none"
                    style={{ background: C.bg, borderColor: 'rgba(255,255,255,0.1)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = `${C.lime}66`)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: C.gray }}>Message *</label>
                  <textarea
                    required rows={4}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full border rounded px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                    style={{ background: C.bg, borderColor: 'rgba(255,255,255,0.1)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = `${C.lime}66`)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    placeholder="Describe your project, material, quantity, and timeline…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 font-semibold rounded text-sm transition-colors duration-150"
                  style={{ background: C.lime, color: C.navyDark }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.limeHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.lime)}
                >
                  Send Message → cs@phamtecinc.com
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-16 px-6" style={{ background: C.navyDark }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: C.lime }}>
                <span className="font-black text-sm" style={{ color: C.navyDark, fontFamily: "'Barlow', sans-serif" }}>P</span>
              </div>
              <span className="font-black text-xl tracking-tight text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>PHAMTEC</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: C.gray }}>
              Precision fabrication out of Milpitas, CA. CNC machining, welding, laser engraving, and more.
            </p>
            <p className="text-xs" style={{ color: `${C.gray}88` }}>Our passion is your success.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.gray }}>Services</h4>
            <ul className="flex flex-col gap-2">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <a href="#services" className="text-sm transition-colors hover:text-white" style={{ color: `${C.gray}88` }}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.gray }}>Company</h4>
            <ul className="flex flex-col gap-2">
              {['About Us', 'Industries', 'Contact', 'Request a Quote'].map(l => (
                <li key={l}>
                  <a href="#contact" className="text-sm transition-colors hover:text-white" style={{ color: `${C.gray}88` }}>{l}</a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: C.gray }}>Contact</h4>
              <p className="text-sm" style={{ color: `${C.gray}88` }}>1019 Pecten Ct.<br />Milpitas, CA 95035</p>
              <a href="mailto:cs@phamtecinc.com" className="text-sm mt-2 block transition-colors hover:text-white" style={{ color: C.lime }}>
                cs@phamtecinc.com
              </a>
              <a href="tel:+14082104606" className="text-sm mt-1 block transition-colors hover:text-white" style={{ color: `${C.gray}88` }}>
                +1 (408) 210-4606
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color: `${C.gray}55` }}>© 2026 Phamtec, Inc. All Rights Reserved.</p>
          <p className="text-xs" style={{ color: `${C.gray}55` }}>Milpitas, CA · United States & Kuwait</p>
        </div>
      </footer>
    </div>
  );
}
