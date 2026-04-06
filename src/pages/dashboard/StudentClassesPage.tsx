import { useState, useMemo } from "react";
import { Clock, User, Timer, Dumbbell, Flame, Tag } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import {
  getAllClasses,
  getClassTypeById,
  getTrainerById,
  trainers,
  classTypes,
  formatTime,
} from "../../data/mock";

const CLASS_TYPE_LABELS: Record<string, string> = {
  "ct-1": "Equipment",
  "ct-2": "Hot Mat",
};

export default function StudentClassesPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const defaultTo = new Date(today);
  defaultTo.setDate(today.getDate() + 6);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: defaultTo,
  });
  const [selectedClassTypes, setSelectedClassTypes] = useState<Set<string>>(
    () => new Set(classTypes.map((ct) => ct.id)),
  );
  const [selectedTrainers, setSelectedTrainers] = useState<Set<string>>(
    () => new Set(trainers.map((t) => t.id)),
  );

  const todayStr = today.toISOString().slice(0, 10);

  const allClasses = useMemo(() => getAllClasses(), []);

  const filteredClasses = useMemo(() => {
    return allClasses.filter((sc) => {
      // Date range filter
      if (dateRange?.from) {
        const classDate = new Date(sc.date + "T12:00:00");
        const from = new Date(dateRange.from);
        from.setHours(0, 0, 0, 0);
        if (classDate < from) return false;
        if (dateRange.to) {
          const to = new Date(dateRange.to);
          to.setHours(23, 59, 59, 999);
          if (classDate > to) return false;
        }
      }
      // Class type filter
      if (!selectedClassTypes.has(sc.classTypeId)) return false;
      // Trainer filter
      if (!selectedTrainers.has(sc.trainerId)) return false;
      return true;
    });
  }, [allClasses, dateRange, selectedClassTypes, selectedTrainers]);

  function toggleClassType(id: string) {
    setSelectedClassTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTrainer(id: string) {
    setSelectedTrainers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const defaultClassNames = getDefaultClassNames();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Classes
        </h1>
        <p className="text-muted">
          Browse upcoming classes and book a spot.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter panel */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <div className="rounded-xl bg-white border border-divider/60 p-5 space-y-6 lg:sticky lg:top-6">
            {/* Date range */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Date Range
              </h3>
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                style={
                  {
                    "--rdp-accent-color": "#8B6F4E",
                    "--rdp-accent-background-color": "rgba(139,111,78,0.1)",
                    "--rdp-range_start-date-background-color": "#8B6F4E",
                    "--rdp-range_end-date-background-color": "#8B6F4E",
                    "--rdp-range_start-color": "#FAF7F2",
                    "--rdp-range_end-color": "#FAF7F2",
                    "--rdp-range_middle-background-color": "rgba(139,111,78,0.1)",
                    "--rdp-range_middle-color": "#1A1A1A",
                    "--rdp-today-color": "#8B6F4E",
                    "--rdp-selected-border": "2px solid transparent",
                    "--rdp-day_button-border": "2px solid transparent",
                    "--rdp-day-height": "32px",
                    "--rdp-day-width": "32px",
                    "--rdp-day_button-height": "30px",
                    "--rdp-day_button-width": "30px",
                    "--rdp-day_button-border-radius": "8px",
                    fontSize: "13px",
                  } as React.CSSProperties
                }
                classNames={{
                  chevron: `${defaultClassNames.chevron} fill-warm-brown`,
                }}
              />
            </div>

            {/* Class type */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Class Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {classTypes.map((ct) => {
                  const active = selectedClassTypes.has(ct.id);
                  const label = CLASS_TYPE_LABELS[ct.id] ?? ct.name;
                  return (
                    <button
                      key={ct.id}
                      onClick={() => toggleClassType(ct.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        active
                          ? ct.id === "ct-1"
                            ? "bg-warm-brown text-cream border-warm-brown"
                            : "bg-rose text-white border-rose"
                          : "bg-white text-muted border-divider hover:border-charcoal/30"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instructor */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Instructor
              </h3>
              <div className="flex flex-wrap gap-2">
                {trainers.map((t) => {
                  const active = selectedTrainers.has(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTrainer(t.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        active
                          ? "bg-charcoal text-cream border-charcoal"
                          : "bg-white text-muted border-divider hover:border-charcoal/30"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Class list */}
        <section className="flex-1 min-w-0">
          {filteredClasses.length === 0 ? (
            <div className="rounded-xl bg-white border border-divider/60 px-6 py-12 text-center">
              <p className="text-muted text-sm">
                No classes match your filters.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredClasses.map((sc) => {
                const ct = getClassTypeById(sc.classTypeId);
                const trainer = getTrainerById(sc.trainerId);
                const isReformer = sc.classTypeId === "ct-1";
                const spotsLeft = (ct?.maxCapacity ?? 0) - sc.enrolledCount;
                const isFull = spotsLeft <= 0;
                const isToday = sc.date === todayStr;
                const typeLabel = CLASS_TYPE_LABELS[sc.classTypeId] ?? ct?.name;

                // Format date display
                const dateDisplay = isToday
                  ? `Today, ${formatTime(sc.startTime)}`
                  : `${new Date(sc.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}, ${formatTime(sc.startTime)}`;

                return (
                  <div
                    key={sc.id}
                    className="rounded-xl bg-white border border-divider/60 p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Top: name + class type badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-base font-semibold text-charcoal">
                        {ct?.name}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          isReformer
                            ? "bg-warm-brown/10 text-warm-brown"
                            : "bg-rose/15 text-rose-dark"
                        }`}
                      >
                        {isReformer ? (
                          <Dumbbell size={11} strokeWidth={2} />
                        ) : (
                          <Flame size={11} strokeWidth={2} />
                        )}
                        {typeLabel}
                      </span>
                    </div>

                    {/* Middle: metadata row */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} strokeWidth={1.5} />
                        {dateDisplay}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Timer size={13} strokeWidth={1.5} />
                        {ct?.duration} min
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <User size={13} strokeWidth={1.5} />
                        {trainer?.name}
                      </span>
                    </div>

                    {/* Tags */}
                    {sc.tags && sc.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        <Tag
                          size={11}
                          strokeWidth={1.5}
                          className="text-muted"
                        />
                        {sc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-cream text-[11px] font-medium text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom: spots + book */}
                    <div className="flex items-center justify-between pt-3 border-t border-divider/40">
                      <span
                        className={`text-xs font-medium ${
                          isFull
                            ? "text-red-500"
                            : spotsLeft <= 2
                              ? "text-amber-600"
                              : "text-muted"
                        }`}
                      >
                        {isFull
                          ? "Full"
                          : `${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} left`}
                      </span>
                      <button
                        disabled={isFull}
                        className={`rounded-lg px-5 py-2 text-xs font-semibold transition-colors ${
                          isFull
                            ? "bg-cream text-muted cursor-not-allowed"
                            : isReformer
                              ? "bg-warm-brown text-cream hover:bg-warm-brown-dark"
                              : "bg-rose text-white hover:bg-rose-dark"
                        }`}
                      >
                        {isFull ? "Full" : "Book"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
