# Reformio — Product Requirements Document (MVP 1)

**Version:** 0.2
**Date:** April 5, 2026
**Author:** Ishak

---

## 1. Overview

Reformio is a self-hosted web application for Pilates studios to manage their day-to-day operations — scheduling classes, managing trainers and students, tracking attendance, and exporting operational data.

Each organization deploys and runs their own instance of Reformio. There is no shared multi-tenant platform — every deployment is independent. MVP 1 supports a single studio per instance; multi-studio support is planned for a future version.

**Vision:** Become the operating system for Pilates studios — replacing spreadsheets, WhatsApp groups, and paper sign-in sheets with a purpose-built tool that understands Pilates workflows.

**Deployment model:** Single-tenant, self-hosted. Each organization deploys their own Reformio instance. Reformio is distributed as a deployable package, not offered as a hosted service.

**Platform:** Web application only (responsive design for mobile browsers).

---

## 2. Target Users & Roles

### 2.1 Admin (Studio Owner / Manager)
The person who owns or manages the studio. Multiple admins are supported (owner + managers). For MVP 1, all admins share the same permission level — there is no distinction between owner and manager permissions.

Admins have full control: manage classes, trainers, students, view reports, configure studio settings, and create all user accounts.

### 2.2 Trainer (Instructor)
Pilates instructors who teach classes. They can view their own schedule, see the full studio schedule (read-only), view booked students, mark attendance, and view student history. Trainers cannot create, cancel, or modify classes.

### 2.3 Student (Client / Member)
People who take Pilates classes. They can browse and book available classes, cancel bookings (subject to cancellation window), view their own booking history and attendance record, and manage their profile.

---

## 3. Authentication

### 3.1 Login
All users (admin, trainer, student) share the same login screen:
- Email and password fields + login button.
- No "sign up" or "create account" link — there is no self-registration. All accounts are created by an admin.
- No "forgot password" link — password resets are handled by the admin.

### 3.2 Account Creation
- Admin creates all user accounts (trainers and students) via the admin interface.
- When an account is created, the system generates a temporary password and displays it on a success screen. The admin copies this password and shares it with the user outside the system (verbally, WhatsApp, etc.).
- The temporary password is shown only once and cannot be retrieved later.

### 3.3 First Login & Password Reset
- On first login with a temporary password, the user is forced to a password change screen before they can access the app.
- Users can also change their password anytime from their profile.
- If a user forgets their password, the admin resets it (generates a new temporary password). The same forced-change flow applies on next login.

---

## 4. User Flows & Screens

### 4.1 Shared Layout
All roles use a sidebar navigation on the left. The sidebar items differ by role:

- **Admin:** Dashboard, Schedule, Trainers, Students, Reports, Settings
- **Trainer:** My Schedule, Studio Schedule, My Profile
- **Student:** My Bookings, Browse Classes, My Profile

All list views across the app use a card-style layout for visual consistency.

### 4.2 Admin Screens

#### 4.2.1 Dashboard (`/dashboard`)
The admin's landing page after login. Displays a snapshot of today's activity.

**Content:**
- **Today's overview** — four stat cards: classes today, total bookings, spots filled %, active students.
- **Today's classes** — a list of today's classes showing class name, time, trainer, bookings vs capacity, and status badge (upcoming, full, low availability).

#### 4.2.2 Schedule (`/schedule`)
All classes (upcoming and past), displayed as cards grouped by date.

**Content:**
- **Filter bar** — filter by class type, trainer, status (upcoming/past/cancelled), and date.
- **Class cards** — each card shows: class name, status badge, time, trainer (with avatar), booking count vs capacity with a progress bar. Clicking a card opens the class detail page.
- **"+ Create class" button** — navigates to the create class page.

#### 4.2.3 Create Class (`/schedule/create`)
A full-page form to create a single class. No recurring/series creation in MVP 1 — each class is created individually.

**Form fields:**
- Class type (dropdown — pre-configured in Settings)
- Date and start time
- Duration (minutes) and capacity (max students, set per class)
- Trainer (dropdown of active trainers)
- Room (dropdown — pre-configured in Settings, optional)
- Tags (multi-select chips — pre-configured in Settings)
- Notes (free text, optional)

**Behavior:**
- On submit, admin is returned to the Schedule page.
- Private sessions are simply classes with capacity = 1, using the same flow.

