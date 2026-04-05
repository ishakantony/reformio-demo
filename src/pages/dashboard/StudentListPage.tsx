import { useState } from "react";
import Badge from "../../components/Badge";
import SearchInput from "../../components/SearchInput";
import { students } from "../../data/mock";

export default function StudentListPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = students.filter((s) => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || s.membershipStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-1">
          Students
        </h1>
        <p className="text-muted">
          Student directory and membership overview.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="sm:w-64">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or email..."
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-divider bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-warm-brown/20"
        >
          <option value="all">All Memberships</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 mb-6 text-sm">
        <span className="text-muted">
          Total:{" "}
          <span className="font-medium text-charcoal">{students.length}</span>
        </span>
        <span className="text-muted">
          Active:{" "}
          <span className="font-medium text-charcoal">
            {students.filter((s) => s.membershipStatus === "active").length}
          </span>
        </span>
        <span className="text-muted">
          Trial:{" "}
          <span className="font-medium text-charcoal">
            {students.filter((s) => s.membershipStatus === "trial").length}
          </span>
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-divider/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-divider/60 bg-cream/40">
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Joined
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Classes
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted text-xs uppercase tracking-wider">
                  Last Attended
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/40">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-cream/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-warm-brown/10 text-warm-brown flex items-center justify-center text-xs font-semibold shrink-0">
                        {s.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium text-charcoal">
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{s.email}</td>
                  <td className="px-5 py-3">
                    <Badge label={s.membershipStatus} />
                  </td>
                  <td className="px-5 py-3 text-charcoal">{s.joinDate}</td>
                  <td className="px-5 py-3 text-charcoal">
                    {s.totalClasses}
                  </td>
                  <td className="px-5 py-3 text-charcoal">
                    {s.lastAttendance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-muted text-sm">
            No students match your search.
          </div>
        )}
      </div>
    </>
  );
}
