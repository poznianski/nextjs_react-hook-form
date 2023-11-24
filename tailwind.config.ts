import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      dark: '#1E1E27',
      darkDim: '#15161b',
      greyLight: '#313442',
      grey: '#30313C',
      greyDelete: '#272934',
      categoryBg: '#24252E',
      categoryBorder: '#323443',
      whiteDark: '#696969',
      white: '#9B9D9F',
      whiteSuper: '#FFFFFF',
      purple: '#884DFE',
      green: '#45CB54',
      red: '#FF5B5B',
    },
    fontSize: {
      '32': '2rem',
      '24': '1.5rem',
      '20': '1.25rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-purple':
          'linear-gradient(104deg, #A139FD 11.26%, #50BDFC 90.79%)',
        'gradient-purple-reversed':
          'linear-gradient(104deg, #50BDFC 11.26%, #A139FD 90.79%)',
      },
      spacing: {
        '3.75': '0.9375rem',
        '18': '1.125rem',
      },
    },
  },
  plugins: [],
}
export default config
