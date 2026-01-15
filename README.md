# Workviyo 🗂️

Workviyo is a full-stack task and project management application designed to help users efficiently manage projects, teams, members, and tasks from a single platform.

## 🔗 Project Resources

-  **Live Application:** [View Demo](https://workviyo-frontend.vercel.app/)
-  **Backend Source Code:** [Click here](https://github.com/vais2004/Workviyo)
-  **Frontend Source Code:** [Click here](https://github.com/vais2004/workviyo-frontend)
-  **Project Walkthrough:** [Watch Video](https://drive.google.com/file/d/114fh3X6H5v2dqnmVUohD74eap0TYa65b/view?usp=sharing)


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

Clicking on a **Task Card** navigates to the **Task Details Page**, showing complete task information and Update Task button.

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
- Filter by Project

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
- “+ Members” opens a member management form where existing members can be selected, new members can be created, and selected members are added to the team

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

## 📸 Demo Images:


### 🔐 LOGIN PAGE
<img width="1919" height="883" alt="Screenshot 2026-01-12 094517" src="https://github.com/user-attachments/assets/456c5871-32e5-4056-b95d-31ca2d490b59" />

### 🔐 SIGNUP PAGE
<img width="1915" height="877" alt="Screenshot 2026-01-12 092947" src="https://github.com/user-attachments/assets/9e2ed675-e530-4815-89f6-485ba7e16fc1" />

### 🏠 DASHBOARD PAGE
<img width="1919" height="884" alt="Screenshot 2026-01-15 214814" src="https://github.com/user-attachments/assets/8275a0ef-7246-4b1c-bbba-2f0acf840030" />
<img width="1919" height="884" alt="Screenshot 2026-01-12 093116" src="https://github.com/user-attachments/assets/3b079e61-3e30-444e-811d-70c0a6a80929" />
<img width="1915" height="882" alt="Screenshot 2026-01-12 093135" src="https://github.com/user-attachments/assets/830146d2-4355-4dcd-beef-28f6c868afa8" />

### TASK DETAILS PAGE
<img width="1919" height="887" alt="Screenshot 2026-01-15 214830" src="https://github.com/user-attachments/assets/2118e2ae-1058-431c-8367-1501fd5b8183" />

### CREATE NEW TASK FORM
<img width="1919" height="889" alt="Screenshot 2026-01-12 093427" src="https://github.com/user-attachments/assets/71008b2e-6f2b-4fdc-8b0d-1443f17611c1" />
<img width="1918" height="885" alt="Screenshot 2026-01-12 093442" src="https://github.com/user-attachments/assets/69968447-d170-458e-a9d3-219dca4c35b7" />

### CREATE NEW PROJECT FORM
<img width="1919" height="883" alt="Screenshot 2026-01-12 093509" src="https://github.com/user-attachments/assets/24a08581-8dba-47b7-868e-3d5642620dea" />

### 📁 PROJECTS PAGE
<img width="1919" height="883" alt="Screenshot 2026-01-15 232724" src="https://github.com/user-attachments/assets/011da233-4731-4a4a-bdff-8e35709d4f35" />
<img width="1919" height="882" alt="Screenshot 2026-01-12 093401" src="https://github.com/user-attachments/assets/b73ec477-1995-40f9-b835-6dbb7e6cbfcc" />

### 👥 TEAMS PAGE
<img width="1919" height="881" alt="Screenshot 2026-01-12 093758" src="https://github.com/user-attachments/assets/c27e4a41-7dc0-4882-918d-0b603fa49880" />

### CREATE NEW TEAM FORM
<img width="1919" height="884" alt="Screenshot 2026-01-12 093811" src="https://github.com/user-attachments/assets/68869478-c310-47bc-89a0-3acdcaaa8f4a" />

### TEAM DETAILS PAGE
<img width="1919" height="891" alt="Screenshot 2026-01-15 214906" src="https://github.com/user-attachments/assets/ca7ec61c-3008-47bf-bd10-0c06c9f08454" />

### ADD NEW MEMBERS TO TEAM FORM
<img width="1919" height="888" alt="Screenshot 2026-01-15 222216" src="https://github.com/user-attachments/assets/0a5da717-b428-4f05-b3cb-9e18a7ea2e72" />

### 📊 REPORTS
<img width="1919" height="885" alt="Screenshot 2026-01-12 094141" src="https://github.com/user-attachments/assets/c8121d9d-d798-48b8-b075-8e42e34e5fd0" />
<img width="1917" height="888" alt="Screenshot 2026-01-12 094203" src="https://github.com/user-attachments/assets/1b0a5ac8-4b1a-4a94-a420-06d3b1becec6" />
<img width="1919" height="882" alt="Screenshot 2026-01-12 094218" src="https://github.com/user-attachments/assets/828a1ec4-8766-405d-b9fd-0e7a17d0d41b" />

### ⚙️ SETTINGS PAGE
<img width="1918" height="882" alt="Screenshot 2026-01-12 094234" src="https://github.com/user-attachments/assets/b6564a8f-ff2f-4c87-8bbe-8ab16d1026b9" />
<img width="1918" height="882" alt="Screenshot 2026-01-12 094255" src="https://github.com/user-attachments/assets/1ebed45a-639d-48b3-8a0f-20add21440db" />
<img width="1912" height="884" alt="Screenshot 2026-01-12 094311" src="https://github.com/user-attachments/assets/131719ad-1ca5-4a98-beb2-1d65ab23c287" />

---

👩‍💻 **Developed by:** Vaishnavi H. Kawale 
