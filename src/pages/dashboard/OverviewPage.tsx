import { Link } from "react-router-dom";
import { File, DollarSign, Activity, Users, BookOpen, User, Calendar, CheckSquare } from "lucide-react";
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
    <>
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
          icon={<File size={22} strokeWidth={1.5} />}
        />
        <StatCard
          label="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          sub="from attended classes"
          icon={<DollarSign size={22} strokeWidth={1.5} />}
        />
        <StatCard
          label="Capacity"
          value={`${stats.capacityUtilization}%`}
          sub="utilization this week"
          icon={<Activity size={22} strokeWidth={1.5} />}
        />
        <StatCard
          label="Active Students"
          value={stats.activeStudents.toString()}
          sub="with active membership"
          icon={<Users size={22} strokeWidth={1.5} />}
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
              icon={<BookOpen size={18} strokeWidth={1.5} />}
            />
            <QuickAction
              to="/manage/students"
              label="View Students"
              description="Student directory and memberships"
              icon={<User size={18} strokeWidth={1.5} />}
            />
            <QuickAction
              to="/manage/schedule"
              label="Weekly Schedule"
              description="See the full week at a glance"
              icon={<Calendar size={18} strokeWidth={1.5} />}
            />
            <QuickAction
              to="/manage/bookings"
              label="Booking History"
              description="Recent bookings and attendance"
              icon={<CheckSquare size={18} strokeWidth={1.5} />}
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
    </>
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

