import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ThemeProvider } from './app/providers/ThemeProvider';
import GlobalFallback from './components/ui/error/LocalFallback';
import store from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ErrorBoundary FallbackComponent={GlobalFallback}>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
