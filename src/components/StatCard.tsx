export default function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white border border-divider/60 p-5 flex items-start gap-4">
      <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-cream text-warm-brown">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-muted mb-1">{label}</p>
        <p className="font-serif text-2xl font-semibold text-charcoal leading-none">
          {value}
        </p>
        {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
      </div>
    </div>
  );
}
