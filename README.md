## 🗂️ Task Management App

A simple and responsive **Task Manager** built with **React**, **TypeScript**, and **Vite**, using **Firebase Authentication** and **Firestore** as the backend. The app allows users to securely register, login, and manage their daily tasks in a clean and user-friendly interface.

---

## 📌 Features

- 🔐 User Authentication (Register / Login / Logout)
- 📄 Create, Read, Update, and Delete Tasks (CRUD)
- ✅ Toggle Task Completion
- ☁️ Firestore Integration for real-time data storage
- 🎨 Responsive UI with Tailwind CSS

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Firebase (Authentication & Firestore)
- **Routing:** React Router
- **State Management:** useState, useEffect, custom hooks

---

## 🔧 Getting Started

### 1. Clone the Repository

- git clone https://github.com/your-username/task-manager-app.git
- cd task-manager-app

### 2. Install Dependencies

- npm install

### 3. Set Up Firebase

- Go to Firebase Console
- Create a new project
- Enable Email/Password Authentication
- Create a Cloud Firestore database

### 4. Configure Environment Variables

- Create a .env file in the root and add your Firebase credentials:
  VITE_API_KEY=your_api_key
  VITE_AUTH_DOMAIN=your_project.firebaseapp.com
  VITE_PROJECT_ID=your_project_id
  VITE_STORAGE_BUCKET=your_project.appspot.com
  VITE_MESSAGING_SENDER_ID=your_sender_id
  VITE_APP_ID=your_app_id
- You can find these values in your Firebase project's settings under Project Settings > General and Firestore setup.

---

## 🚀 Run the App

- npm run dev
- Visit: http://localhost:5173

---

## 📦 Build for Production

- npm run build
- To preview the production build: npm run preview

---

## 📁 Folder Structure

src/
├── assets/ → Background images, icons, etc.
├── components/ → Reusable UI components (e.g., Alert, ActionBar, TaskList)
├── context/ → Authentication context and hook
├── db/ → Firebase/firestore utility functions
├── pages/ → Auth pages and Dashboard
├── types/ → TypeScript interfaces
├── App.tsx → Main app with routes
├── main.tsx → Vite entry point

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

Made with ❤️ by Jitali Hadiya

---
