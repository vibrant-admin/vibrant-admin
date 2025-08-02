const light = {
  '--color-main': '0 0% 100%',
  '--color-main-foreground': '0 0% 11%',
  '--color-main-border': '240 6% 90%',

  '--color-secondary': '0 0% 95%',
  '--color-secondary-foreground': '0 0% 31%',
  '--color-secondary-border': '240 6% 90%',

  '--color-tertiary': '359 0% 92%',
}

const dark = {
  '--color-main': '0 0% 0%',
  '--color-main-foreground': '0 0% 11%',
  '--color-main-border': '0 0% 80%',

  '--color-secondary': '0 0% 18%',
  '--color-secondary-foreground': '0 0% 80%',
  '--color-secondary-border': '0 0% 41%',

  '--color-tertiary': '0 0% 52%',
}

export default {
  default: {
    light: {
      ...light,
    },
    dark: {
      ...dark,
    },
  },
}
