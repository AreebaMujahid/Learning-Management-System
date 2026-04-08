# 🎓 LMS Portal - Web App Assessment
**Developed by:** [Areeba Mujahid](https://github.com/areebamujahid)  
**Role:** Software Engineer

A high-performance, full-stack Learning Management System (LMS) built with the **MERN stack** and **NestJS**. This project focuses on secure video processing, automated media transformations, and a professional user experience.

---

## 🚀 Key Features

* **Secure Authentication:** JWT implementation and protected routes.
* **Automated Media Processing:** * Direct video streaming to Cloudinary via Memory Storage (Buffers).
    * **10-second Automated Snapshots:** High-quality thumbnails generated automatically from the intro video.
* **Responsive Dashboard:** A modern, professional UI built for speed and accessibility.
* **Data Integrity:** Strict TypeScript interfaces and DTO validations using `class-validator`.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, TypeScript, Tailwind CSS, Shadcn UI, React Query |
| **Backend** | NestJS (Node.js), TypeScript, MongoDB (Mongoose) |
| **Media/Storage** | Cloudinary (Video Streaming & Image Processing) |
| **Utilities** | Axios, Lucide Icons, Bcrypt, Multer |

---

## 📂 Project Structure

### 🖥️ Backend (NestJS)
* `src/modules/auth`: JWT strategies, Guards, and Login/Signup logic.
* `src/modules/courses`: Course/Video schemas and CRUD operations.
* `src/providers/cloudinary`: Dedicated service for streaming and eager transformations.

### 🎨 Frontend (React)
* `src/features/auth`: User authentication components and hooks.
* `src/components/ui`: Highly reusable Shadcn-based UI components.
* `src/lib/utils`: Styling utilities and API configuration.

---

## ⚙️ Installation & Setup 
## Backend
### 1. Clone the Repository
```bash
git clone <your-repo-url>

### 2. packages installation
```bash
npm install

### 3. env variables setup - create .env file

### 4. run the application
```bash
npm run start:dev
```

## Frontend
```bash
git clone <your-repo-url>

### 2. packages installation
```bash
npm install

### 4. run the application
```bash
npm run dev






