# Postz

A modern full-stack web application built with a Django REST API backend by python language and a React (Vite) frontend with Bootstrap 5 styling. This platform allows registered users to create, view, edit, and filter post content across diverse categories (News, Sports, Games, Movies-shows, Music, and Other), engage through real-time comments, and manage their personal posts directly from a customized user dashboard.


## Features

* **User Authentication & Authorization:** Secure JWT authentication (Django REST Framework SimpleJWT) for sign-up, sign-in, and session management.
* **Category-Based Posts:** Create posts categorized under *News*, *Sports*, *Games*, *Movies-shows*, *Music*, or *Other*, automatically paired with dynamic category visuals.
* **Personalized Dashboard:** A user dashboard allowing logged-in members to view and manage their created posts with full CRUD capabilities.
* **Comment System:** Interactive comment section with nested layout styling, avatar icons, and author deletion rights.
* **Responsive Bootstrap UI:** Built with Bootstrap 5 cards, flexbox layouts, custom logo gradient effects, and responsive navigation.
---

### Tech Stack

* **Frontend:** React.js (Vite), React Router v7, Bootstrap 5, Custom CSS3
* **Backend:** Python, Django, Django REST Framework, SimpleJWT
* **Database:** SQLite / PostgreSQL
* **Authentication:** JSON Web Tokens (JWT)

### Prerequisites

Before running this project locally, ensure you have the following installed:
* Python (v3.10 or higher)
* Node.js (v18 or higher)
* `pip` and `virtualenv`

---

### **Installation and Setup**

- This project uses a decoupled architecture with separate frontend and backend setup.

- To run locally on your device 


## Frontend 

### 1. Clone the repository
The frontend link --> [Postz_frontend](https://github.com/fadhel-s-hashem/Postz_frontend)
```bash
git clone https://github.com/fadhel-s-hashem/Postz_frontend
cd Postz_frontend
```
### 2. Install dependencies
```bash
npm i
```
### 3. create .env file
```
VITE_BACK_END_SERVER_URL=http://localhost:8000
```
### 4. Start application
```
npm run dev
```

## Backend
### 1. Clone the repository
The backend link --> [Postz-backend](https://github.com/fadhel-s-hashem/Postz-backend)
```bash
git clone https://github.com/fadhel-s-hashem/Postz-backend
cd Postz-backend
```
### 2. Create and activate a virtual environment
on macOS
```
python3 -m venv .venv 
source .venv/bin/activate 
```
windows git bash: 
```
python -m venv .venv 
source .venv/Scripts/activate
```
### 3. Install dependencies
```
pip install -r requirements.txt
```
### 4. Run database migrations & Start server
```
python manage.py migrate
python manage.py runserver
```
## Access the App
**Open your browser and navigate to `http://localhost:5173`**

## Future Enhancements

- Search bar and multi-category filtering on the main feed.
- Post upvoting and downvoting mechanics.
- Profile customization (avatar upload and bio section).
- Real-time notifications for post comments.

## Credit

I would like to thank my instructors and instructional associates for the guidance and support