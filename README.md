# Coffe Sho Project Using Express JS

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) ![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square) ![Version](https://img.shields.io/badge/Version-1.0.0-green?style=flat-square) ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)

> A personal project built with Express.js, utilizing PostgreSQL as the database, and managed with npm. This project serves as a foundation for exploring the capabilities of Express.js in a real-world application.

## 📋 Table of Contents

1. [Description](#L35)

2. [Demo/Screenshots](#L39)

3. [Features](#L43)

4. [Tech Stack](#L51)

5. [Project Structure](#L60)

6. [Prerequisites](#L71)

7. [Installation](#L79)

8. [Usage](#L97)

9. [Contributing](#L101)

10. [License](#L105)

## 📄 Description

This project is api for web coffee shop building with popular and scalable thecnology like express js and postgresql

## 📸 Demo/Screenshots

Unfortunately, there are no demo GIFs or screenshots available for this project. However, you can explore the project's features and capabilities by installing and running it locally.

## ✨ Major Features

- Authentication
- CRUD Products, Users and Orders
- End Point for every page landing page etc
- Middleware user / admin

## 🛠️ Tech Stack

The project relies on the following technologies:

- **JavaScript**: As the primary programming language.
- **Node JS**: As the runtime for Javascript.
- **Express.js**: As the web framework.
- **PostgreSQL**: As the database management system.
- **npm**: As the package manager.

## 🏗️ Project Structure

```markdown

express/
├── .env
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
└── src/
    ├── app.js
    ├── main.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── browseProduct.controller.js
    │   ├── landingPage.controller.js
    │   └── user.controller.js
    ├── hit.http/
    ├── lib/
    │   ├── db.js
    │   ├── hash.js
    │   └── jwt.js
    ├── middleware/
    │   └── auth.middleware.js
    ├── models/
    │   ├── browseProduct.models.js
    │   ├── landingPage.models.js
    │   └── users.models.js
    └── routes/
        ├── admin/
        │   └── users.routes.js
        ├── admin.routes.js
        ├── docs.routes.js
        ├── public/
        │   ├── auth.routes.js
        │   ├── browseProduct.routes.js
        │   └── landingPage.routes.js
        ├── public.routes.js
        └── users

```

## 📝 Prerequisites

Before installing and running the project, ensure you have the following:

- Node.js installed on your system.
- npm (the package manager for Node.js) installed.
- PostgreSQL installed and configured.

## 📦 Installation

To install the project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/AbiPasundan/koda-b6-backend-node.git

# Navigate to the project directory
cd koda-b6-backend-node

# Install dependencies
npm i

# Start the application
npm run node
```

## 💻 Usage

To use the project, simply navigate to `http://localhost:3000` in your web browser. You can interact with the application through the provided API endpoints.

## 🤝 Contributing

Contributions are welcome and appreciated. To contribute, please fork the repository, make your changes, and submit a pull request. Ensure your changes align with the project's goals and guidelines.

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
