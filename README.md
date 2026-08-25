# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

                                            OR

                                            
Employee Payroll Management System — Frontend

A modern React + TypeScript frontend for an Employee Payroll Management System.

The application provides a clean admin dashboard for managing employees, departments, attendance, leaves, and payroll while communicating with a Spring Boot REST API.

✨ Features

🔐 Login and authentication

📊 Dashboard with employee/payroll overview

👨‍💼 Employee management — Add, View, Edit, Delete

🏢 Department management

🕐 Attendance — Check-in, Check-out, History

🏖️ Leave management — Apply, Approve, Reject

💰 Payroll — Generate and view payroll records

🌙 Dark mode

🌐 English / Hindi / Chinese language selector

🔔 Notification UI

📱 Responsive admin layout

🔗 REST API integration using Axios

🛡️ Protected routes and JWT token handling

🖼️ Frontend Preview



The showcase image is a visual preview of the frontend modules and overall UI direction.

🛠️ Tech Stack

Technology

Purpose

React

Frontend UI

TypeScript

Type-safe development

Vite

Development and build tooling

Axios

REST API communication

React Router DOM

Routing

React Icons

UI icons

Bootstrap

Responsive utilities/components

Custom CSS

Application-specific styling

Spring Boot REST API

Backend

PostgreSQL

Database

🏗️ Modules

Employee Payroll Management
│
├── 🔐 Authentication
├── 📊 Dashboard
├── 👨‍💼 Employees
├── 🏢 Departments
├── 🕐 Attendance
├── 🏖️ Leaves
└── 💰 Payroll

📁 Project Structure

src/
├── assets/
├── components/
├── context/
├── pages/
│   ├── login/
│   ├── dashboard/
│   ├── employees/
│   ├── departments/
│   ├── attendance/
│   ├── leaves/
│   └── payroll/
├── services/
│   ├── api.ts
│   ├── authService.ts
│   ├── dashboardService.ts
│   ├── employeeService.ts
│   ├── departmentService.ts
│   ├── attendanceService.ts
│   ├── leaveService.ts
│   └── payrollService.ts
├── hooks/
├── types/
├── utils/
├── App.tsx
└── main.tsx

🔗 Backend Integration

The frontend communicates with the Spring Boot backend through REST APIs.

Backend:

http://localhost:8080

Examples:

GET    /api/employees
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}

GET    /api/departments
POST   /api/departments
PUT    /api/departments/{id}
DELETE /api/departments/{id}

POST   /api/leaves
GET    /api/leaves
PUT    /api/leaves/{leaveId}/approve
PUT    /api/leaves/{leaveId}/reject

POST   /api/payroll/generate
GET    /api/payroll
GET    /api/payroll/employee/{employeeId}

🔐 Authentication Flow

Login
  ↓
Spring Boot Authentication API
  ↓
JWT Token
  ↓
localStorage
  ↓
Axios Authorization Header
  ↓
Protected API

Requests use:

Authorization: Bearer <JWT_TOKEN>

⚙️ Installation

1. Clone

git clone YOUR_GITHUB_REPOSITORY_URL

2. Enter project

cd employee-payroll-frontend

3. Install dependencies

npm install

4. Run development server

npm run dev

Open:

http://localhost:5173

🔧 Environment Variables

If your project uses Vite environment variables, create .env:

VITE_API_BASE_URL=http://localhost:8080/api

Never commit real passwords, JWT secrets, or other private credentials.

📜 Scripts

npm run dev
npm run build
npm run preview
npm run lint

🎨 UI

The frontend uses a modern admin-dashboard style with:

Gradient backgrounds

Colored summary cards

Rounded cards and buttons

Clean tables

Status badges

Consistent icons

Dark mode

Language switching

Notification controls

Responsive layouts

🌐 Language Support

🇬🇧 English
🇮🇳 Hindi
🇨🇳 Chinese

📌 Current Status

Login UI

Dashboard

Employee module

Department module

Attendance module

Leave module

Payroll module

API integration

Dark mode

Language selector

Notification UI

Responsive admin layout

Future Improvements

Employee-wise attendance identity improvements

Advanced dashboard charts

Payslip/PDF download

Reports and analytics

Better role-based UI permissions

Pagination and advanced filtering

Automated testing

Production deployment

🔄 Frontend + Backend

React + TypeScript
       │
       │ Axios / REST API
       ▼
Spring Boot Backend
       │
       │ JPA / Hibernate
       ▼
PostgreSQL

👨‍💻 Developer

Harsh Gupta

BCA Graduate | Java Backend Developer

Skills

Java • Spring Boot • Spring Security • JWT
REST API • PostgreSQL • React • TypeScript
Vite • Axios • Git & GitHub

⭐ Project

If you find this project useful for learning or portfolio purposes, consider giving the repository a ⭐.

📄 License

This project is developed for learning, practice, and portfolio purposes.

© 2026 Harsh Gupta



<img width="1024" height="1536" alt="frontend-showcase" src="https://github.com/user-attachments/assets/582c58bb-44b5-4172-a4b6-ca16a8c0044b" />




