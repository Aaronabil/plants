# 🌿 Plants App

A modern plant-themed dashboard for managing profiles, purchase history, and delivery tracking — built with Laravel, Inertia.js, React, and shadcn/ui.

---

## 🚀 Features

 **Profile Management** — view and edit personal details such as name, email, and address.  
 **Transaction History** — display purchase records with status and date.  
 **Order Progress Tracker** — show delivery status visually from *Pending* → *Delivered*.  
 **Responsive Design** — optimized for desktop and mobile.  
 **Modern UI Components** — powered by [shadcn/ui](https://ui.shadcn.com) and [Lucide Icons](https://lucide.dev).

---

##  Tech Stack

| Layer        | Technology                              |
|--------------|------------------------------------------|
| **Backend**  | Laravel 11 (PHP 8+)                      |
| **Frontend** | React + TypeScript                       |
| **Routing**  | Inertia.js                               |
| **UI Kit**   | shadcn/ui + Tailwind CSS                 |
| **Icons**    | Lucide React                             |
| **Database** | MySQL / SQLite (configurable)            |

---

##  Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/Aaronabil/plants.git
   cd plants
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Copy environment file and generate key**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Run database migrations**
   ```bash
   php artisan migrate
   ```

6. **Run development servers**
   ```bash
   npm run dev
   php artisan serve
   ```

Then open your browser at →  
 **http://localhost:8000**

---

##  Project Structure

```
resources/
└── js/
    ├── Pages/
    │   └── Profile/
    │       ├── Edit.tsx
    │       ├── PersonalDetails.tsx
    │       ├── TransactionHistory.tsx
    │       └── OrderProgress.tsx
    └── Components/
        └── ui/
            ├── button.tsx
            ├── card.tsx
            ├── dialog.tsx
            └── input.tsx
```

---

##  Preview

| Profile Page | Order Progress | Transaction History |
|---------------|----------------|----------------------|
| ![Profile](docs/screenshots/profile.png) | ![Progress](docs/screenshots/progress.png) | ![Transactions](docs/screenshots/transactions.png) |

>  *You can place screenshots under `docs/screenshots/`.*

---

##  Roadmap

- [ ] Add profile picture upload  
- [ ] Implement real transaction data from backend  
- [ ] Add dark mode support  
- [ ] Add search & filter for history list  
- [ ] API integration for live order updates  

---

##  Credits

- [Laravel](https://laravel.com)  
- [Inertia.js](https://inertiajs.com)  
- [React](https://react.dev)  
- [shadcn/ui](https://ui.shadcn.com)  
- [Lucide Icons](https://lucide.dev)

---

##  Author

**Aaronabil**  
Full-stack Developer  
 [GitHub Profile](https://github.com/Aaronabil)

---

##  License

Distributed under the **MIT License**.  
See [`LICENSE`](LICENSE) for more information.