#### 4.2.4 Class Detail (`/schedule/:id`)
Full detail view of a single class, opened by clicking a class card.

**Content:**
- Class info: type, date/time, duration, trainer, room, capacity, tags, notes, status.
- List of booked students with attendance status.
- **Actions:** mark attendance (per student), cancel class, reassign trainer to a different trainer.

**Cancellation rules:**
- Admin can cancel a class. No student notifications are sent in MVP 1.
- Admin can cancel a student's booking regardless of the cancellation window, but must provide a justification reason.

#### 4.2.5 Trainers (`/trainers`)
A card grid of all trainers.

**Content:**
- Each card shows: avatar (initials or photo), name, short specialization, certification badges, classes this week, active/inactive status.
- **Search bar** and **status filter** (all / active / inactive).
- **"+ Add trainer" button** — navigates to the add trainer page.
- Clicking a card opens the trainer detail page.

#### 4.2.6 Add Trainer (`/trainers/create`)
A full-page form to create a trainer account.

**Form fields (Account section):**
- Full name
- Email
- Phone

**Form fields (Profile section):**
- Photo (upload, optional)
- Bio (text, optional — visible to students)
- Certifications (free-form chip input, optional — e.g., "PMA-CPT", "STOTT")
- Specializations (free-form chip input, optional — e.g., "Reformer", "Pre/Postnatal")

**On success:** A confirmation screen is displayed showing the trainer's name, email, and a system-generated temporary password with a copy button. A warning states the password will not be shown again. Two actions: "Back to trainers" and "Add another."

#### 4.2.7 Trainer Detail (`/trainers/:id`)
Full profile view of a single trainer.

**Content:**
- Profile info: name, photo, bio, certifications, specializations, email, phone, status.
- List of assigned classes (upcoming and past).

#### 4.2.8 Students (`/students`)
A card grid of all students. Same layout pattern as the Trainers page.

**Content:**
- Each card shows: avatar (initials), name, contact info.
- **Search bar** and **status filter**.
- **"+ Add student" button** — navigates to the add student page.
- Clicking a card opens the student detail page.

#### 4.2.9 Add Student (`/students/create`)
A full-page form to create a student account.

**Form fields (Account section):**
- Full name
- Email
- Phone

**Form fields (Emergency contact section):**
- Contact name
- Contact phone and relationship (side by side)

**On success:** Same pattern as trainer creation — confirmation screen with temporary password.

#### 4.2.10 Student Detail (`/students/:id`)
Full profile view of a single student.

**Content:**
- Profile info: name, email, phone, emergency contact.
- Booking history (upcoming and past) with attendance record.
- Admin can book a class on behalf of this student from this page.

#### 4.2.11 Reports (`/reports`)
A page listing available data exports. Each report is a card with a description, optional date range picker, and an "Export CSV" button.

**Available reports:**
- **All trainers** — name, email, phone, certifications, specializations, status.
- **All students** — name, email, phone, emergency contact, status.
- **Classes** — class type, date, time, trainer, capacity, bookings, status. Filterable by date range.
- **Bookings** — student, class, date, booking status, attendance. Filterable by date range.
- **Attendance** — student, total classes, attended, no-shows, attendance rate. Filterable by date range.

#### 4.2.12 Settings (`/settings`)
A single page with tabs for different setting areas.

**Tab: Studio**
- Studio name (text input)
- Address (text area)

**Tab: Class Types**
- List of class types with name and description.
- Add, edit, and delete actions.

**Tab: Rooms**
- List of room names.
- Add, edit, and delete actions.

**Tab: Tags**
- Chip/pill layout of tag names.
- Add, edit, and delete actions.
- Tags are used to categorize classes and are visible to students when filtering/browsing.

---

### 4.3 Trainer Screens

#### 4.3.1 My Schedule (`/my-schedule`)
The trainer's landing page. Shows only the trainer's own assigned classes as cards (same card style as the admin schedule).

**Content:**
- List of the trainer's upcoming and past classes.
- Clicking a card opens a simplified class detail view.

#### 4.3.2 Class Detail (Trainer View)
A simpler version of the admin class detail page.

**Content:**
- Class info: type, date/time, duration, room, capacity.
- List of booked students.
- **Mark attendance** action (per student).
- Clicking a student's name opens that student's history (past classes and attendance).

