export type UserRole = "admin" | "student";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

const DUMMY_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "admin@reformio.app",
    password: "password123",
    user: {
      id: "u-admin-001",
      email: "admin@reformio.app",
      name: "Studio Admin",
      role: "admin",
    },
  },
  {
    email: "student@reformio.app",
    password: "password123",
    user: {
      id: "u-student-001",
      email: "student@reformio.app",
      name: "Jane Student",
      role: "student",
    },
  },
];

const STORAGE_KEY = "reformio_user";

export function login(
  email: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  const match = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!match) {
    return { ok: false, error: "Invalid email or password." };
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(match.user));
  return { ok: true, user: match.user };
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}
