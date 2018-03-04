const styles = theme => {
  return {
    container: {
      display: 'flex',
      flex: 1,
      listStyle: 'none',
      
      padding: `${theme.slexUi.sidebar.buttonPadding}px ${theme.slexUi.sidebar.buttonPadding}px ${theme.slexUi.sidebar.buttonPadding}px ${theme.slexUi.sidebar.buttonPadding * 2}px`,
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: theme.slexUi.sidebar.buttonSize
    }
  }
}

export default styles
