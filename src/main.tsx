import { StrictMode } from 'react';

import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { antdLocale } from './shared/config/antd-locale';
import GlobalFallback from './shared/ui/error-fallback/LocalFallback';
import store from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={antdLocale}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <ErrorBoundary FallbackComponent={GlobalFallback}>
              <App />
            </ErrorBoundary>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
