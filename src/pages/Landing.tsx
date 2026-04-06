import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Flame, CalendarCheck, Smartphone, Bell, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { getUser } from "../auth";

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Navbar() {
  const user = getUser();
  const authed = !!user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-divider/50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="font-serif text-2xl font-semibold tracking-tight text-charcoal">
          Reformio
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <a href="#classes" className="hover:text-charcoal transition-colors duration-300">Classes</a>
          <a href="#booking" className="hover:text-charcoal transition-colors duration-300">Book Online</a>
          <a href="#about" className="hover:text-charcoal transition-colors duration-300">About</a>
        </div>
        <div className="flex items-center gap-4">
          {authed ? (
            <Link
              to={user?.role === "admin" ? "/manage/dashboard" : "/dashboard"}
              className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-charcoal shadow-sm hover:bg-rose-dark hover:shadow-md transition-all duration-300"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-block text-sm font-medium text-warm-brown hover:text-warm-brown-dark transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-charcoal shadow-sm hover:bg-rose-dark hover:shadow-md transition-all duration-300"
              >
                Book a Class
              </Link>
            </>
          )}
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
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-cream shadow-lg hover:shadow-xl hover:bg-warm-brown-dark transition-all duration-500 group"
                >
                  Browse Classes
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={18} />
                  </span>
                </Link>
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
        { icon: <Clock size={16} strokeWidth={1.5} />, text: "50 min" },
        { icon: <Users size={16} strokeWidth={1.5} />, text: "Max 8 per class" },
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
        { icon: <Clock size={16} strokeWidth={1.5} />, text: "45 min" },
        { icon: <Flame size={16} strokeWidth={1.5} />, text: "Heated studio" },
        { icon: <Users size={16} strokeWidth={1.5} />, text: "Max 12 per class" },
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
      icon: <CalendarCheck size={28} strokeWidth={1.5} />,
      title: "Book in Seconds",
      description:
        "Browse the schedule, pick a class, and reserve your spot — no calls, no waiting.",
    },
    {
      icon: <Smartphone size={28} strokeWidth={1.5} />,
      title: "Manage on Any Device",
      description:
        "View your upcoming bookings, cancel if plans change, and track your attendance history.",
    },
    {
      icon: <Bell size={28} strokeWidth={1.5} />,
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
                <div className="bg-charcoal px-6 py-4 flex items-center justify-between">
                  <span className="font-serif text-lg font-semibold text-cream">Reformio</span>
                  <span className="text-xs text-cream/50">Browse Classes</span>
                </div>
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
              <div className="absolute -bottom-5 -right-4 lg:-right-6 bg-white rounded-xl shadow-xl px-5 py-3 border border-divider/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={16} strokeWidth={2.5} className="text-green-600" />
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
            <Link
              to="/login"
              className="inline-flex items-center gap-2.5 rounded-full bg-rose px-8 py-4 text-base font-medium text-charcoal shadow-lg hover:bg-rose-light hover:shadow-xl transition-all duration-500 group"
            >
              Book a Class
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </Link>
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
        <Link to="/" className="font-serif text-xl font-semibold text-cream/80">
          Reformio
        </Link>
        <p className="text-sm text-cream/30">
          &copy; {new Date().getFullYear()} Reformio Pilates Studio
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Landing() {
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
