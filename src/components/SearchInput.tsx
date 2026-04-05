import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search size={16} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-divider bg-white pl-9 pr-4 py-2 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-warm-brown/20 focus:border-warm-brown/40 transition-colors"
      />
    </div>
  );
}
