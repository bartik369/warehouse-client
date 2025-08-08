import { StrictMode } from 'react'
import App from './App';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalFallback from './components/ui/error/LocalFallback';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
        <ErrorBoundary FallbackComponent={GlobalFallback}>
          <App />
        </ErrorBoundary>
        </BrowserRouter>
      </Provider>
  </StrictMode>
)
