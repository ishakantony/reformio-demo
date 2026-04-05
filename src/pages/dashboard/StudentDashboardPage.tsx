import { Link } from "react-router-dom";
import { getUser } from "../../auth";
import Badge from "../../components/Badge";
import {
  bookings,
  scheduledClasses,
  getClassTypeById,
  getTrainerById,
  formatTime,
  getWeekDayLabel,
} from "../../data/mock";

export default function StudentDashboardPage() {
  const user = getUser()!;

  // For demo, use student s-1 (Jane Student) bookings
  const studentBookings = bookings
    .filter((b) => b.studentId === "s-1")
    .map((b) => {
      const sc = scheduledClasses.find((c) => c.id === b.scheduledClassId);
      const ct = sc ? getClassTypeById(sc.classTypeId) : undefined;
      const trainer = sc ? getTrainerById(sc.trainerId) : undefined;
      return { ...b, sc, ct, trainer };
    })
    .sort((a, b) => {
      if (!a.sc || !b.sc) return 0;
      return (
        a.sc.date.localeCompare(b.sc.date) ||
        a.sc.startTime.localeCompare(b.sc.startTime)
      );
    });

  const upcoming = studentBookings.filter((b) => b.status === "confirmed");
  const attended = studentBookings.filter((b) => b.status === "attended");

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Welcome back, {user.name}
        </h1>
        <p className="text-muted">Here's your class schedule and activity.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl bg-white border border-divider/60 p-5">
          <p className="text-xs font-medium text-muted mb-1">
            Upcoming Classes
          </p>
          <p className="font-serif text-3xl font-semibold text-charcoal">
            {upcoming.length}
          </p>
        </div>
        <div className="rounded-xl bg-white border border-divider/60 p-5">
          <p className="text-xs font-medium text-muted mb-1">
            Classes Attended
          </p>
          <p className="font-serif text-3xl font-semibold text-charcoal">
            {attended.length}
          </p>
        </div>
        <div className="rounded-xl bg-white border border-divider/60 p-5">
          <p className="text-xs font-medium text-muted mb-1">Membership</p>
          <p className="font-serif text-xl font-semibold text-charcoal mt-1">
            <Badge label="active" />
          </p>
        </div>
      </div>

      {/* Upcoming classes */}
      <div className="rounded-xl bg-white border border-divider/60 overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-divider/60 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-charcoal">
            Upcoming Classes
          </h2>
          <Link
            to="/bookings"
            className="text-xs font-medium text-warm-brown hover:text-warm-brown-dark transition-colors"
          >
            View all bookings
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="px-5 py-10 text-center text-muted text-sm">
            No upcoming classes booked.
          </div>
        ) : (
          <div className="divide-y divide-divider/40">
            {upcoming.map((b) => (
              <div
                key={b.id}
                className="px-5 py-3.5 flex items-center gap-4 hover:bg-cream/40 transition-colors"
              >
                <div
                  className={`w-1.5 h-10 rounded-full ${
                    b.ct?.name === "Reformer" ? "bg-warm-brown" : "bg-rose"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">
                    {b.ct?.name}
                  </p>
                  <p className="text-xs text-muted">
                    {b.sc
                      ? `${getWeekDayLabel(b.sc.date)} ${formatTime(b.sc.startTime)}`
                      : "—"}{" "}
                    &middot; {b.trainer?.name}
                  </p>
                </div>
                <Badge label={b.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past classes */}
      {attended.length > 0 && (
        <div className="rounded-xl bg-white border border-divider/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-divider/60">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Recent Attendance
            </h2>
          </div>
          <div className="divide-y divide-divider/40">
            {attended.map((b) => (
              <div
                key={b.id}
                className="px-5 py-3.5 flex items-center gap-4"
              >
                <div className="w-1.5 h-10 rounded-full bg-green-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">
                    {b.ct?.name}
                  </p>
                  <p className="text-xs text-muted">
                    {b.sc
                      ? `${getWeekDayLabel(b.sc.date)} ${formatTime(b.sc.startTime)}`
                      : "—"}{" "}
                    &middot; {b.trainer?.name}
                  </p>
                </div>
                <Badge label="attended" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
