import { Clock, User } from "lucide-react";
import {
  getWeekDates,
  getClassesForDate,
  getClassTypeById,
  getTrainerById,
  getWeekDayLabel,
  formatTime,
} from "../../data/mock";

export default function StudentClassesPage() {
  const weekDates = getWeekDates();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Classes
        </h1>
        <p className="text-muted">
          Browse this week's schedule and book a spot.
        </p>
      </div>

      <div className="space-y-6">
        {weekDates.map((date) => {
          const classes = getClassesForDate(date);
          const isToday = date === today;
          const dayLabel = getWeekDayLabel(date);
          const dateLabel = new Date(date + "T12:00:00").toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" },
          );

          return (
            <div
              key={date}
              className="rounded-xl bg-white border border-divider/60 overflow-hidden"
            >
              {/* Day header */}
              <div
                className={`px-5 py-3.5 border-b border-divider/60 flex items-center gap-3 ${
                  isToday ? "bg-warm-brown/5" : "bg-cream/40"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    isToday ? "text-warm-brown" : "text-charcoal"
                  }`}
                >
                  {dayLabel} {dateLabel}
                </span>
                {isToday && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-warm-brown text-cream rounded-full px-2.5 py-0.5">
                    Today
                  </span>
                )}
                <span className="ml-auto text-xs text-muted">
                  {classes.length} {classes.length === 1 ? "class" : "classes"}
                </span>
              </div>

              {/* Class list */}
              {classes.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-muted">
                  No classes scheduled.
                </div>
              ) : (
                <div className="divide-y divide-divider/40">
                  {classes.map((sc) => {
                    const ct = getClassTypeById(sc.classTypeId);
                    const trainer = getTrainerById(sc.trainerId);
                    const isReformer = ct?.name === "Reformer";
                    const spotsLeft =
                      (ct?.maxCapacity ?? 0) - sc.enrolledCount;
                    const isFull = spotsLeft <= 0;

                    return (
                      <div
                        key={sc.id}
                        className="px-5 py-4 flex items-center gap-4 hover:bg-cream/30 transition-colors"
                      >
                        {/* Color bar */}
                        <div
                          className={`w-1 h-12 rounded-full shrink-0 ${
                            isReformer ? "bg-warm-brown" : "bg-rose"
                          }`}
                        />

                        {/* Class info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal">
                            {ct?.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                            <span className="inline-flex items-center gap-1 text-xs text-muted">
                              <Clock size={12} strokeWidth={1.5} />
                              {formatTime(sc.startTime)} &middot;{" "}
                              {ct?.duration}min
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-muted">
                              <User size={12} strokeWidth={1.5} />
                              {trainer?.name}
                            </span>
                          </div>
                        </div>

                        {/* Spots + Book */}
                        <div className="flex items-center gap-3 shrink-0">
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
                            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors ${
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
            </div>
          );
        })}
      </div>
    </>
  );
}
