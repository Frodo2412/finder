import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateRows: {
        'register-form': '70px 70px 70px 70px 80px',
      },
      backgroundColor: {
        azulHeader: '#242760',
      },
      textColor: {
        whiteTextHeader: '#FAFAFA',
        iconTextHeader: '#A0A0A0',
        inputTextColor: '#a0a0a0',
      },
    },
  },
  plugins: [],
};
export default config;
