# Workviyo 🗂️

Workviyo is a full-stack task and project management application designed to help users efficiently manage projects, teams, members, and tasks from a single platform.

##### Hosted Link: (https://workviyo-frontend.vercel.app/)
 
##### Backend code URL: (https://github.com/vais2004/Workviyo)

##### Frontend code URL: (https://github.com/vais2004/workviyo-frontend)

##### Walkthrough Video: (https://drive.google.com/file/d/1WrpgegVmzN9Dr2I95eIGgw7-yBjZr1My/view?usp=sharing)

---

## 🚀 Features

### 🔐 Authentication
- Login for existing users
- Sign up for new users
- Guest login option

---

## 🏠 Home Page (Dashboard)

The **Home page** acts as the main dashboard of the application.

### Project Section
- Search bar to **search projects by name**
- Status filter to **filter projects by status**
- **New Project** button

#### Create New Project
Clicking the **New Project** button opens a form with:
- Project Name
- Project Description
- Project Status

On clicking **Create**, the project is saved and displayed in the **Project List**.

Clicking on a **Project Card** navigates to the **Project Details Page**.

---

### Task Section
Displayed below the project list.

Features:
- View all tasks
- Filter tasks by status
- **New Task** button

#### Create New Task
The task creation form includes:
- Select Project
- Task Name
- Select Team
- Select Status
- Select Owner(s)
- Add Tags
- Time to Complete
- Select Priority

After clicking **Create**, the task appears in the task list.

Clicking on a **Task Card** navigates to the **Task Details Page**, showing complete task information.

---

## 📂 Side Navigation Bar
A persistent sidebar visible on all pages.

### Navigation Links:
- Dashboard
- Projects
- Teams
- Reports
- Settings

---

## 📋 Projects Page

The **Projects page** displays tasks in a **table format** for better visibility.

### Table Columns:
- Task Name
- Owners
- Priority
- Created On
- Due Date
- Status

### Filters Available:
- Low to High Priority
- High to Low Priority
- Newest First
- Oldest First
- Filter by Status

Includes a **New Task** button for quick task creation.

---

## 👥 Teams Page

Teams are displayed as **cards** showing the team name.

### Features:
- Add new team
- View team details

#### Team Details Page
- List of team members
- Remove existing members
- Add new members using input and add button
- Assign members to teams using the **Members** selection button

---

## 📊 Reports Page

The **Reports page** provides visual insights using charts.

### Charts Included:
- **Pie Chart**: Tasks closed by each team
- **Bar Chart**: Total work completed in the last week
- **Bar Chart**: Total days of pending work

These charts help track team performance and workload distribution.

---

## ⚙️ Settings Page

The **Settings page** allows complete data management.

### Sections:
- Projects
- Teams
- Tasks

Each section includes:
- Edit button
- Delete button

A **Sign Out** button is available at the top of the page.

---

## 🧭 Navigation
A side navigation bar is available on all pages with the following links:
- Dashboard
- Projects
- Teams
- Reports
- Settings

---

## 🛠️ Tech Stack

### Frontend
- **React (v19)** – Component-based UI development
- **React Router DOM (v7)** – Client-side routing and navigation
- **Redux Toolkit & React Redux** – Global state management
- **Axios** – API communication with backend
- **Bootstrap 5 & Bootstrap Icons** – Responsive UI and styling
- **Recharts** – Analytics and report charts
- **React Toastify** – User notifications and alerts
- **JWT Decode** – Decode JWT tokens on client side

### Backend
- **Node.js** – JavaScript runtime environment
- **Express.js (v5)** – Backend framework for REST APIs
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT (jsonwebtoken)** – Authentication and authorization
- **Bcrypt** – Password hashing and security
- **CORS** – Cross-origin resource sharing
- **Dotenv** – Environment variable management
- **Nodemon** – Development server auto-restart

---

👩‍💻 **Developed by:** Vaishnavi H. Kawale 
