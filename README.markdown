# Main (Music App Container)

A React-based container application that integrates the Music Library micro frontend via Module Federation. It provides a login interface and hosts the music library with role-based UI controls using mock JWT authentication.

## Table of Contents

- How to Run Locally
- How It Was Deployed
- Demo Credentials
- Micro Frontend Architecture
- Role-Based Authentication

## How to Run Locally

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Music Library micro frontend (from `https://github.com/harshdhoke/Music-Library`) running locally or deployed

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/harshdhoke/Main.git
   cd Main
   ```
2. **Install Dependencies**:

   ```bash
   npm install
   ```
3. **Build the Application**:

   ```bash
   npm run build
   ```
4. **Preview the Application**:

   ```bash
   npm run preview
   ```
   - The Main app runs on `http://localhost:4173/`.
5. **Access the Application**:
   - Open `http://localhost:4173/`.
   - The Music Library micro frontend will be loaded dynamically by the Main app.

## How It Was Deployed

The Main app is deployed as a static site on Netlify, dynamically loading the Music Library micro frontend.

### Deployment Steps

1. **Netlify Setup**:
   - Connected the `Main` repository to Netlify via the Netlify dashboard.
   - Set build command to `npm run build` and publish directory to `dist`.
2. **Module Federation Configuration**:
   - Configured Vite to consume the Music Library micro frontend:

     ```javascript
     import federation from "@originjs/vite-plugin-federation";
     export default {
       plugins: [
         federation({
           name: "main_app",
           remotes: {
             music_library: import.meta.env.VITE_MUSIC_LIBRARY_URL,
           },
           shared: ["react", "react-dom"],
         }),
       ],
     };
     ```
3. **Environment Variables**:
   - Set `VITE_MUSIC_LIBRARY_URL=https://music-library-finac-plus.netlify.app/remoteEntry.js` in Netlify’s dashboard.
4. **Automatic Deploys**:
   - Netlify deploys on pushes to the `main` branch.
5. **Production URL**:
   - Deployed at `https://main-finac-plus.netlify.app/`.

## Demo Credentials

The application uses mock JWT authentication stored in localStorage. Use these credentials to test role-based features:

### Admin

- **Email**: admin
- **Password**: admin123
- **Role**: Can add and delete songs in the Music Library.

### User

- **Email**: user
- **Password**: user123
- **Role**: Can view and filter songs in the Music Library.

To log in:

1. Access the Main app (`http://localhost:4173/` or deployed URL).
2. Enter the credentials in the login form.
3. The mock JWT will be stored in localStorage, controlling UI visibility in the Music Library.

## Micro Frontend Architecture

The Main app acts as a container, dynamically loading the Music Library micro frontend using Vite’s Module Federation plugin.

### How It Works

- **Module Federation**:
  - The Main app consumes the `MusicLibrary` component from the Music Library micro frontend.
  - Configuration in `vite.config.js`:

    ```javascript
    remotes: {
      music_library: import.meta.env.VITE_MUSIC_LIBRARY_URL,
    },
    shared: ["react", "react-dom"],
    ```
  - The `MusicLibrary` component is lazy-loaded at the `/library` route:

    ```jsx
    import { lazy } from "react";
    const MusicLibrary = lazy(() => import("music_library/MusicLibrary"));
    ```
- **Features**:
  - Provides a login interface and navigation.
  - Hosts the Music Library micro frontend in a container div.
  - Styled with Tailwind CSS for a responsive layout.
- **Integration**:
  - Loads the Music Library at `/library`.
  - Uses React Suspense for smooth lazy loading.
- **Benefits**:
  - Modular architecture allows independent updates to the Music Library.
  - Shared dependencies reduce bundle size.

### Example Flow

1. User navigates to `/library`.
2. Main app fetches `remoteEntry.js` from the Music Library’s URL.
3. The `MusicLibrary` component renders within the Main app.

## Role-Based Authentication

The application implements mock role-based authentication using in-memory JWTs stored in localStorage, with no backend.

### How It Works

- **Authentication**:
  - A login form in the Main app accepts email and password.
  - Mock JWTs are generated (e.g., as a JSON object) and stored in localStorage via Context API.
  - Example JWT payload:

    ```json
    {
      "email": "admin",
      "password": "admin123",
      "role": "admin"
    }
    ```
- **Authorization**:
  - The Main app passes the user role to the Music Library micro frontend via Context.
  - Music Library uses a `RoleGuard` to control UI:

    ```jsx
    import { useAuth } from './AuthContext';
    const RoleGuard = ({ roles, children }) => {
      const { user } = useAuth();
      return roles.includes(user?.role) ? children : null;
    };
    <RoleGuard roles={["admin"]}>
      <DeleteSongButton />
    </RoleGuard>
    ```
  - Admin: Can add/delete songs in the Music Library.
  - User: Can only view/filter songs.
- **State Management**:
  - Uses `useState` and Context API for user state.
- **Security**:
  - Mock JWTs are not validated (frontend-only).
  - Hardcoded credentials for demo purposes.

### Example Flow

1. User logs in via the Main app with `admin`.
2. Mock JWT with `role: "admin"` is stored in localStorage.
3. Music Library micro frontend shows add/delete buttons.
4. User role limits UI to view/filter only.