const styles = theme => {
  return {
    container: {
      minHeight: 60 - 2,
      minWidth: 60,
      transition: 'border-color 0.3s ease-in',
      borderBottom: `2px solid transparent`,
      '&:hover': {
        borderBottom: `2px solid ${theme.slexUi.header.color}`
      }
    },
    active: {
      borderBottom: `2px solid ${theme.slexUi.header.color}`
    },
    right: {
      marginLeft: 'auto'
    },
    button: {
      minHeight: 60 - 2,
      minWidth: 60,
      backgroundColor: 'inherit',
      paddingLeft: theme.slexUi.header.buttonPadding,
      paddingRight: theme.slexUi.header.buttonPadding,
      paddingBottom: 0,
      color: theme.slexUi.header.color
    },
    label: {
      color: theme.typography.primaryTextColor,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.slexUi.header.fontSize,
      lineHeight: `${theme.slexUi.header.lineHeight}px`
    }
  }
}

export default styles
