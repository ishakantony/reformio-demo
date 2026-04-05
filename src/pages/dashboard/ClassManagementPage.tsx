import { useState } from "react";
import Badge from "../../components/Badge";
import SearchInput from "../../components/SearchInput";
import {
  scheduledClasses,
  classTypes,
  trainers,
  getClassTypeById,
  getTrainerById,
  formatTime,
  getWeekDayLabel,
} from "../../data/mock";

export default function ClassManagementPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [trainerFilter, setTrainerFilter] = useState("all");

  const filtered = scheduledClasses.filter((sc) => {
    const ct = getClassTypeById(sc.classTypeId);
    const trainer = getTrainerById(sc.trainerId);
    const matchesSearch =
      !search ||
      ct?.name.toLowerCase().includes(search.toLowerCase()) ||
      trainer?.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || sc.classTypeId === typeFilter;
    const matchesTrainer = trainerFilter === "all" || sc.trainerId === trainerFilter;
    return matchesSearch && matchesType && matchesTrainer;
  });

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Classes
        </h1>
        <p className="text-muted">Manage all scheduled class sessions.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="sm:w-64">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search classes or trainers..."
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-divider bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-brown/20"
        >
          <option value="all">All Types</option>
          {classTypes.map((ct) => (
            <option key={ct.id} value={ct.id}>
              {ct.name}
            </option>
          ))}
        </select>
        <select
          value={trainerFilter}
          onChange={(e) => setTrainerFilter(e.target.value)}
          className="rounded-lg border border-divider bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-brown/20"
        >
          <option value="all">All Trainers</option>
          {trainers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-divider/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-divider/60 bg-cream/40">
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
                  Enrolled
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/40">
              {filtered.map((sc) => {
                const ct = getClassTypeById(sc.classTypeId);
                const trainer = getTrainerById(sc.trainerId);
                const maxCap = ct?.maxCapacity ?? 0;
                const isFull = sc.enrolledCount >= maxCap;
                return (
                  <tr
                    key={sc.id}
                    className="hover:bg-cream/30 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div>
                        <p className="font-medium text-charcoal">{ct?.name}</p>
                        <p className="text-xs text-muted">{ct?.duration} min</p>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-charcoal">
                      {getWeekDayLabel(sc.date)}
                    </td>
                    <td className="px-5 py-3 text-charcoal">
                      {formatTime(sc.startTime)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-warm-brown/10 text-warm-brown flex items-center justify-center text-xs font-semibold">
                          {trainer?.initials}
                        </div>
                        <span className="text-charcoal">{trainer?.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-charcoal">
                        {sc.enrolledCount}/{maxCap}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge label={isFull ? "full" : "open"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-muted text-sm">
            No classes match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
