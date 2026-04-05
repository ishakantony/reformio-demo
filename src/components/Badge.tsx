const styles: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  expired: "bg-red-50 text-red-700 border-red-200",
  trial: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  attended: "bg-green-50 text-green-700 border-green-200",
  open: "bg-green-50 text-green-700 border-green-200",
  full: "bg-red-50 text-red-600 border-red-200",
};

export default function Badge({ label }: { label: string }) {
  const cls = styles[label] ?? "bg-cream text-muted border-divider";
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${cls}`}
    >
      {label}
    </span>
  );
}
