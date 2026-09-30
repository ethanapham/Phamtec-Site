import { useState, useEffect, useRef } from 'react';
import logoSrc from './assets/phamtec-logo.png';

const C = {
  cream: '#F8F4EE',
  creamCard: '#F1EAE0',
  creamDeep: '#E8DFCF',
  ink: '#201C15',
  inkMid: '#7B7066',
  inkLight: '#A89E92',
  green: '#4D6940',
  greenHover: '#3C5430',
  border: 'rgba(32, 28, 21, 0.09)',
};

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Phamtec', href: '#why' },
  { label: 'Industries', href: '#industries' },
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
    label: 'Extrusion Cutting',
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

const WHY_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Tight-Tolerance Expertise',
    desc: 'We hold ±0.001" across CNC and fixture work. Our machinists are hands-on from setup to final inspection.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Fast Turnaround',
    desc: 'From quote to delivery, we move fast. Rush projects are our specialty — without cutting corners on quality.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: 'One-Stop Fabrication',
    desc: 'CNC, welding, laser engraving, extrusion, and sheet metal under one roof. Fewer vendors, cleaner project flow.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
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

// Full-bleed image section component
function FullBleedImage({ src, alt, children }: { src: string; alt: string; children?: React.ReactNode }) {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'rgba(32,28,21,0.38)' }} />
      {children && (
        <div className="relative z-10 h-full flex items-end max-w-7xl mx-auto px-6 pb-12">
          {children}
        </div>
      )}
    </section>
  );
}

