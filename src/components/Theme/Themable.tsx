import { ThemeProvider } from 'styled-components';

import { getTheme } from '~/utils';

interface ThemableProps {
  children: React.ReactNode;
}

export const Themable = ({ children }: ThemableProps) => {
  const theme = getTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
