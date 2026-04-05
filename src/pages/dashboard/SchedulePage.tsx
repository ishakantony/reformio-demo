import {
  getWeekDates,
  getClassesForDate,
  getClassTypeById,
  getTrainerById,
  getWeekDayLabel,
  formatTime,
} from "../../data/mock";

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function SchedulePage() {
  const weekDates = getWeekDates();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Weekly Schedule
        </h1>
        <p className="text-muted">
          {formatDateRange(weekDates[0], weekDates[6])}
        </p>
      </div>

      {/* Desktop grid */}
      <div className="hidden lg:block rounded-xl bg-white border border-divider/60 overflow-hidden">
        <div className="grid grid-cols-[80px_repeat(7,1fr)]">
          {/* Header row */}
          <div className="border-b border-r border-divider/60 bg-cream/40 px-2 py-3" />
          {weekDates.map((date) => {
            const isToday = date === new Date().toISOString().slice(0, 10);
            return (
              <div
                key={date}
                className={`border-b border-r border-divider/60 px-3 py-3 text-center last:border-r-0 ${
                  isToday ? "bg-warm-brown/5" : "bg-cream/40"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isToday ? "text-warm-brown" : "text-muted"
                  }`}
                >
                  {getWeekDayLabel(date)}
                </p>
                <p
                  className={`text-sm font-medium mt-0.5 ${
                    isToday ? "text-warm-brown" : "text-charcoal"
                  }`}
                >
                  {new Date(date + "T12:00:00").getDate()}
                </p>
              </div>
            );
          })}

          {/* Time rows */}
          {TIME_SLOTS.map((time) => (
            <TimeRow key={time} time={time} weekDates={weekDates} />
          ))}
        </div>
      </div>

      {/* Mobile: stacked day view */}
      <div className="lg:hidden space-y-6">
        {weekDates.map((date) => {
          const classes = getClassesForDate(date);
          const isToday = date === new Date().toISOString().slice(0, 10);
          return (
            <div
              key={date}
              className="rounded-xl bg-white border border-divider/60 overflow-hidden"
            >
              <div
                className={`px-5 py-3 border-b border-divider/60 ${
                  isToday ? "bg-warm-brown/5" : "bg-cream/40"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    isToday ? "text-warm-brown" : "text-charcoal"
                  }`}
                >
                  {getWeekDayLabel(date)}{" "}
                  {new Date(date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  {isToday && (
                    <span className="ml-2 text-xs bg-warm-brown text-cream rounded-full px-2 py-0.5">
                      Today
                    </span>
                  )}
                </span>
              </div>
              {classes.length === 0 ? (
                <div className="px-5 py-4 text-sm text-muted">
                  No classes scheduled.
                </div>
              ) : (
                <div className="divide-y divide-divider/40">
                  {classes.map((sc) => {
                    const ct = getClassTypeById(sc.classTypeId);
                    const trainer = getTrainerById(sc.trainerId);
                    return (
                      <div key={sc.id} className="px-5 py-3 flex items-center gap-4">
                        <div className="w-16 text-sm font-medium text-charcoal">
                          {formatTime(sc.startTime)}
                        </div>
                        <div
                          className={`w-1 h-8 rounded-full ${
                            ct?.name === "Reformer"
                              ? "bg-warm-brown"
                              : "bg-rose"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-charcoal">
                            {ct?.name}
                          </p>
                          <p className="text-xs text-muted">
                            {trainer?.name} &middot; {sc.enrolledCount}/
                            {ct?.maxCapacity}
                          </p>
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
    </div>
  );
}

function TimeRow({
  time,
  weekDates,
}: {
  time: string;
  weekDates: string[];
}) {
  const hour = parseInt(time.split(":")[0]);

  return (
    <>
      {/* Time label */}
      <div className="border-r border-b border-divider/60 px-2 py-3 text-xs text-muted text-right pr-3">
        {formatTime(time)}
      </div>

      {/* Day cells */}
      {weekDates.map((date) => {
        const classes = getClassesForDate(date);
        const classInSlot = classes.find((sc) => {
          const scHour = parseInt(sc.startTime.split(":")[0]);
          return scHour === hour;
        });

        const isToday = date === new Date().toISOString().slice(0, 10);

        return (
          <div
            key={date}
            className={`border-r border-b border-divider/60 last:border-r-0 min-h-[60px] p-1 ${
              isToday ? "bg-warm-brown/[0.02]" : ""
            }`}
          >
            {classInSlot && (
              <ClassBlock sc={classInSlot} />
            )}
          </div>
        );
      })}
    </>
  );
}

function ClassBlock({ sc }: { sc: { classTypeId: string; trainerId: string; startTime: string; enrolledCount: number } }) {
  const ct = getClassTypeById(sc.classTypeId);
  const trainer = getTrainerById(sc.trainerId);
  const isReformer = ct?.name === "Reformer";

  return (
    <div
      className={`rounded-lg px-2 py-1.5 text-xs h-full ${
        isReformer
          ? "bg-warm-brown/10 text-warm-brown-dark border border-warm-brown/20"
          : "bg-rose/15 text-rose-dark border border-rose/25"
      }`}
    >
      <p className="font-semibold truncate">{ct?.name}</p>
      <p className="truncate opacity-80">{formatTime(sc.startTime)}</p>
      <p className="truncate opacity-70">
        {trainer?.initials} &middot; {sc.enrolledCount}/{ct?.maxCapacity}
      </p>
    </div>
  );
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start + "T12:00:00");
  const e = new Date(end + "T12:00:00");
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}
