# Shams Plus Bank — Frontend

The React frontend for **Shams Plus Bank**, a full-stack banking web application. It provides a web interface for user registration and authentication, account management, card operations, money transfers, mobile recharge, and transaction history.

The frontend communicates with the [Shams Plus Node.js backend](https://github.com/nimash79/shams_plus-nodejs) through HTTP API requests.

## Demo

### Home 1
![Screenshot (5)](https://github.com/user-attachments/assets/9ce80618-9142-4160-84db-3ce928a59ec4)

### Home 2
![Screenshot (6)](https://github.com/user-attachments/assets/24d33dc8-0a2d-4152-b66b-13b3f23dca43)

### Login
![Screenshot (7)](https://github.com/user-attachments/assets/e7807b8b-96e9-4b1b-b3b4-2f3d775dae82)

### Dashboard
![Screenshot (9)](https://github.com/user-attachments/assets/969abfa4-0d8a-4dc1-a430-693fc8f0f72b)

### View Bank Account
![Screenshot (10)](https://github.com/user-attachments/assets/88f85252-d4b0-44a1-9506-0b5771596d87)

## Features

### Authentication
- User registration and login.
- Logout.
- Password recovery and reset workflows.
- Password changes.
- JWT-based session restoration using a stored token.

### Banking Dashboard
- User dashboard.
- Bank-account opening.
- Account and card information.
- Card-to-card money transfers.
- Mobile recharge.
- Card blocking.
- Transaction history.

### Additional Pages
- Home page and informational pages.
- About Us.
- Contact Us.
- User guide.

### User Interface
- React component-based architecture.
- Client-side routing.
- Centralized state management with Redux Toolkit and React Redux.
- HTTP requests with Axios.
- Toast notifications for user feedback.
- Calendar components and Jalali-date utilities.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | User interface |
| JavaScript | Application logic |
| React Router | Client-side navigation |
| Redux Toolkit | State management |
| React Redux | Redux integration |
| Axios | HTTP API requests |
| JWT Decode | Reading token information |
| Moment.js and Jalali Moment | Date handling |
| React Toastify | Notifications |
| Create React App | Development server and production build |

## Application Pages

The application defines routes for the following pages:

| Route | Page |
|---|---|
| `/` | Home |
| `/login` | Login |
| `/register` | Registration |
| `/logout` | Logout |
| `/forget-password` | Password recovery |
| `/dashboard` | User dashboard |
| `/change-password` | Change password |
| `/open-account` | Open a bank account |
| `/view-account` | View account information |
| `/transfer` | Card-to-card transfer |
| `/charge` | Mobile recharge |
| `/block` | Card blocking |
| `/transactions` | Transaction history |
| `/about-us` | About Us |
| `/contact-us` | Contact Us |
| `/guide` | User guide |

Some banking pages require an authenticated user or an existing bank account.

## Screenshots

### Home Page

![Shams Plus home page](https://github.com/user-attachments/assets/9ce80618-9142-4160-84db-3ce928a59ec4)

### Alternative Home Page

![Shams Plus alternative home page](https://github.com/user-attachments/assets/24d33dc8-0a2d-4152-b66b-13b3f23dca43)

### Login

![Shams Plus login page](https://github.com/user-attachments/assets/e7807b8b-96e9-4b1b-b3b4-2f3d775dae82)

### Dashboard

![Shams Plus dashboard](https://github.com/user-attachments/assets/969abfa4-0d8a-4dc1-a430-693fc8f0f72b)

### Bank Account

![Shams Plus bank account page](https://github.com/user-attachments/assets/88f85252-d4b0-44a1-9506-0b5771596d87)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm.
- The [Shams Plus backend](https://github.com/nimash79/shams_plus-nodejs) configured and running.

### 1. Clone the repository

```bash
git clone https://github.com/nimash79/shams_plus-reactjs.git
cd shams_plus-reactjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend connection

Ensure the frontend's API requests point to the address where the Node.js backend is running.

For local development, the backend may be available at:

```text
http://localhost:5000
```

The backend's default CORS configuration permits requests from `http://localhost:3000`. If either application uses a different origin or port, adjust the backend's CORS configuration and the frontend API configuration as needed.

### 4. Start the development server

```bash
npm start
```

Create React App starts the development server, typically at:

```text
http://localhost:3000
```

Open that address in your browser.

## Available Scripts

Run these commands from the frontend project directory.

| Command | Description |
|---|---|
| `npm start` | Start the development server |
| `npm test` | Run the configured test runner |
| `npm run build` | Create an optimized production build |
| `npm run eject` | Eject the Create React App configuration; this is a one-way operation |

## Running the Full Application

Run the backend and frontend in separate terminals.

**Terminal 1 — Backend**

```bash
git clone https://github.com/nimash79/shams_plus-nodejs.git
cd shams_plus-nodejs
npm install
npm start
```

Configure the backend `.env` file and MongoDB connection before starting the server.

**Terminal 2 — Frontend**

```bash
git clone https://github.com/nimash79/shams_plus-reactjs.git
cd shams_plus-reactjs
npm install
npm start
```

After both applications are running, open `http://localhost:3000` and verify that the frontend can communicate with the backend.

## State Management and Authentication

Redux Toolkit and React Redux manage shared frontend state. On application startup, the frontend checks local storage for a token and attempts to restore the user state by decoding it.

Decoding a JWT does not, by itself, validate the token's authenticity. The backend must verify the token and enforce authorization for protected operations.

## Production Build

Generate a production build with:

```bash
npm run build
```

The resulting static assets can be deployed to a static web host or served through an appropriate web server. Configure the production API address and backend CORS policy for the actual deployment environment.

## Security Considerations

- Do not store sensitive financial information or secret keys in frontend code.
- Treat browser storage as accessible to JavaScript running on the page.
- Use HTTPS in production.
- Keep authorization and validation on the backend; hiding a page in the frontend is not an authorization mechanism.
- Configure API endpoints and CORS for the deployment environment.
- Review token expiration and logout behavior.
- Test all banking workflows against the backend before release.

## Contributing

1. Fork the repository.
2. Create a branch for your change.
3. Implement and test the change.
4. Submit a pull request describing the modification.

## License

The repository README indicates the MIT License. See the repository's license information for the applicable terms.
