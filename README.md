# 🎓 MediQueue – Tutor Booking System

## 🌐 Live Website

[Live Site URL Here]

---

# 📌 Project Overview

MediQueue is a modern Tutor Booking web application where students can explore tutors, book learning sessions, and manage scheduled classes efficiently.
The platform helps simplify tutor scheduling, prevents slot conflicts, and provides a smooth learning experience for students.

This project is built using modern full-stack technologies including Next.js, MongoDB, Better Auth, JWT, Tailwind CSS, and Framer Motion.

---

# 🚀 Key Features

* 🔐 Secure Authentication System
* 🌍 Google & Email Authentication
* 🎓 Browse All Available Tutors
* 📅 Online Tutor Session Booking
* ⚡ Real-Time Slot Availability Management
* 🔎 Search Tutors by Name
* 📆 Filter Tutors by Session Date
* 🌙 Dark & Light Theme Support
* 🔒 JWT Protected Private Routes
* 📱 Fully Responsive Design
* ✨ Smooth UI Animations
* 🔔 Toast Notifications for CRUD Operations
* 🧾 Manage Personal Tutors & Booked Sessions
* 🚫 Booking Restriction Before Session Start Date
* ❌ Booking Restriction When Slots Become Full

---

# 🛠️ Technologies Used

## Frontend

* Next.js 16
* React 19
* Tailwind CSS 4
* DaisyUI
* Framer Motion
* Swiper JS
* Lucide React
* React Icons
* React Hot Toast
* React Toastify

## Backend

* Node.js
* MongoDB
* Better Auth
* JWT Authentication
* Express.js
* Cookie Parser
* CORS

---

# 📦 NPM Packages Used

```bash id="m4p9q1"
npm install next react react-dom mongodb better-auth @better-auth/mongo-adapter jsonwebtoken cors cookie-parser framer-motion lucide-react react-hot-toast react-toastify react-icons swiper
```

---

# 🎯 Main Functionalities

## Authentication

* User Registration
* User Login
* Google Login
* Secure Session Management
* Protected Routes

---

## Tutor Management

* Add New Tutor
* Update Tutor Information
* Delete Tutor
* Manage Personal Tutors

---

## Booking System

* Book Tutor Sessions
* Auto Slot Decrease
* Booking Status System
* Cancel Booked Session
* Session Availability Validation

---

## Search & Filter

* Case-insensitive Tutor Search
* Filter Tutors by Date Range

---

# 📚 Main Pages

| Route                 | Description     |
| --------------------- | --------------- |
| `/`                   | Home Page       |
| `/tutors`             | All Tutors      |
| `/tutors/[id]`          | Tutor Details   |
| `/add-tutor`          | Add Tutor       |
| `/my-tutors`          | My Tutors       |
| `/booked-sessions`     | Booked Sessions |
| `/login`              | Login Page      |
| `/register`           | Register Page   |

---

# 🔐 Authentication & Security

* Better Auth Authentication System
* JWT Token Based Authorization
* Protected Private Routes
* Persistent User Session
* Secure API Requests

---

# 🌙 UI & UX Features

* Modern Glassmorphism Inspired Design
* Fully Responsive Layout
* Smooth Hover Effects
* Animated Components
* Equal Height Cards
* Premium Dark/Light Theme

---

# 📱 Responsive Design

The website is optimized for:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

---

# ⚙️ Environment Variables

## Client Side

```env id="jlwmwd"
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=YOUR_AUTH_SECRET
MONGODB_URL=YOUR_DATABASE_URI
JWT_SECRET=YOUR_SECRET_KEY
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

## Server Side

```env id="c6a8mk"
MONGODB_URI=YOUR_DATABASE_URI
JWT_SECRET=YOUR_SECRET_KEY
BETTER_AUTH_SECRET=YOUR_AUTH_SECRET
BETTER_AUTH_URL=YOUR_SERVER_URL
```

---

# 💻 Installation Guide

## Clone Repository

```bash id="z8d7ja"
git clone YOUR_CLIENT_REPOSITORY_LINK
```

---

## Install Dependencies

```bash id="kmp2yh"
npm install
```

---

## Start Development Server

```bash id="e6v4lp"
npm run dev
```

---

# 📁 Project Structure

```bash id="20kv0y"
src/
│
├── app/
├── components/
├── hooks/
├── providers/
├── services/
├── utils/
├── lib/
```

---

# 🔍 Search & Filter System

## Search Tutors

Users can search tutors by name using MongoDB regex search.

## Filter Tutors

Users can filter tutors using session start dates.

---

# 🔔 Notifications

All CRUD operations use custom toast notifications instead of default browser alerts.

---

# 🚀 Deployment

## Client Side

* [Vercel](https://vercel.com?utm_source=chatgpt.com)

## Server Side

* [Render](https://render.com?utm_source=chatgpt.com)

---

# 👨‍💻 Developer

### Developed By

Tamim Hasan

---

# 📌 Assignment Requirements Covered

* ✅ JWT Authentication
* ✅ Protected Routes
* ✅ CRUD Operations
* ✅ Search & Filter Feature
* ✅ Dynamic Website Title
* ✅ 404 Error Page
* ✅ Responsive Design
* ✅ Dark/Light Theme
* ✅ Loading Spinner
* ✅ Toast Notifications
* ✅ No Lorem Ipsum Text
* ✅ Modern Unique UI Design

---

# ⭐ Future Improvements

* Tutor Rating System
* Live Video Sessions
* Payment Integration
* Student Dashboard Analytics
* Real-Time Notifications

---

# 🙌 Thank You

Thank you for visiting MediQueue – Tutor Booking System.
