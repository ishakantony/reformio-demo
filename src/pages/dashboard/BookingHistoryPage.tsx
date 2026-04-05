import { useState } from "react";
import { getUser } from "../../auth";
import Badge from "../../components/Badge";
import SearchInput from "../../components/SearchInput";
import {
  bookings,
  getStudentById,
  getClassTypeById,
  getTrainerById,
  formatTime,
  getWeekDayLabel,
  scheduledClasses,
} from "../../data/mock";

export default function BookingHistoryPage() {
  const user = getUser()!;
  const isAdmin = user.role === "admin";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const sourceBookings = isAdmin
    ? bookings
    : bookings.filter((b) => b.studentId === "s-1");

  const enriched = sourceBookings.map((b) => {
    const sc = scheduledClasses.find((c) => c.id === b.scheduledClassId);
    const student = getStudentById(b.studentId);
    const ct = sc ? getClassTypeById(sc.classTypeId) : undefined;
    const trainer = sc ? getTrainerById(sc.trainerId) : undefined;
    return { ...b, sc, student, ct, trainer };
  });

  const filtered = enriched.filter((b) => {
    const matchesSearch =
      !search ||
      (isAdmin && b.student?.name.toLowerCase().includes(search.toLowerCase())) ||
      b.ct?.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort by bookedAt descending
  const sorted = [...filtered].sort(
    (a, b) => b.bookedAt.localeCompare(a.bookedAt)
  );

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Bookings
        </h1>
        <p className="text-muted">Recent booking and attendance history.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="sm:w-64">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={isAdmin ? "Search by student or class..." : "Search by class..."}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-divider bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-brown/20"
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="attended">Attended</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Summary */}
      <div className="flex gap-4 mb-6 text-sm">
        <span className="text-muted">
          Total:{" "}
          <span className="font-medium text-charcoal">{sourceBookings.length}</span>
        </span>
        <span className="text-muted">
          Attended:{" "}
          <span className="font-medium text-charcoal">
            {sourceBookings.filter((b) => b.status === "attended").length}
          </span>
        </span>
        <span className="text-muted">
          Cancelled:{" "}
          <span className="font-medium text-charcoal">
            {sourceBookings.filter((b) => b.status === "cancelled").length}
          </span>
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-divider/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-divider/60 bg-cream/40">
                {isAdmin && (
                  <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                    Student
                  </th>
                )}
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Class
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Day
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Time
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Trainer
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/40">
              {sorted.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-cream/30 transition-colors"
                >
                  {isAdmin && (
                    <td className="px-5 py-3">
                      <span className="font-medium text-charcoal">
                        {b.student?.name ?? "—"}
                      </span>
                    </td>
                  )}
                  <td className="px-5 py-3 text-charcoal">
                    {b.ct?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-charcoal">
                    {b.sc ? getWeekDayLabel(b.sc.date) : "—"}
                  </td>
                  <td className="px-5 py-3 text-charcoal">
                    {b.sc ? formatTime(b.sc.startTime) : "—"}
                  </td>
                  <td className="px-5 py-3 text-charcoal">
                    {b.trainer?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <Badge label={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 && (
          <div className="px-5 py-10 text-center text-muted text-sm">
            No bookings match your filters.
          </div>
        )}
      </div>
    </>
  );
}
