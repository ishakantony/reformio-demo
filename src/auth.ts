export type UserRole = "admin" | "student";

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  emergencyContact?: EmergencyContact;
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
  const dummyMatch = DUMMY_USERS.find((u) => u.email === email);
  if (!dummyMatch) {
    return { ok: false, error: "Invalid email or password." };
  }
  const expected = getPasswordForUser(email);
  if (password !== expected) {
    return { ok: false, error: "Invalid email or password." };
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyMatch.user));
  return { ok: true, user: dummyMatch.user };
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

const PASSWORD_KEY = "reformio_passwords";

function getPasswordStore(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PASSWORD_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getPasswordForUser(email: string): string {
  const store = getPasswordStore();
  if (store[email]) return store[email];
  const dummy = DUMMY_USERS.find((u) => u.email === email);
  return dummy?.password ?? "";
}

export function updateUser(updates: { name?: string; emergencyContact?: EmergencyContact }): User {
  const user = getUser();
  if (!user) throw new Error("Not authenticated");
  const updated = { ...user, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function changePassword(
  currentPassword: string,
  newPassword: string
): { ok: true } | { ok: false; error: string } {
  const user = getUser();
  if (!user) return { ok: false, error: "Not authenticated" };

  const actual = getPasswordForUser(user.email);
  if (currentPassword !== actual) {
    return { ok: false, error: "Current password is incorrect." };
  }

  const store = getPasswordStore();
  store[user.email] = newPassword;
  localStorage.setItem(PASSWORD_KEY, JSON.stringify(store));
  return { ok: true };
}
