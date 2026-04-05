import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import {
  getWeeklyStats,
  getClassesForDate,
  getTodayDate,
  getClassTypeById,
  getTrainerById,
  formatTime,
} from "../../data/mock";

export default function OverviewPage() {
  const stats = getWeeklyStats();
  const todayClasses = getClassesForDate(getTodayDate());

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Overview
        </h1>
        <p className="text-muted">
          Here's what's happening at your studio this week.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Total Bookings"
          value={stats.totalBookings.toString()}
          sub="this week"
          icon={<BookingsStatIcon />}
        />
        <StatCard
          label="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          sub="from attended classes"
          icon={<RevenueIcon />}
        />
        <StatCard
          label="Capacity"
          value={`${stats.capacityUtilization}%`}
          sub="utilization this week"
          icon={<CapacityIcon />}
        />
        <StatCard
          label="Active Students"
          value={stats.activeStudents.toString()}
          sub="with active membership"
          icon={<StudentsStatIcon />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="xl:col-span-2 rounded-xl bg-white border border-divider/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-divider/60 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Today's Schedule
            </h2>
            <Link
              to="/manage/schedule"
              className="text-xs font-medium text-warm-brown hover:text-warm-brown-dark transition-colors"
            >
              View full schedule
            </Link>
          </div>

          {todayClasses.length === 0 ? (
            <div className="px-5 py-10 text-center text-muted text-sm">
              No classes scheduled for today.
            </div>
          ) : (
            <div className="divide-y divide-divider/40">
              {todayClasses.map((sc) => {
                const ct = getClassTypeById(sc.classTypeId);
                const trainer = getTrainerById(sc.trainerId);
                const spotsLeft = (ct?.maxCapacity ?? 0) - sc.enrolledCount;
                return (
                  <div
                    key={sc.id}
                    className="px-5 py-3.5 flex items-center gap-4 hover:bg-cream/40 transition-colors"
                  >
                    <div className="w-16 text-sm font-medium text-charcoal">
                      {formatTime(sc.startTime)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal">
                        {ct?.name}
                      </p>
                      <p className="text-xs text-muted">
                        {trainer?.name} &middot; {ct?.duration} min
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-charcoal">
                        {sc.enrolledCount}/{ct?.maxCapacity}
                      </p>
                      <p
                        className={`text-xs ${
                          spotsLeft <= 1
                            ? "text-red-600"
                            : spotsLeft <= 3
                              ? "text-amber-600"
                              : "text-muted"
                        }`}
                      >
                        {spotsLeft <= 0
                          ? "Full"
                          : `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-xl bg-white border border-divider/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-divider/60">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Quick Actions
            </h2>
          </div>
          <div className="p-4 space-y-2">
            <QuickAction
              to="/manage/classes"
              label="Manage Classes"
              description="View and manage class sessions"
              icon={<ClassesQAIcon />}
            />
            <QuickAction
              to="/manage/students"
              label="View Students"
              description="Student directory and memberships"
              icon={<StudentsQAIcon />}
            />
            <QuickAction
              to="/manage/schedule"
              label="Weekly Schedule"
              description="See the full week at a glance"
              icon={<ScheduleQAIcon />}
            />
            <QuickAction
              to="/manage/bookings"
              label="Booking History"
              description="Recent bookings and attendance"
              icon={<BookingsQAIcon />}
            />
          </div>

          {/* Recent activity summary */}
          <div className="px-5 py-4 border-t border-divider/60">
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
              At a Glance
            </h3>
            <div className="space-y-2 text-sm text-muted">
              <div className="flex justify-between">
                <span>Classes this week</span>
                <span className="font-medium text-charcoal">20</span>
              </div>
              <div className="flex justify-between">
                <span>Trial members</span>
                <span className="font-medium text-charcoal">
                  <Badge label="trial" /> 3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick Action Link
// ---------------------------------------------------------------------------

function QuickAction({
  to,
  label,
  description,
  icon,
}: {
  to: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-cream/60 transition-colors group"
    >
      <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-cream text-warm-brown group-hover:bg-warm-brown group-hover:text-cream transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-charcoal">{label}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Stat Icons
// ---------------------------------------------------------------------------

function BookingsStatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function CapacityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function StudentsStatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Quick Action Icons

function ClassesQAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function StudentsQAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ScheduleQAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function BookingsQAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
