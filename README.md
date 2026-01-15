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

## 📸 Demo Images:


### 🔐 LOGIN PAGE
<img width="1919" height="883" alt="Screenshot 2026-01-12 094517" src="https://github.com/user-attachments/assets/456c5871-32e5-4056-b95d-31ca2d490b59" />

### 🔐 SIGNUP PAGE
<img width="1915" height="877" alt="Screenshot 2026-01-12 092947" src="https://github.com/user-attachments/assets/9e2ed675-e530-4815-89f6-485ba7e16fc1" />

### 🏠 DASHBOARD PAGE
<img width="1914" height="886" alt="Screenshot 2026-01-12 093041" src="https://github.com/user-attachments/assets/f5d17b92-957d-40fe-8a82-fe5064d60a74" />
<img width="1919" height="884" alt="Screenshot 2026-01-12 093116" src="https://github.com/user-attachments/assets/3b079e61-3e30-444e-811d-70c0a6a80929" />
<img width="1915" height="882" alt="Screenshot 2026-01-12 093135" src="https://github.com/user-attachments/assets/830146d2-4355-4dcd-beef-28f6c868afa8" />

### PROJECT DETAILS PAGE
<img width="1919" height="885" alt="Screenshot 2026-01-12 093208" src="https://github.com/user-attachments/assets/6af35857-1d52-4f5a-9649-44418a2cbdd4" />

### TASK DETAILS PAGE
<img width="1919" height="890" alt="Screenshot 2026-01-12 093310" src="https://github.com/user-attachments/assets/087de33a-74fe-4cbe-9391-758640f8e199" />

### CREATE NEW TASK FORM
<img width="1919" height="889" alt="Screenshot 2026-01-12 093427" src="https://github.com/user-attachments/assets/71008b2e-6f2b-4fdc-8b0d-1443f17611c1" />
<img width="1918" height="885" alt="Screenshot 2026-01-12 093442" src="https://github.com/user-attachments/assets/69968447-d170-458e-a9d3-219dca4c35b7" />

### CREATE NEW PROJECT FORM
<img width="1919" height="883" alt="Screenshot 2026-01-12 093509" src="https://github.com/user-attachments/assets/24a08581-8dba-47b7-868e-3d5642620dea" />

### 📁 PROJECTS PAGE
<img width="1919" height="882" alt="Screenshot 2026-01-12 093344" src="https://github.com/user-attachments/assets/b9747ae1-c2ae-4ec2-9fed-dd804118da36" /> 
<img width="1919" height="882" alt="Screenshot 2026-01-12 093401" src="https://github.com/user-attachments/assets/b73ec477-1995-40f9-b835-6dbb7e6cbfcc" />

### 👥 TEAMS PAGE
<img width="1919" height="881" alt="Screenshot 2026-01-12 093758" src="https://github.com/user-attachments/assets/c27e4a41-7dc0-4882-918d-0b603fa49880" />

### CREATE NEW TEAM FORM
<img width="1919" height="884" alt="Screenshot 2026-01-12 093811" src="https://github.com/user-attachments/assets/b0910d2f-9aad-4330-986e-0915dd18d416" />

### TEAM DETAILS PAGE
<img width="1919" height="885" alt="Screenshot 2026-01-12 093839" src="https://github.com/user-attachments/assets/3fb47f53-1345-475a-a7fb-7d00c025d549" />

### ADD NEW MEMBERS TO TEAM FORM
<img width="1919" height="888" alt="Screenshot 2026-01-12 094033" src="https://github.com/user-attachments/assets/e88c66b0-989b-4d70-9bd2-bff408758a85" />

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
