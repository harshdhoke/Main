import React, { Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
// import MusicLibrary from 'musicLibrary/MusicLibray';

// Lazy load the Music Library micro frontend
const MusicLibrary = React.lazy(() => import('musicLibrary/MusicLibrary'));

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <MusicLibrary user={user} />
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;