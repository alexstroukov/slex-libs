import { createMuiTheme } from 'material-ui/styles'

const typography = {
  primaryTextColor: '#212121',
  secondaryTextColor: '#636363',
  errorTextColor: '#e55c5c',
  fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
  button: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 400,
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif'
  }
}

const spacing = {
  unit: 8
}

const palette = {
  primary: {
    '50': '#fdeee1',
    '100': '#fbd4b5',
    '200': '#f8b783',
    '300': '#f59a51',
    '400': '#f2852c',
    '500': '#f06f07',
    '600': '#ee6706',
    '700': '#ec5c05',
    '800': '#e95204',
    '900': '#e54002',
    'A100': '#ffffff',
    'A200': '#ffe1d9',
    'A400': '#ffb9a6',
    'A700': '#ffa58c',
    'contrastDefaultColor': 'light'
  }, // Purple and green play nicely together.
  secondary: {
    '50': '#f3fafd',
    '100': '#e2f2fb',
    '200': '#cfe9f8',
    '300': '#bce0f5',
    '400': '#addaf3',
    '500': '#9fd3f1',
    '600': '#97ceef',
    '700': '#8dc8ed',
    '800': '#83c2eb',
    '900': '#72b7e7',
    'A100': '#ffffff',
    'A200': '#ffffff',
    'A400': '#fcfeff',
    'A700': '#e2f3ff',
    'contrastDefaultColor': 'light'
  },
  ternary: {
    '500': '#fce89d'
  },
  error: {
    '50': '#fcebeb',
    '100': '#f7cece',
    '200': '#f2aeae',
    '300': '#ed8d8d',
    '400': '#e97474',
    '500': '#e55c5c',
    '600': '#e25454',
    '700': '#de4a4a',
    '800': '#da4141',
    '900': '#d33030',
    'A100': '#ffffff',
    'A200': '#ffe4e4',
    'A400': '#ffb1b1',
    'A700': '#ff9797',
    'contrastDefaultColor': 'light'
  }
}

const header = {
  fontSize: 12,
  lineHeight: 12,
  color: palette.primary['500'],
  buttonPadding: spacing.unit * 2
}

const pageIcon = {
  
}

const iconButton = {
  size: spacing.unit * 4
}

const badge = {
  size: 12,
  color: palette.primary['A100']
}

const roundButton = {
  size: spacing.unit * 4
}

const blockButton = {

}

const toolbar = {

}

const sidebar = {
  width: 200,
  fontSize: 14,
  lineHeight: 14,
  iconSize: 17,
  buttonSize: spacing.unit * 4,
  buttonPadding: spacing.unit * 2
}

const grid = {
  gutter: spacing.unit
}

const gridTileLabel = {
  size: 12,
  textTransform: 'uppercase',
  fontWeight: 700,
  fontFamily: typography.fontFamily,
  color: typography.secondaryTextColor
}

const theme = createMuiTheme({
  slexUi: {
    sidebar,
    header,
    iconButton,
    roundButton,
    badge,
    grid,
    gridTileLabel
  },
  typography,
  palette,
  spacing
})

export default theme
