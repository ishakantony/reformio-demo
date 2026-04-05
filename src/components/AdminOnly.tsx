import { Navigate } from "react-router-dom";
import { getUser } from "../auth";

export default function AdminOnly({ children }: { children: React.ReactNode }) {
  const user = getUser();
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