**Not available to trainers:** cancel class, reassign trainer, cancel bookings.

#### 4.3.3 Studio Schedule (`/studio-schedule`)
A read-only view of all classes across the studio. Same card layout as the admin schedule but without any create/edit/cancel actions.

#### 4.3.4 My Profile (`/profile`)
Trainer can view and edit their own profile: name, photo, bio, certifications, specializations, email, phone. Also includes a "change password" option.

---

### 4.4 Student Screens

#### 4.4.1 My Bookings (`/my-bookings`)
The student's landing page. Shows the student's own bookings organized in two tabs: **Upcoming** and **Past**.

**Content:**
- Each booking shows: class name, date/time, trainer name, attendance status (for past bookings).
- Each upcoming booking has a **Cancel** button with a confirmation prompt.
- Cancellation is subject to the cancellation window (hardcoded default, e.g., 12 hours before class). If within the window, the cancel button is disabled with a message explaining why.

#### 4.4.2 Browse Classes (`/browse`)
A card grid of all available upcoming classes.

**Content:**
- **Filters** — by class type, trainer, date, and tags.
- Each card shows: class name, date/time, trainer name, spots remaining, tags.
- Clicking a card opens the class detail page.

#### 4.4.3 Class Detail (Student View)
Full details of a class with booking action.

**Content:**
- Class type, description, date/time, duration, trainer (with full profile — name, photo, bio, certifications), room, spots remaining, tags.
- **"Book this class" button** — if spots are available.
- If the class is full, the button is disabled and shows "Class full."
- On successful booking, a confirmation message is displayed on screen (no redirect).

#### 4.4.4 My Profile (`/profile`)
Student can view and edit their own contact info and emergency contact. Also includes a "change password" option.

---

## 5. Business Rules

### 5.1 Cancellation Policy
- A hardcoded cancellation window applies (e.g., 12 hours before class start time). This is not configurable by the admin in MVP 1.
- Students cannot cancel their booking within the cancellation window.
- Admins can cancel any student's booking at any time, regardless of the cancellation window, but must provide a justification reason when doing so.

### 5.2 Booking Rules
- A class shows as "full" when bookings reach capacity. No waitlist in MVP 1.
- Admin can book a class on behalf of a student.
- Students can only book classes that are not full and are in the future.

### 5.3 Class Management
- Only admins can create, cancel, and modify classes.
- Only admins can reassign a class to a different trainer.
- Trainers cannot create, cancel, or modify classes.
- Classes are created one by one (no recurring/series in MVP 1).
- Private sessions use the same flow as group classes, with capacity set to 1.

### 5.4 Attendance
- Both admins and trainers can mark attendance for a class.
- Attendance statuses: attended, no-show.

### 5.5 Class Cancellation
- Admin can cancel a class. In MVP 1, no notifications are sent to booked students.

---

## 6. Data Model

### 6.1 Core Entities

#### Studio
| Field      | Type      | Notes            |
| ---------- | --------- | ---------------- |
| id         | UUID      | Primary key      |
| name       | string    | Studio name      |
| address    | string    | Physical address |
| created_at | timestamp |                  |

#### User
| Field                | Type      | Notes                         |
| -------------------- | --------- | ----------------------------- |
| id                   | UUID      | Primary key                   |
| studio_id            | UUID      | FK → Studio                   |
| email                | string    | Unique within the instance    |
| name                 | string    | Full name                     |
| phone                | string    | Optional                      |
| avatar_url           | string    | Optional                      |
| role                 | enum      | `admin`, `trainer`, `student` |
| status               | enum      | `active`, `inactive`          |
| password_hash        | string    | Hashed password               |
| must_change_password | boolean   | True for new/reset accounts   |
| created_at           | timestamp |                               |

#### Trainer Profile (extends User where role = trainer)
| Field           | Type     | Notes                                          |
| --------------- | -------- | ---------------------------------------------- |
| user_id         | UUID     | FK → User, primary key                         |
| bio             | text     | Public-facing bio, optional                    |
| certifications  | string[] | Free-form, e.g., ["PMA-CPT", "STOTT"]          |
| specializations | string[] | Free-form, e.g., ["Reformer", "Pre/Postnatal"] |

