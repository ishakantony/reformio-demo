import { useEffect, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal                                                      */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className = "",
  scale = false,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  scale?: boolean;
  stagger?: boolean;
}) {
  const ref = useReveal();
  const base = stagger ? "stagger-children" : scale ? "reveal-scale" : "reveal";
  return (
    <div ref={ref} className={`${base} ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-divider/50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-10">
        <a href="/" className="font-serif text-2xl font-semibold tracking-tight text-charcoal">
          Reformio
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <a href="#classes" className="hover:text-charcoal transition-colors duration-300">Classes</a>
          <a href="#booking" className="hover:text-charcoal transition-colors duration-300">Book Online</a>
          <a href="#about" className="hover:text-charcoal transition-colors duration-300">About</a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden sm:inline-block text-sm font-medium text-warm-brown hover:text-warm-brown-dark transition-colors duration-300"
          >
            Sign In
          </a>
          <a
            href="/browse"
            className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-charcoal shadow-sm hover:bg-rose-dark hover:shadow-md transition-all duration-300"
          >
            Book a Class
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-warm-brown mb-6">
                Pilates Studio
              </span>
            </Reveal>
            <Reveal className="[animation-delay:100ms]">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-charcoal mb-6">
                Cultivate
                <br />
                Alignment in
                <br />
                <span className="italic text-warm-brown">Every</span> Movement
              </h1>
            </Reveal>
            <Reveal className="[animation-delay:200ms]">
              <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
                Reformer &amp; Hot Mat classes in a space designed for focus,
                strength, and intentional movement. Book your spot online.
              </p>
            </Reveal>
            <Reveal className="[animation-delay:300ms]">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/browse"
                  className="inline-flex items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-cream shadow-lg hover:shadow-xl hover:bg-warm-brown-dark transition-all duration-500 group"
                >
                  Browse Classes
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </a>
                <a
                  href="#classes"
                  className="text-sm font-medium text-warm-brown hover:text-warm-brown-dark transition-colors duration-300"
                >
                  See what we offer
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal scale className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-cream-dark">
              <img
                src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=960&q=80&auto=format"
                alt="Pilates reformer equipment in a warm, sunlit studio"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-warm-brown/10 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-white rounded-xl shadow-xl px-5 py-4 border border-divider/40">
              <p className="text-xs text-muted font-medium mb-1">This Week</p>
              <p className="font-serif text-3xl font-semibold text-charcoal">24</p>
              <p className="text-xs text-warm-brown font-medium mt-0.5">classes available</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Classes() {
  const classes = [
    {
      name: "Reformer",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=720&q=80&auto=format",
      description:
        "Build strength, flexibility, and control on the Pilates reformer. Guided resistance training that sculpts and lengthens — suitable for every level.",
      details: [
        { icon: <ClockIcon />, text: "50 min" },
        { icon: <UsersIcon />, text: "Max 8 per class" },
      ],
      tags: ["All Levels", "Strength", "Flexibility"],
    },
    {
      name: "Hot Mat",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=720&q=80&auto=format",
      description:
        "Mat Pilates in a heated room. The warmth deepens every stretch and intensifies the burn — a full-body challenge that leaves you feeling renewed.",
      details: [
        { icon: <ClockIcon />, text: "45 min" },
        { icon: <FlameIcon />, text: "Heated studio" },
        { icon: <UsersIcon />, text: "Max 12 per class" },
      ],
      tags: ["Intermediate", "Core", "Endurance"],
    },
  ];

  return (
    <section id="classes" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-warm-brown mb-4">
              Our Classes
            </span>
          </Reveal>
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight tracking-tight text-charcoal mb-5">
              Designed for Depth
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-muted text-lg leading-relaxed">
              Two signature formats, each crafted to challenge your body and
              sharpen your mind.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {classes.map((cls, i) => (
            <Reveal key={i} scale>
              <div className="group rounded-2xl overflow-hidden bg-cream border border-divider/40 hover:shadow-xl transition-shadow duration-500">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={cls.image}
                    alt={cls.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-7 lg:p-8">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal mb-3">
                    {cls.name}
                  </h3>
                  <p className="text-muted leading-relaxed mb-5">
                    {cls.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-5">
                    {cls.details.map((d, j) => (
                      <span key={j} className="inline-flex items-center gap-1.5">
                        {d.icon}
                        {d.text}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cls.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-white border border-divider/60 px-3 py-1 text-xs font-medium text-warm-brown"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const features = [
    {
      icon: <CalendarCheckIcon />,
      title: "Book in Seconds",
      description:
        "Browse the schedule, pick a class, and reserve your spot — no calls, no waiting.",
    },
    {
      icon: <SmartphoneIcon />,
      title: "Manage on Any Device",
      description:
        "View your upcoming bookings, cancel if plans change, and track your attendance history.",
    },
    {
      icon: <BellIcon />,
      title: "Never Miss a Spot",
      description:
        "See real-time availability so you always know which classes still have room.",
    },
  ];

  return (
    <section id="booking" className="py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <Reveal>
              <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-warm-brown mb-4">
                Book Online
              </span>
            </Reveal>
            <Reveal>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight tracking-tight text-charcoal mb-5">
                Your Schedule,
                <br />
                Your Control
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-muted text-lg leading-relaxed mb-10">
                Sign in to your Reformio account and book classes whenever it
                suits you — day or night, from anywhere.
              </p>
            </Reveal>

            <Reveal stagger>
              <div className="space-y-8">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-white text-warm-brown border border-divider/60">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-charcoal mb-1">
                        {f.title}
                      </h3>
                      <p className="text-muted text-[15px] leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Booking preview mockup */}
          <Reveal scale>
            <div className="relative">
              <div className="rounded-2xl bg-white border border-divider/40 shadow-xl overflow-hidden">
                {/* Mock app header */}
                <div className="bg-charcoal px-6 py-4 flex items-center justify-between">
                  <span className="font-serif text-lg font-semibold text-cream">Reformio</span>
                  <span className="text-xs text-cream/50">Browse Classes</span>
                </div>
                {/* Mock class cards */}
                <div className="p-5 space-y-3">
                  {[
                    { name: "Reformer", time: "Mon 9:00 AM", spots: "3 spots left", trainer: "Sarah K." },
                    { name: "Hot Mat", time: "Mon 11:30 AM", spots: "6 spots left", trainer: "James L." },
                    { name: "Reformer", time: "Mon 5:00 PM", spots: "1 spot left", trainer: "Sarah K." },
                    { name: "Hot Mat", time: "Tue 8:00 AM", spots: "8 spots left", trainer: "Mira D." },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-divider/50 px-4 py-3 hover:border-rose/40 transition-colors duration-300"
                    >
                      <div>
                        <p className="font-medium text-charcoal text-sm">{c.name}</p>
                        <p className="text-xs text-muted">
                          {c.time} &middot; {c.trainer}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-warm-brown font-medium">{c.spots}</span>
                        <div className="mt-1">
                          <span className="inline-block rounded-full bg-rose/20 text-rose-dark px-3 py-0.5 text-[11px] font-medium">
                            Book
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating confirmation toast */}
              <div className="absolute -bottom-5 -right-4 lg:-right-6 bg-white rounded-xl shadow-xl px-5 py-3 border border-divider/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Booked!</p>
                    <p className="text-[11px] text-muted">Reformer &middot; Mon 9 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <Reveal>
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-warm-brown mb-4">
            Our Studio
          </span>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight tracking-tight text-charcoal mb-6">
            A Space for
            <br />
            <span className="italic text-warm-brown">Intentional</span> Practice
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Reformio is a boutique Pilates studio focused on small classes,
            expert instruction, and a warm environment where every movement
            matters. Whether you're on the reformer or on the mat, our
            trainers guide you with precision and care.
          </p>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { value: "8", label: "Max class size" },
              { value: "5+", label: "Expert trainers" },
              { value: "2", label: "Class formats" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-serif text-4xl font-semibold text-warm-brown">
                  {stat.value}
                </p>
                <p className="text-xs text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-cream mb-6">
            Ready to find your
            <br />
            <span className="italic text-rose">center</span>?
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-lg text-cream/60 leading-relaxed mb-10 max-w-md mx-auto">
            Browse our schedule and book your first class today. Your body will
            thank you.
          </p>
        </Reveal>
        <Reveal>
          <div className="flex flex-col items-center gap-3">
            <a
              href="/browse"
              className="inline-flex items-center gap-2.5 rounded-full bg-rose px-8 py-4 text-base font-medium text-charcoal shadow-lg hover:bg-rose-light hover:shadow-xl transition-all duration-500 group"
            >
              Book a Class
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </a>
            <span className="text-sm text-cream/40">
              Sign in to view availability &amp; reserve your spot
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" className="font-serif text-xl font-semibold text-cream/80">
          Reformio
        </a>
        <p className="text-sm text-cream/30">
          &copy; {new Date().getFullYear()} Reformio Pilates Studio
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="grain">
      <Navbar />
      <main>
        <Hero />
        <Classes />
        <Booking />
        <About />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
