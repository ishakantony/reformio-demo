import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "./auth";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import DashboardLayout from "./components/DashboardLayout";
import AdminOnly from "./components/AdminOnly";
import OverviewPage from "./pages/dashboard/OverviewPage";
import StudentDashboardPage from "./pages/dashboard/StudentDashboardPage";
import ClassManagementPage from "./pages/dashboard/ClassManagementPage";
import StudentListPage from "./pages/dashboard/StudentListPage";
import SchedulePage from "./pages/dashboard/SchedulePage";
import BookingHistoryPage from "./pages/dashboard/BookingHistoryPage";
import StudentClassesPage from "./pages/dashboard/StudentClassesPage";

function GuestOnly({ children }: { children: React.ReactNode }) {
  if (isAuthenticated()) {
    const user = getUser();
    return <Navigate to={user?.role === "admin" ? "/manage/dashboard" : "/dashboard"} replace />;
  }
  return <>{children}</>;
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function DashboardIndex() {
  const user = getUser();
  if (user?.role === "admin") return <OverviewPage />;
  return <StudentDashboardPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <GuestOnly>
              <SignIn />
            </GuestOnly>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<StudentDashboardPage />} />
        </Route>
        <Route
          path="/classes"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<StudentClassesPage />} />
        </Route>
        <Route
          path="/bookings"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<BookingHistoryPage />} />
        </Route>
        <Route
          path="/manage"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<DashboardIndex />} />
          <Route path="classes" element={<AdminOnly><ClassManagementPage /></AdminOnly>} />
          <Route path="students" element={<AdminOnly><StudentListPage /></AdminOnly>} />
          <Route path="schedule" element={<AdminOnly><SchedulePage /></AdminOnly>} />
          <Route path="bookings" element={<BookingHistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
