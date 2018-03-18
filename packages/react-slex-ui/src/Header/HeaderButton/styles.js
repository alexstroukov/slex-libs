const styles = theme => {
  return {
    container: {
      minHeight: 60 - 2,
      minWidth: 60,
      position: 'relative'
    },
    active: {
      borderBottom: `2px solid ${theme.slexUi.headerButton.color}!important`
    },
    right: {
      marginLeft: 'auto'
    },
    button: {
      transition: 'border-color 0.3s ease-in',
      minHeight: 60 - 2,
      minWidth: 60,
      backgroundColor: 'inherit',
      paddingLeft: theme.slexUi.headerButton.buttonPadding,
      paddingRight: theme.slexUi.headerButton.buttonPadding,
      paddingBottom: 0,
      color: theme.slexUi.headerButton.color,
      borderBottom: `2px solid transparent`,
      '&:hover': {
        borderBottom: `2px solid ${theme.slexUi.headerButton.color}`
      }
    }
  }
}

export default styles
