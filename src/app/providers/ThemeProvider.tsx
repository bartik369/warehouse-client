import { PropsWithChildren, useEffect, useState } from 'react';

import '@/app/styles/themes/dark.css';
import '@/app/styles/themes/light.css';

type Theme = 'light' | 'dark';
const THEME_KEY = 'app-theme';

function getInitialTheme(): Theme {
  const selectedTheme = localStorage.getItem(THEME_KEY);
  return selectedTheme === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme] = useState<Theme>(getInitialTheme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return children;
}
