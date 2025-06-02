import { createTheme, Theme } from '@mui/material/styles';

// Material UI v7 호환 테마 생성 함수
const createV7Theme = (config: any) => createTheme({
  cssVariables: true, // v7의 CSS Variables 활성화
  ...config,
});

// 기본 라이트 테마
export const lightTheme = createV7Theme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// 다크 테마
export const darkTheme = createV7Theme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// 그린 테마 (자연/환경)
export const greenTheme = createV7Theme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
      light: '#60ad5e',
      dark: '#005005',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
});

// 퍼플 테마 (크리에이티브)
export const purpleTheme = createV7Theme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7b1fa2',
      light: '#ae52d4',
      dark: '#4a0072',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

// 오렌지 테마 (에너지/스타트업)
export const orangeTheme = createV7Theme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ed6c02',
      light: '#ff9d3f',
      dark: '#b53d00',
    },
    secondary: {
      main: '#0288d1',
    },
  },
});

// 인디고 테마 (기업/프로페셔널)
export const indigoTheme = createV7Theme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: '#ff5722',
    },
  },
});

// 틸 테마 (의료/헬스케어)
export const tealTheme = createV7Theme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00695c',
      light: '#439889',
      dark: '#003d33',
    },
    secondary: {
      main: '#ff7043',
    },
  },
});

// 모든 테마를 객체로 export
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  green: greenTheme,
  purple: purpleTheme,
  orange: orangeTheme,
  indigo: indigoTheme,
  teal: tealTheme,
} as const;

export type ThemeName = keyof typeof themes;

// 테마 이름과 설명
export const themeDescriptions = {
  light: 'Default Light Theme',
  dark: 'Dark Theme',
  green: 'Nature & Environment',
  purple: 'Creative & Artistic',
  orange: 'Energy & Startup',
  indigo: 'Corporate & Professional',
  teal: 'Medical & Healthcare',
} as const;

// 안전한 테마 가져오기 함수
export const getTheme = (themeName: ThemeName = 'light'): Theme => {
  const theme = themes[themeName];
  if (!theme) {
    console.warn(`Theme "${themeName}" not found, falling back to light theme`);
    return lightTheme;
  }
  return theme;
};