#### Student Profile (extends User where role = student)
| Field                          | Type   | Notes                    |
| ------------------------------ | ------ | ------------------------ |
| user_id                        | UUID   | FK → User, primary key   |
| emergency_contact_name         | string |                          |
| emergency_contact_phone        | string |                          |
| emergency_contact_relationship | string | e.g., "Spouse", "Parent" |

#### Class Type
| Field       | Type   | Notes                   |
| ----------- | ------ | ----------------------- |
| id          | UUID   | Primary key             |
| studio_id   | UUID   | FK → Studio             |
| name        | string | e.g., "Reformer basics" |
| description | text   | Optional                |

#### Room
| Field     | Type   | Notes            |
| --------- | ------ | ---------------- |
| id        | UUID   | Primary key      |
| studio_id | UUID   | FK → Studio      |
| name      | string | e.g., "Studio A" |

#### Tag
| Field     | Type   | Notes                           |
| --------- | ------ | ------------------------------- |
| id        | UUID   | Primary key                     |
| studio_id | UUID   | FK → Studio                     |
| name      | string | e.g., "Beginner", "Flexibility" |

#### Class
| Field            | Type      | Notes                                 |
| ---------------- | --------- | ------------------------------------- |
| id               | UUID      | Primary key                           |
| studio_id        | UUID      | FK → Studio                           |
| class_type_id    | UUID      | FK → Class Type                       |
| trainer_id       | UUID      | FK → User (trainer)                   |
| room_id          | UUID      | FK → Room, nullable                   |
| date             | date      | Class date                            |
| start_time       | time      |                                       |
| duration_minutes | integer   |                                       |
| capacity         | integer   | Max students                          |
| notes            | text      | Optional, free text                   |
| status           | enum      | `scheduled`, `cancelled`, `completed` |
| created_at       | timestamp |                                       |

#### Class–Tag (join table)
| Field    | Type | Notes      |
| -------- | ---- | ---------- |
| class_id | UUID | FK → Class |
| tag_id   | UUID | FK → Tag   |

#### Booking
| Field               | Type      | Notes                                                        |
| ------------------- | --------- | ------------------------------------------------------------ |
| id                  | UUID      | Primary key                                                  |
| class_id            | UUID      | FK → Class                                                   |
| student_id          | UUID      | FK → User (student)                                          |
| status              | enum      | `confirmed`, `cancelled`, `attended`, `no_show`              |
| booked_at           | timestamp |                                                              |
| cancelled_at        | timestamp | Nullable                                                     |
| cancellation_reason | string    | Nullable — required when admin cancels on behalf of student  |
| booked_by           | UUID      | FK → User — the user who made the booking (student or admin) |

---

## 7. Future Considerations

These items are explicitly out of scope for MVP 1 but worth keeping in mind for the data model and architecture:

- **Multi-studio support** — an Organization entity above Studio, with users able to belong to multiple studios. The current `studio_id` FK pattern makes this a straightforward migration.
- **Recurring class creation** — creating a series of classes from a single form.
- **Waitlist** — allowing students to join a waitlist when a class is full, with auto-promotion.
- **Notifications** — in-app and/or email notifications for booking confirmations, class cancellations, reminders.
- **Trainer availability & time-off management** — trainers setting their own availability and requesting time off.
- **Student progress tracking** — trainers logging session notes per student.
- **Configurable cancellation policy** — admin-configurable cancellation window and penalty rules.
- **Payments, billing, and invoicing** — class packages, credits, Stripe integration.
- **Native mobile apps** (iOS / Android).
- **Integrations** (Google Calendar sync, WhatsApp notifications).
- **Public booking page** — for student self-registration.
- **Audit log** — tracking who did what and when.
- **Owner vs manager permission levels** — role-based access within the admin role.

---

## 8. Open Questions

1. **Cancellation window default** — what should the hardcoded value be? 12 hours? 24 hours?
2. **Student card info** — what info should show on the student card grid? (Should it also show number of classes attended, last booking, etc.?)
3. **Admin booking on behalf** — where exactly should this action live? On the student detail page, on the class detail page, or both?
4. **Class editing** — should the admin be able to edit a class after creation (change time, trainer, capacity), or only cancel and create a new one?
5. **Deleting vs deactivating** — can admins delete trainers/students, or only deactivate them? Deletion has data integrity implications if the user has booking history.

---

*This is a living document. Please comment on sections that need refinement or flag anything that's missing.*