export interface Trainer {
  id: string;
  name: string;
  initials: string;
  specialty: "Reformer" | "Hot Mat" | "Both";
}

export interface ClassType {
  id: string;
  name: string;
  duration: number;
  maxCapacity: number;
  description: string;
  tags: string[];
}

export interface ScheduledClass {
  id: string;
  classTypeId: string;
  trainerId: string;
  date: string;
  startTime: string;
  enrolledCount: number;
  tags?: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipStatus: "active" | "expired" | "trial";
  joinDate: string;
  totalClasses: number;
  lastAttendance: string;
}

export interface Booking {
  id: string;
  studentId: string;
  scheduledClassId: string;
  bookedAt: string;
  status: "confirmed" | "cancelled" | "attended";
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const trainers: Trainer[] = [
  { id: "t-1", name: "Sarah K.", initials: "SK", specialty: "Reformer" },
  { id: "t-2", name: "James L.", initials: "JL", specialty: "Hot Mat" },
  { id: "t-3", name: "Mira D.", initials: "MD", specialty: "Both" },
];

export const classTypes: ClassType[] = [
  {
    id: "ct-1",
    name: "Reformer",
    duration: 50,
    maxCapacity: 8,
    description:
      "Build strength, flexibility, and control on the Pilates reformer.",
    tags: ["All Levels", "Strength", "Flexibility"],
  },
  {
    id: "ct-2",
    name: "Hot Mat",
    duration: 45,
    maxCapacity: 12,
    description:
      "Mat Pilates in a heated room — deepens every stretch and intensifies the burn.",
    tags: ["Intermediate", "Core", "Endurance"],
  },
];

// Generate dates for the current week (Mon–Sun)
function getCurrentWeekDates(): string[] {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

const week = getCurrentWeekDates();

export const scheduledClasses: ScheduledClass[] = [
  // Monday
  { id: "sc-1", classTypeId: "ct-1", trainerId: "t-1", date: week[0], startTime: "09:00", enrolledCount: 5, tags: ["All Levels", "Strength"] },
  { id: "sc-2", classTypeId: "ct-2", trainerId: "t-2", date: week[0], startTime: "11:30", enrolledCount: 6, tags: ["Intermediate", "Core"] },
  { id: "sc-3", classTypeId: "ct-1", trainerId: "t-1", date: week[0], startTime: "17:00", enrolledCount: 7, tags: ["Glute Focus", "Intermediate"] },
  // Tuesday
  { id: "sc-4", classTypeId: "ct-2", trainerId: "t-3", date: week[1], startTime: "08:00", enrolledCount: 8, tags: ["Beginner", "First Timer"] },
  { id: "sc-5", classTypeId: "ct-1", trainerId: "t-1", date: week[1], startTime: "10:00", enrolledCount: 3, tags: ["All Levels", "Flexibility"] },
  { id: "sc-6", classTypeId: "ct-2", trainerId: "t-2", date: week[1], startTime: "18:00", enrolledCount: 10, tags: ["Advanced", "Endurance"] },
  // Wednesday
  { id: "sc-7", classTypeId: "ct-1", trainerId: "t-3", date: week[2], startTime: "09:00", enrolledCount: 6, tags: ["Intermediate", "Core"] },
  { id: "sc-8", classTypeId: "ct-2", trainerId: "t-2", date: week[2], startTime: "12:00", enrolledCount: 9, tags: ["All Levels", "Flexibility"] },
  { id: "sc-9", classTypeId: "ct-1", trainerId: "t-1", date: week[2], startTime: "16:00", enrolledCount: 4, tags: ["Beginner", "First Timer"] },
  // Thursday
  { id: "sc-10", classTypeId: "ct-2", trainerId: "t-3", date: week[3], startTime: "08:00", enrolledCount: 11, tags: ["Advanced", "Endurance"] },
  { id: "sc-11", classTypeId: "ct-1", trainerId: "t-1", date: week[3], startTime: "10:30", enrolledCount: 8, tags: ["Glute Focus", "Strength"] },
  { id: "sc-12", classTypeId: "ct-1", trainerId: "t-3", date: week[3], startTime: "17:30", enrolledCount: 2, tags: ["Beginner", "All Levels"] },
  // Friday
  { id: "sc-13", classTypeId: "ct-2", trainerId: "t-2", date: week[4], startTime: "09:00", enrolledCount: 7, tags: ["Intermediate", "Core"] },
  { id: "sc-14", classTypeId: "ct-1", trainerId: "t-1", date: week[4], startTime: "11:00", enrolledCount: 5, tags: ["All Levels", "Strength"] },
  { id: "sc-15", classTypeId: "ct-2", trainerId: "t-3", date: week[4], startTime: "16:30", enrolledCount: 4, tags: ["Beginner", "Flexibility"] },
  // Saturday
  { id: "sc-16", classTypeId: "ct-1", trainerId: "t-1", date: week[5], startTime: "08:00", enrolledCount: 8, tags: ["Advanced", "Glute Focus"] },
  { id: "sc-17", classTypeId: "ct-2", trainerId: "t-2", date: week[5], startTime: "10:00", enrolledCount: 12, tags: ["All Levels", "Endurance"] },
  { id: "sc-18", classTypeId: "ct-1", trainerId: "t-3", date: week[5], startTime: "12:00", enrolledCount: 6, tags: ["Intermediate", "Strength"] },
  // Sunday
  { id: "sc-19", classTypeId: "ct-2", trainerId: "t-2", date: week[6], startTime: "09:00", enrolledCount: 5, tags: ["Beginner", "First Timer"] },
  { id: "sc-20", classTypeId: "ct-1", trainerId: "t-1", date: week[6], startTime: "11:00", enrolledCount: 3, tags: ["All Levels", "Flexibility"] },
];

export const students: Student[] = [
  { id: "s-1", name: "Jane Student", email: "jane@example.com", phone: "(555) 100-0001", membershipStatus: "active", joinDate: "2025-09-12", totalClasses: 48, lastAttendance: week[0] },
  { id: "s-2", name: "Olivia Chen", email: "olivia.c@example.com", phone: "(555) 100-0002", membershipStatus: "active", joinDate: "2025-11-03", totalClasses: 32, lastAttendance: week[1] },
  { id: "s-3", name: "Marcus Rivera", email: "marcus.r@example.com", phone: "(555) 100-0003", membershipStatus: "active", joinDate: "2026-01-15", totalClasses: 21, lastAttendance: week[0] },
  { id: "s-4", name: "Ava Patel", email: "ava.p@example.com", phone: "(555) 100-0004", membershipStatus: "trial", joinDate: "2026-03-20", totalClasses: 3, lastAttendance: week[1] },
  { id: "s-5", name: "Ethan Brooks", email: "ethan.b@example.com", phone: "(555) 100-0005", membershipStatus: "active", joinDate: "2025-08-01", totalClasses: 64, lastAttendance: week[2] },
  { id: "s-6", name: "Sophie Martin", email: "sophie.m@example.com", phone: "(555) 100-0006", membershipStatus: "expired", joinDate: "2025-06-22", totalClasses: 18, lastAttendance: "2026-02-10" },
  { id: "s-7", name: "Noah Kim", email: "noah.k@example.com", phone: "(555) 100-0007", membershipStatus: "active", joinDate: "2025-12-10", totalClasses: 27, lastAttendance: week[0] },
  { id: "s-8", name: "Isabella Torres", email: "isabella.t@example.com", phone: "(555) 100-0008", membershipStatus: "active", joinDate: "2026-02-01", totalClasses: 14, lastAttendance: week[1] },
  { id: "s-9", name: "Liam Foster", email: "liam.f@example.com", phone: "(555) 100-0009", membershipStatus: "trial", joinDate: "2026-03-28", totalClasses: 1, lastAttendance: week[0] },
  { id: "s-10", name: "Emma Zhang", email: "emma.z@example.com", phone: "(555) 100-0010", membershipStatus: "active", joinDate: "2025-10-18", totalClasses: 39, lastAttendance: week[2] },
  { id: "s-11", name: "Jackson Reeves", email: "jackson.r@example.com", phone: "(555) 100-0011", membershipStatus: "expired", joinDate: "2025-07-15", totalClasses: 12, lastAttendance: "2026-01-20" },
  { id: "s-12", name: "Mia Johnson", email: "mia.j@example.com", phone: "(555) 100-0012", membershipStatus: "active", joinDate: "2025-10-05", totalClasses: 42, lastAttendance: week[1] },
  { id: "s-13", name: "Lucas Ng", email: "lucas.ng@example.com", phone: "(555) 100-0013", membershipStatus: "active", joinDate: "2026-01-08", totalClasses: 19, lastAttendance: week[0] },
  { id: "s-14", name: "Aria Robinson", email: "aria.r@example.com", phone: "(555) 100-0014", membershipStatus: "trial", joinDate: "2026-04-01", totalClasses: 2, lastAttendance: week[0] },
  { id: "s-15", name: "Dylan Cooper", email: "dylan.c@example.com", phone: "(555) 100-0015", membershipStatus: "active", joinDate: "2025-11-28", totalClasses: 35, lastAttendance: week[2] },
];

export const bookings: Booking[] = [
  // Monday classes
  { id: "b-1", studentId: "s-1", scheduledClassId: "sc-1", bookedAt: `${week[0]}T07:30:00`, status: "attended" },
  { id: "b-2", studentId: "s-3", scheduledClassId: "sc-1", bookedAt: `${week[0]}T08:00:00`, status: "attended" },
  { id: "b-3", studentId: "s-7", scheduledClassId: "sc-1", bookedAt: `${week[0]}T08:15:00`, status: "attended" },
  { id: "b-4", studentId: "s-13", scheduledClassId: "sc-1", bookedAt: `${week[0]}T08:45:00`, status: "attended" },
  { id: "b-5", studentId: "s-9", scheduledClassId: "sc-1", bookedAt: `${week[0]}T09:00:00`, status: "cancelled" },
  { id: "b-6", studentId: "s-2", scheduledClassId: "sc-2", bookedAt: `${week[0]}T09:30:00`, status: "attended" },
  { id: "b-7", studentId: "s-5", scheduledClassId: "sc-2", bookedAt: `${week[0]}T10:00:00`, status: "attended" },
  { id: "b-8", studentId: "s-8", scheduledClassId: "sc-2", bookedAt: `${week[0]}T10:15:00`, status: "attended" },
  { id: "b-9", studentId: "s-14", scheduledClassId: "sc-2", bookedAt: `${week[0]}T10:30:00`, status: "cancelled" },
  { id: "b-10", studentId: "s-1", scheduledClassId: "sc-3", bookedAt: `${week[0]}T14:00:00`, status: "attended" },
  { id: "b-11", studentId: "s-10", scheduledClassId: "sc-3", bookedAt: `${week[0]}T14:30:00`, status: "attended" },
  { id: "b-12", studentId: "s-15", scheduledClassId: "sc-3", bookedAt: `${week[0]}T15:00:00`, status: "attended" },
  // Tuesday classes
  { id: "b-13", studentId: "s-4", scheduledClassId: "sc-4", bookedAt: `${week[1]}T06:00:00`, status: "attended" },
  { id: "b-14", studentId: "s-2", scheduledClassId: "sc-4", bookedAt: `${week[1]}T06:30:00`, status: "attended" },
  { id: "b-15", studentId: "s-12", scheduledClassId: "sc-4", bookedAt: `${week[1]}T07:00:00`, status: "attended" },
  { id: "b-16", studentId: "s-8", scheduledClassId: "sc-5", bookedAt: `${week[1]}T08:00:00`, status: "confirmed" },
  { id: "b-17", studentId: "s-5", scheduledClassId: "sc-5", bookedAt: `${week[1]}T08:30:00`, status: "confirmed" },
  { id: "b-18", studentId: "s-3", scheduledClassId: "sc-6", bookedAt: `${week[1]}T15:00:00`, status: "confirmed" },
  { id: "b-19", studentId: "s-7", scheduledClassId: "sc-6", bookedAt: `${week[1]}T15:30:00`, status: "confirmed" },
  { id: "b-20", studentId: "s-10", scheduledClassId: "sc-6", bookedAt: `${week[1]}T16:00:00`, status: "confirmed" },
  // Wednesday classes
  { id: "b-21", studentId: "s-1", scheduledClassId: "sc-7", bookedAt: `${week[2]}T07:00:00`, status: "confirmed" },
  { id: "b-22", studentId: "s-5", scheduledClassId: "sc-7", bookedAt: `${week[2]}T07:15:00`, status: "confirmed" },
  { id: "b-23", studentId: "s-15", scheduledClassId: "sc-7", bookedAt: `${week[2]}T07:30:00`, status: "confirmed" },
  { id: "b-24", studentId: "s-2", scheduledClassId: "sc-8", bookedAt: `${week[2]}T10:00:00`, status: "confirmed" },
  { id: "b-25", studentId: "s-12", scheduledClassId: "sc-8", bookedAt: `${week[2]}T10:30:00`, status: "confirmed" },
  { id: "b-26", studentId: "s-10", scheduledClassId: "sc-9", bookedAt: `${week[2]}T13:00:00`, status: "confirmed" },
  // Thursday
  { id: "b-27", studentId: "s-4", scheduledClassId: "sc-10", bookedAt: `${week[3]}T06:00:00`, status: "confirmed" },
  { id: "b-28", studentId: "s-7", scheduledClassId: "sc-11", bookedAt: `${week[3]}T08:00:00`, status: "confirmed" },
  { id: "b-29", studentId: "s-13", scheduledClassId: "sc-11", bookedAt: `${week[3]}T08:30:00`, status: "confirmed" },
  { id: "b-30", studentId: "s-3", scheduledClassId: "sc-12", bookedAt: `${week[3]}T15:00:00`, status: "confirmed" },
  // Friday
  { id: "b-31", studentId: "s-5", scheduledClassId: "sc-13", bookedAt: `${week[4]}T07:00:00`, status: "confirmed" },
  { id: "b-32", studentId: "s-8", scheduledClassId: "sc-13", bookedAt: `${week[4]}T07:30:00`, status: "confirmed" },
  { id: "b-33", studentId: "s-1", scheduledClassId: "sc-14", bookedAt: `${week[4]}T09:00:00`, status: "confirmed" },
  { id: "b-34", studentId: "s-15", scheduledClassId: "sc-14", bookedAt: `${week[4]}T09:30:00`, status: "confirmed" },
  { id: "b-35", studentId: "s-12", scheduledClassId: "sc-15", bookedAt: `${week[4]}T14:00:00`, status: "confirmed" },
  // Saturday
  { id: "b-36", studentId: "s-2", scheduledClassId: "sc-16", bookedAt: `${week[5]}T06:30:00`, status: "confirmed" },
  { id: "b-37", studentId: "s-7", scheduledClassId: "sc-16", bookedAt: `${week[5]}T07:00:00`, status: "confirmed" },
  { id: "b-38", studentId: "s-10", scheduledClassId: "sc-17", bookedAt: `${week[5]}T08:00:00`, status: "confirmed" },
  { id: "b-39", studentId: "s-3", scheduledClassId: "sc-18", bookedAt: `${week[5]}T10:00:00`, status: "confirmed" },
  // Sunday
  { id: "b-40", studentId: "s-5", scheduledClassId: "sc-19", bookedAt: `${week[5]}T07:00:00`, status: "confirmed" },
  { id: "b-41", studentId: "s-1", scheduledClassId: "sc-20", bookedAt: `${week[6]}T09:00:00`, status: "confirmed" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PRICE_PER_CLASS = 35;

export function getTrainerById(id: string): Trainer | undefined {
  return trainers.find((t) => t.id === id);
}

export function getClassTypeById(id: string): ClassType | undefined {
  return classTypes.find((c) => c.id === id);
}

export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

export function getAllClasses(): ScheduledClass[] {
  return [...scheduledClasses].sort((a, b) =>
    a.date === b.date
      ? a.startTime.localeCompare(b.startTime)
      : a.date.localeCompare(b.date),
  );
}

export function getClassesForDate(date: string): ScheduledClass[] {
  return scheduledClasses
    .filter((sc) => sc.date === date)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getBookingsForClass(classId: string): Booking[] {
  return bookings.filter((b) => b.scheduledClassId === classId);
}

export function getBookingsForStudent(studentId: string): Booking[] {
  return bookings.filter((b) => b.studentId === studentId);
}

export function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export function getWeeklyStats() {
  const totalBookings = bookings.filter((b) => b.status !== "cancelled").length;
  const attendedBookings = bookings.filter((b) => b.status === "attended").length;
  const revenue = attendedBookings * PRICE_PER_CLASS;

  const totalCapacity = scheduledClasses.reduce((sum, sc) => {
    const ct = getClassTypeById(sc.classTypeId);
    return sum + (ct?.maxCapacity ?? 0);
  }, 0);
  const totalEnrolled = scheduledClasses.reduce((sum, sc) => sum + sc.enrolledCount, 0);
  const capacityUtilization = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

  const activeStudents = students.filter((s) => s.membershipStatus === "active").length;

  return { totalBookings, revenue, capacityUtilization, activeStudents };
}

export function getWeekDayLabel(date: string): string {
  const d = new Date(date + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export function getWeekDates(): string[] {
  return getCurrentWeekDates();
}