// About page rendered in a new tab
function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: C.cream, fontFamily: "'DM Sans', sans-serif", color: C.ink }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <img src={logoSrc} alt="Phamtec" className="h-12 mb-16" style={{ objectFit: 'contain', objectPosition: 'left', mixBlendMode: 'multiply' }} />

        <p className="text-xs font-medium uppercase mb-4" style={{ color: C.green, letterSpacing: '0.14em' }}>Our Story</p>
        <h1 className="font-semibold leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.025em', color: C.ink }}>
          Built on Precision,<br />Driven by Purpose
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.inkMid }}>
              Phamtec was founded with a single conviction: that small and mid-size manufacturers deserve the same quality and responsiveness that enterprise suppliers receive. For over 20 years, we've been the trusted fabrication partner for companies across Silicon Valley and beyond.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: C.inkMid }}>
              Our shop in Milpitas houses CNC machining centers, welding equipment, and laser engraving systems — managed by a team that takes pride in every part that leaves our floor.
            </p>
          </div>
          <div className="rounded-sm overflow-hidden aspect-[4/3]" style={{ background: C.creamCard }}>
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop&auto=format"
              alt="Phamtec shop"
              className="w-full h-full object-cover"
              style={{ opacity: 0.88 }}
            />
          </div>
        </div>

        <div className="border-t pt-12" style={{ borderColor: C.border }}>
          <p className="text-xs font-medium uppercase mb-6" style={{ color: C.green, letterSpacing: '0.14em' }}>How We Work</p>
          <div className="flex flex-col gap-5 max-w-lg">
            {[
              { step: '01', label: 'Send us your drawings or specs' },
              { step: '02', label: 'Receive a detailed quote within 24–48 hours' },
              { step: '03', label: 'We fabricate, inspect, and deliver' },
            ].map(item => (
              <div key={item.step} className="flex items-center gap-5">
                <span className="flex-shrink-0 font-medium text-sm tabular-nums" style={{ color: C.inkLight }}>{item.step}</span>
                <div className="flex-1 h-px" style={{ background: C.border }} />
                <span className="text-sm" style={{ color: C.ink }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-16 pt-10 flex flex-col gap-4" style={{ borderColor: C.border }}>
          <p className="text-xs font-medium uppercase" style={{ color: C.inkLight, letterSpacing: '0.12em' }}>Get in Touch</p>
          <p className="text-sm" style={{ color: C.inkMid }}>1011 Pecten Ct., Milpitas, CA 95035</p>
          <a href="mailto:cs@phamtecinc.com" className="text-sm" style={{ color: C.green }}>cs@phamtecinc.com</a>
          <a href="tel:+14082104606" className="text-sm" style={{ color: C.inkMid }}>+1 (408) 210-4606</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Render About page if ?page=about
  const isAboutPage = new URLSearchParams(window.location.search).get('page') === 'about';
  if (isAboutPage) return <AboutPage />;

  return <MainPage />;
}

function MainPage() {
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
  const inputStyle = { background: C.cream, borderColor: C.border, color: C.ink };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.cream, fontFamily: "'DM Sans', sans-serif", color: C.ink }}>

      {/* NAV — logo left, all links right */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(248,244,238,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        }}
      >
        <div className="px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="mt-2">
            <img src={logoSrc} alt="Phamtec" className="h-16" style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </a>

          {/* Desktop nav — all right-aligned */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-sm transition-colors duration-150" style={{ color: C.inkMid }}
                onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                onMouseLeave={e => (e.currentTarget.style.color = C.inkMid)}
              >{l.label}</a>
            ))}
            <a
              href="?page=about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-150"
              style={{ color: C.inkMid }}
              onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
              onMouseLeave={e => (e.currentTarget.style.color = C.inkMid)}
            >About</a>
            <a
              href="#contact"
              className="text-sm transition-colors duration-150"
              style={{ color: C.inkMid }}
              onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
              onMouseLeave={e => (e.currentTarget.style.color = C.inkMid)}
            >Contact Us</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col gap-1.5">
            <div className={`w-5 h-px transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} style={{ background: C.ink }} />
            <div className={`w-5 h-px transition-all ${menuOpen ? 'opacity-0' : ''}`} style={{ background: C.ink }} />
            <div className={`w-5 h-px transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} style={{ background: C.ink }} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-6 py-5 flex flex-col gap-5" style={{ background: C.cream, borderColor: C.border }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: C.inkMid }}>{l.label}</a>
            ))}
            <a href="?page=about" target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: C.inkMid }}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: C.inkMid }}>Contact Us</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=1600&h=900&fit=crop&auto=format')" }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(248,244,238,0.97) 38%, rgba(248,244,238,0.80) 62%, rgba(248,244,238,0.28) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(248,244,238,0.88) 0%, transparent 35%)' }} />

        <div className="relative z-10 px-6 pt-28 pb-20">
          <h1 className="font-semibold leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.025em', color: C.ink }}>
            Machining<br />
            <span style={{ color: C.green }}>for Your</span><br />
            Needs
          </h1>

          <p className="text-base leading-relaxed max-w-md mb-10" style={{ color: C.inkMid }}>
            Experienced &amp; Reliable CNC Machining, Laser Engraving, Tube Welding, and more from our small team in Silicon Valley.
          </p>

          <a
            href="#contact"
            className="inline-block px-7 py-3 font-medium rounded-sm text-sm transition-colors duration-150"
            style={{ background: C.green, color: C.cream }}
            onMouseEnter={e => (e.currentTarget.style.background = C.greenHover)}
            onMouseLeave={e => (e.currentTarget.style.background = C.green)}
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase mb-3" style={{ color: C.green, letterSpacing: '0.14em' }}>What We Do</p>
            <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', color: C.ink }}>
              Full-Spectrum<br />Fabrication Services
            </h2>
          </div>

          <div className="flex flex-wrap border-b mb-10" style={{ borderColor: C.border }}>
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveService(i)}
                className="px-5 py-3 text-sm transition-all duration-150 -mb-px"
                style={{
                  borderBottom: `1.5px solid ${i === activeService ? C.green : 'transparent'}`,
                  color: i === activeService ? C.ink : C.inkMid,
                  fontWeight: i === activeService ? '500' : '400',
                  background: 'transparent',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.015em', color: C.ink }}>
                {service.headline}
              </h3>
              <p className="leading-relaxed mb-8 text-sm" style={{ color: C.inkMid }}>{service.description}</p>
              <ul className="space-y-3 mb-10">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: C.ink }}>
                    <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center border" style={{ background: 'rgba(77,105,64,0.08)', borderColor: 'rgba(77,105,64,0.25)' }}>
                      <svg className="w-2 h-2" viewBox="0 0 10 10" fill="none" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8.5 2.5L4 7.5l-2-2" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-block px-6 py-2.5 font-medium rounded-sm text-sm transition-colors duration-150"
                style={{ background: C.green, color: C.cream }}
                onMouseEnter={e => (e.currentTarget.style.background = C.greenHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.green)}
              >
                Get a Quote
              </a>
            </div>

            <div className="relative rounded-sm overflow-hidden aspect-[4/3]" style={{ background: C.creamCard }}>
              <img key={service.id} src={service.image} alt={service.label} className="w-full h-full object-cover" style={{ opacity: 0.88 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(248,244,238,0.25) 0%, transparent 50%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* FULL-BLEED IMAGE — between services and why */}
      <FullBleedImage
        src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&h=900&fit=crop&auto=format"
        alt="CNC machining precision work"
      >
        <p className="text-white/90 text-sm font-medium tracking-wide uppercase" style={{ letterSpacing: '0.14em' }}>
          Precision at every step
        </p>
      </FullBleedImage>

      {/* WHY PHAMTEC */}
      <section id="why" className="py-24 px-6" style={{ background: C.creamCard }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <p className="text-xs font-medium uppercase mb-3" style={{ color: C.green, letterSpacing: '0.14em' }}>Why Choose Us</p>
              <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', color: C.ink }}>
                Our Passion<br />Is Your Success
              </h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.inkMid }}>
              We're a family-owned shop in Silicon Valley that has been serving engineers, startups, and defense contractors for over two decades. When you work with Phamtec, you get direct access to the people doing the work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_ITEMS.map(item => (
              <div
                key={item.title}
                className="p-6 rounded-sm border transition-all duration-200"
                style={{ borderColor: C.border, background: C.cream }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(77,105,64,0.28)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >
                <div className="w-9 h-9 rounded-sm flex items-center justify-center mb-5 border" style={{ background: 'rgba(77,105,64,0.07)', borderColor: 'rgba(77,105,64,0.18)', color: C.green }}>
                  {item.icon}
                </div>
                <h3 className="font-medium text-sm mb-2.5 leading-snug" style={{ color: C.ink }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: C.inkMid }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED IMAGE — between why and industries */}
      <FullBleedImage
        src="https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=1600&h=900&fit=crop&auto=format"
        alt="Manufacturing facility"
      >
        <p className="text-white/90 text-sm font-medium tracking-wide uppercase" style={{ letterSpacing: '0.14em' }}>
          Built in Silicon Valley
        </p>
      </FullBleedImage>

      {/* INDUSTRIES */}
      <section id="industries" className="py-24 px-6" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase mb-3" style={{ color: C.inkMid, letterSpacing: '0.14em' }}>Who We Serve</p>
            <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', color: C.ink }}>
              Industries We<br />Support
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INDUSTRIES.map(ind => (
              <div
                key={ind.name}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-sm border transition-all duration-200 cursor-default"
                style={{ borderColor: C.border, background: C.creamCard }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(77,105,64,0.28)'; (e.currentTarget as HTMLElement).style.background = C.creamDeep; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.creamCard; }}
              >
                <span className="text-2xl" style={{ opacity: 0.65 }}>{ind.icon}</span>
                <span className="text-xs text-center font-medium leading-tight" style={{ color: C.inkMid }}>{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20 px-6" style={{ background: C.green }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-semibold leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.02em', color: C.cream }}>
            Ready to Start Your Project?
          </h2>
          <p className="text-sm mb-10 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(248,244,238,0.68)' }}>
            Send us your drawings and we'll get back to you with a detailed quote within 24–48 hours. No automated portals — just our team reviewing your parts.
          </p>
          <a
            href="#contact"
            className="inline-block px-9 py-3.5 font-medium text-sm rounded-sm transition-colors duration-150"
            style={{ background: C.cream, color: C.green }}
            onMouseEnter={e => (e.currentTarget.style.background = C.creamDeep)}
            onMouseLeave={e => (e.currentTarget.style.background = C.cream)}
          >
            Contact Our Team
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-medium uppercase mb-3" style={{ color: C.green, letterSpacing: '0.14em' }}>Get in Touch</p>
            <h2 className="font-semibold leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', color: C.ink }}>
              Let's Talk<br />About Your Parts
            </h2>
            <p className="text-sm leading-relaxed mb-10 max-w-sm" style={{ color: C.inkMid }}>
              Whether you have detailed drawings or just an idea, reach out and our team will help you find the right fabrication solution. All messages go directly to cs@phamtecinc.com.
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
                  label: 'Address', value: '1011 Pecten Ct., Milpitas, CA 95035', href: undefined,
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
                  label: 'Email', value: 'cs@phamtecinc.com', href: 'mailto:cs@phamtecinc.com',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
                  label: 'Phone', value: '+1 (408) 210-4606', href: 'tel:+14082104606',
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 border" style={{ background: 'rgba(77,105,64,0.07)', borderColor: 'rgba(77,105,64,0.18)', color: C.green }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">{item.icon}</svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5 uppercase" style={{ color: C.inkLight, letterSpacing: '0.08em' }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm transition-colors" style={{ color: C.green }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.greenHover)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.green)}
                      >{item.value}</a>
                    ) : (
                      <div className="text-sm" style={{ color: C.ink }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm p-8 border" style={{ background: C.creamCard, borderColor: C.border }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 border" style={{ background: 'rgba(77,105,64,0.08)', borderColor: 'rgba(77,105,64,0.25)' }}>
                  <svg className="w-6 h-6" fill="none" stroke={C.green} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: C.ink }}>Opening Your Email</h3>
                <p className="text-sm" style={{ color: C.inkMid }}>Your default mail app should open addressed to cs@phamtecinc.com. We'll respond within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-semibold text-base mb-1" style={{ color: C.ink }}>Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase mb-1.5" style={{ color: C.inkLight, letterSpacing: '0.1em' }}>Name *</label>
                    <input required type="text" value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(77,105,64,0.45)')}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-1.5" style={{ color: C.inkLight, letterSpacing: '0.1em' }}>Company</label>
                    <input type="text" value={formData.company}
                      onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                      className="w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(77,105,64,0.45)')}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase mb-1.5" style={{ color: C.inkLight, letterSpacing: '0.1em' }}>Email *</label>
                    <input required type="email" value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(77,105,64,0.45)')}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase mb-1.5" style={{ color: C.inkLight, letterSpacing: '0.1em' }}>Phone</label>
                    <input type="tel" value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none transition-colors"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(77,105,64,0.45)')}
                      onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                      placeholder="+1 (408) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase mb-1.5" style={{ color: C.inkLight, letterSpacing: '0.1em' }}>Service Needed</label>
                  <select value={formData.service}
                    onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                    className="w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none transition-colors appearance-none"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(77,105,64,0.45)')}
                    onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase mb-1.5" style={{ color: C.inkLight, letterSpacing: '0.1em' }}>Message *</label>
                  <textarea required rows={4} value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(77,105,64,0.45)')}
                    onBlur={e => (e.currentTarget.style.borderColor = C.border)}
                    placeholder="Describe your project, material, quantity, and timeline…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 font-medium rounded-sm text-sm transition-colors duration-150"
                  style={{ background: C.green, color: C.cream }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.greenHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.green)}
                >
                  Send Message → cs@phamtecinc.com
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-16 px-6" style={{ background: C.creamCard, borderColor: C.border }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img src={logoSrc} alt="Phamtec" className="h-9 mb-5" style={{ objectFit: 'contain', objectPosition: 'left', mixBlendMode: 'multiply' }} />
            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: C.inkMid }}>
              Precision fabrication out of Milpitas, CA. CNC machining, welding, laser engraving, and more.
            </p>
            <p className="text-xs" style={{ color: C.inkLight }}>Our passion is your success.</p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase mb-4" style={{ color: C.inkLight, letterSpacing: '0.12em' }}>Services</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <a href="#services" className="text-sm transition-colors" style={{ color: C.inkMid }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.inkMid)}
                  >{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase mb-4" style={{ color: C.inkLight, letterSpacing: '0.12em' }}>Company</h4>
            <ul className="flex flex-col gap-2.5 mb-8">
              {['Industries', 'Contact', 'Request a Quote'].map(l => (
                <li key={l}>
                  <a href="#contact" className="text-sm transition-colors" style={{ color: C.inkMid }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.inkMid)}
                  >{l}</a>
                </li>
              ))}
              <li>
                <a href="?page=about" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: C.inkMid }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.inkMid)}
                >About Us</a>
              </li>
            </ul>
            <h4 className="text-xs font-medium uppercase mb-3" style={{ color: C.inkLight, letterSpacing: '0.12em' }}>Contact</h4>
            <p className="text-sm leading-relaxed" style={{ color: C.inkMid }}>1011 Pecten Ct.<br />Milpitas, CA 95035</p>
            <a href="mailto:cs@phamtecinc.com" className="text-sm mt-2 block transition-colors" style={{ color: C.green }}
              onMouseEnter={e => (e.currentTarget.style.color = C.greenHover)}
              onMouseLeave={e => (e.currentTarget.style.color = C.green)}
            >cs@phamtecinc.com</a>
            <a href="tel:+14082104606" className="text-sm mt-1 block transition-colors" style={{ color: C.inkMid }}
              onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
              onMouseLeave={e => (e.currentTarget.style.color = C.inkMid)}
            >+1 (408) 210-4606</a>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: C.border }}>
          <p className="text-xs" style={{ color: C.inkLight }}>© 2026 Phamtec, Inc. All Rights Reserved.</p>
          <p className="text-xs" style={{ color: C.inkLight }}>Milpitas, CA · United States & Kuwait</p>
        </div>
      </footer>
    </div>
  );
}
