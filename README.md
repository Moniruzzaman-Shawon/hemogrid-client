# Untitled

# 🩸 HemoGrid - Blood Donation Web Application (Frontend)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

HemoGrid is a comprehensive blood donation web application designed to streamline donor management, blood requests, and real-time updates for both donors and recipients. The frontend is built with modern technologies, offering a responsive, user-friendly interface.

---

## 🌐 Live Demo

*[Visit the website](https://hemogrid-client.vercel.app/)*

---

## 💻 Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, DaisyUI
- **State Management:** React Context API (optional Redux)
- **API Communication:** Axios
- **Backend:** Django REST API (already implemented)
- **Deployment:** Vercel / Netlify (frontend), Render / Heroku (backend)

---

## 📂 Project Structure
````
src/
├── assets/ # Images, logos, icons
├── components/ # Reusable UI components
├── layouts/ # Layouts (Public, Dashboard, Admin)
├── pages/ # Route-driven pages
├── services/ # API integration files
├── context/ # Auth context / global state
├── utils/ # Helpers (token storage, formatters)
└── App.jsx
````


---

## 🎨 UI/UX Standards

- **Theme:** Healthcare-friendly (red, white, soft gray, light green)
- **Mobile-First & Responsive** design
- **Consistency:** DaisyUI for forms, buttons, cards, tables, modals
- **User Feedback:** Alerts and notifications for API responses (success/error)

---

## 🔑 Authentication & User Flow

- **Registration:** Email verification → Login → Dashboard
- **Login:** JWT token stored securely (localStorage or cookies)
- **Logout:** Clears token → Redirect to Home
- **Forgot/Reset Password:** Email reset link → New password
- **Role-Based Access:** Donor, Recipient, Admin (future scope)

---

## 📄 Pages Overview

### 🔓 Public Pages

- Home/Landing Page: Hero section, stats, CTA
- About Page: Mission & purpose
- Contact Page: Form & links
- FAQ Page: Eligibility, donation rules
- Search Donors (Public): Basic filters

### 🔑 Authentication Pages

- Register, Login, Forgot Password, Reset Password, Email Verification

### 👤 Donor Pages

- Dashboard, My Profile, Donation History, Accepted Requests

### 🧑‍⚕️ Recipient Pages

- Dashboard, Create Blood Request, My Requests, Request Detail

### 🔄 Requests & Search

- Browse Requests, Request Detail, Search Donors (Authenticated)

### 🔔 Notifications & System

- Notifications, Error Pages (404, 500), Terms & Privacy

### 🛠 Admin (Future Scope)

- Admin Dashboard: User & request management, analytics

---

## 🔗 API Integration

Axios instance with interceptors for JWT token management. Example endpoints:

| Feature | Endpoint |
| --- | --- |
| Register | `/api/auth/register/` |
| Login | `/api/auth/login/` |
| Logout | `/api/auth/logout/` |
| Donor Profile | `/api/donor-profile/` |
| Create Blood Request | `/api/blood-requests/create/` |
| List Requests | `/api/blood-requests/` |
| Accept Request | `/api/blood-requests/{id}/accept/` |
| Donation History | `/api/donation-history/` |
| Search Donors | `/api/donors/?blood_group=A+` |
| Notifications | `/api/notifications/` |

---

## 🏗 Component Planning

- **Reusable Components:** Navbar, Footer, Sidebar, Card, Form inputs, Alerts/Toasts, Pagination
- **Layouts:** Public, Dashboard, Admin

---

## 📊 Development Roadmap

### Phase 1 (MVP)

- Home, Register, Login, Dashboard, Profile, Create Request, Requests List

### Phase 2

- Donation History, Notifications, Forgot/Reset Password, Search Donors

### Phase 3

- About, Contact, FAQ, Error Pages, Terms/Privacy

### Phase 4 (Future/Scaling)

- Admin dashboard, advanced analytics, in-app messaging

---

## ✅ Development Practices

- Branching: `main` (stable), `dev` (development), feature branches
- Frequent meaningful commits
- Component-based structure for readability
- Test API calls in Postman before integration
- Authentication guard for private routes
- Staging deployment for testing before production

---

## 🚀 Deployment

- Frontend: Vercel / Netlify
- CI/CD: GitHub Actions or similar
- Monitor errors (e.g., Sentry)
- Unit/Integration tests: Jest + React Testing Library

---

## 📫 Contact

- **Author:** Moniruzzaman Shawon
- **GitHub:** [https://github.com/Moniruzzaman-Shawon](https://github.com/Moniruzzaman-Shawon)
- **Email:** [m.zaman.djp@gmail.com](mailto:m.zaman.djp@gmail.com)

---

*HemoGrid aims to make blood donation seamless, transparent, and impactful for donors and recipients alike.*
