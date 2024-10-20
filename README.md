---

Rule Engine Project

This project consists of a Rule Engine backend and a React frontend built with Vite. The backend handles the rule processing logic, while the frontend provides an interactive user interface for users to interact with the engine.

Folder Structure

```
rule-engine/
├── rule-engine-backend/       # Backend application
│   ├── config/                # Configuration files
│   ├── controllers/           # Controller logic for handling requests
│   ├── models/                # Mongoose models for MongoDB
│   ├── node_modules/          # Contains all npm dependencies
│   ├── routes/                # API route definitions
│   ├── .env                   # Environment variables
│   ├── package-lock.json      # npm package lock file
│   ├── package.json           # npm package file with dependencies and scripts
│   └── server.js              # Main entry point for the backend application
│
└── rule-engine-frontend/      # Frontend application
    ├── node_modules/          # Contains all npm dependencies
    ├── public/                # Static assets and public files
    │   └── index.html         # Main HTML file
    ├── src/                   # Main source code for the application
    │   ├── assets/            # Images and other static assets
    │   ├── components/        # React components for the application
    │   ├── config/            # Configuration files
    │   └── redux/             # Redux setup and store management
    ├── .gitignore             # Files and directories to be ignored by Git
    ├── eslint.config.js       # ESLint configuration file
    ├── index.html             # Entry point for the application
    ├── package-lock.json      # npm package lock file
    ├── package.json           # npm package file with dependencies and scripts
    ├── postcss.config.js      # PostCSS configuration file
    ├── tailwind.config.js     # Tailwind CSS configuration file
    └── vite.config.js         # Vite configuration file
```

Getting Started

Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

Installation

1. Clone the repository:

   ```
   git clone https://github.com/mohammadamanpatel/Rule-Engine/
   cd rule-engine
   ```

2. For the backend, navigate to the backend directory and install the dependencies:

   ```
   cd rule-engine-backend
   npm install
   ```

3. For the frontend, navigate to the frontend directory and install the dependencies:

   ```
   cd ../rule-engine-frontend
   npm install
   ```

Running the Applications

Backend

To start the backend server, ensure your MongoDB instance is running, and use the following command:

```
npm start
```

This will start the backend server on the port specified in the `.env` file.

Frontend

To start the frontend development server, navigate to the frontend directory and use the following command:

```
npm run dev
```

This will start the application on [http://localhost:5173]. You can view it in your web browser.

Building for Production

Backend

To build the backend for production, make sure you have set the appropriate environment variables in the `.env` file. Then, you can run:

```
npm run build
```

Frontend

To build the frontend application for production, run:

```
npm run build
```

This command will create an optimized production build in the `dist` folder.

Linting

To check for linting errors for both frontend and backend, use the following commands:

Frontend:

```
npm run lint
```

Backend (if you have a lint script in the backend `package.json`):

```
npm run lint
```

Previewing the Build

Frontend

To preview the production build locally, run:

```
npm run preview
```

Environment Variables

To run the backend, create a `.env` file in the `rule-engine-backend` directory with the following content:

```
PORT=process.env.PORT (.env credential)
MONGO_URL=process.env.MONGO_URL (.env credential)
```

- `PORT`: The port where the backend server will run.
- `MONGO_URL`: The MongoDB connection string. If using a cloud database, update this with your MongoDB Atlas URI.

MongoDB & Mongoose Setup

This project uses MongoDB as the database, with Mongoose for schema definitions and managing the database connection. You can set it up as follows:

1. Install and run MongoDB locally, or use a cloud database provider such as MongoDB Atlas.
2. Make sure the database URL is correctly set in the `.env` file as `DATABASE_URL`.
3. The `DbConnection.js` file present in rule-engine-backend/config/DbConnection.js contains the Mongoose connection logic:

```javascript
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const DBConnection = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URL
        );
        if (connection) {
            console.log('yes DB is connected', connection.host);
        }
    }
    catch (e) {
        console.log(e);
        process.exit(1)
    }
}
```

After setting up MongoDB, you can run the backend, and Mongoose will automatically handle connecting to the database and applying any schema logic.

Sample Schema

Here’s an example of a Mongoose schema used in the project:

```javascript
const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  conditions: { type: Array, required: true },
  actions: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Rule', RuleSchema);
```

This schema defines a "Rule" with fields for the rule name, conditions, and actions, along with automatic timestamps.

Design Choices

Technologies Used

- Backend: The backend is built using Node.js and Express to handle the rule processing and API requests. MongoDB with Mongoose is used as the database for storing rules and user data.
- Frontend: The frontend is developed using React with Vite for fast development and bundling. Redux is used for state management.
- Rule Engine: The core logic for processing rules is handled on the backend. Each rule is parsed and evaluated dynamically based on user-defined conditions.

Rule Engine Structure

The rule engine is designed to be modular and flexible. Rules are represented as Abstract Syntax Trees (ASTs) to allow for easy modification and parsing of complex expressions. This allows the system to handle validations, complex conditions, and extensions in a scalable way.

- Validation: We have implemented attribute validations and checks to ensure only valid rules are created.
- Error Handling: Error handling mechanisms are in place to capture and respond to invalid rule strings or data formats.

Additional Considerations

- The system is designed to support future extensions, such as adding user-defined functions within the rule engine. This can be done by extending the AST parser.
- Rules can be modified or deleted using dedicated API routes.

Docker Setup

This project includes a `docker-compose.yml` file in both frontend and backend that sets up the necessary services, including the backend, frontend, and MongoDB. To run the application using Docker, follow these steps:

1. Make sure Docker is installed on your machine.
2. Run the following command to start the services:

```
docker-compose up --build
```

This will start the backend, frontend, and MongoDB containers. You can access the frontend at [http://localhost:5173](http://localhost:5173) and the backend API at [http://localhost:5000](http://localhost:5000).

Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. All contributions are welcome!

---

