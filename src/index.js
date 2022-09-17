import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </ChatContextProvider>
  </AuthContextProvider>
);
