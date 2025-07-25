import React from 'react';
import LoaderWrapper from './components/LoaderWrapper';
import AnimatedContent from './components/AnimatedContent';
import NavBar from './components/Navbar';
import { AppProvider } from './contexts/AppContext';

// Keep the original webContext for backward compatibility
export const webContext = React.createContext(null);

const App = () => {
  return (
    <AppProvider>
      <LoaderWrapper>
        <NavBar />
        <AnimatedContent />
      </LoaderWrapper>
    </AppProvider>
  );
};

export default App;
