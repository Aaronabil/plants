#  Yestera Web App

![Hero Screenshot](./public/images/hero/image.png)

Yestera is a web-based e-commerce platform that focuses on selling various types of indoor and outdoor plants. 
Built using **Laravel**, **Inertia.js (React + TypeScript)**, and **Supabase** — combining a powerful backend with a modern frontend and a scalable database.

---

##  Tech Stack

| Layer         | Technology                      | Description                                       |
|---------------|---------------------------------|---------------------------------------------------|
| **Backend**   | Laravel                         | PHP framework for RESTful API and business logic  |
| **Frontend**  | Inertia.js (React + TypeScript) | Creates a seamless single-page app experience     |
| **Database**  | Supabase (PostgreSQL)           | Managed PostgreSQL database                       |
| **Bundler**   | Vite                            | Fast frontend build tooling                       |
| **Styling**   | Tailwind CSS + shadcn/ui        | Modern and responsive UI components               |
| **Auth**      | Laravel Breeze                  | Secure user authentication scaffolding            |
| **Icons**     | Lucide React                    | Clean, lightweight SVG icon set                   |

---

> [!TIP]
> This project uses a monolithic architecture where Laravel and React are tightly integrated.  
> Inertia.js acts as the glue, allowing you to build a modern frontend without the complexity of a separate API.

---

##  Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Aaronabil/plants.git
cd plants
```

### 2. Setup Environment
- Copy the example environment file and generate an application key.
```bash
cp .env.example .env
php artisan key:generate
```
- Find your database connection details in your Supabase project settings (`Settings` > `Database`).
- Update the following variables in your `.env` file with your Supabase credentials:
```env
DB_CONNECTION=pgsql
DB_HOST=[Your-Supabase-Host]
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=[Your-Supabase-Password]
```

### 3. Install Dependencies
- Install PHP (backend) and Node.js (frontend) dependencies.
```bash
composer install
npm install
```

### 4. Run Database Migrations
- Apply the database schema to your Supabase database.
```bash
php artisan migrate
```

### 5. Run the Development Servers
- Run the Vite frontend server and the Laravel backend server in two separate terminals.

- **Terminal 1 (Frontend):**
```bash
npm run dev
```

- **Terminal 2 (Backend):**
```bash
php artisan serve
```
- The application will be available at `http://127.0.0.1:8000`.

---

##  Features

> [!NOTE]
> Features are currently under development and will be listed here soon.

---

##  Project Status

 Active Development — new features coming soon!  
 Currently improving profile editing and transaction history UI.

---
> [!Note]  
> This project is a **full-stack Laravel application** with a modern twist.
> Laravel handles the entire backend, from routing to business logic.
> Supabase provides a powerful, scalable PostgreSQL database.
> Inertia.js and React power the frontend, creating a responsive and dynamic user interface.

##  Author
Aaronabil, IsFaktuear, Alyysour.
- Ahmad Muqarrobin (242502040003)
- Muhamad Nabil Faiz Amarullah (242502040042)
- Alyssa Nurul Hidayat (242502040081)

---

[MIT](./LICENSE) License © 2025-PRESENT [Yestera Project](https://github.com/Aaronabil/plants)
