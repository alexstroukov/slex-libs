const styles = theme => {
  return {
    container: {
      height: '100%',
      padding: `0 ${theme.slexUi.sidebar.width}px 80px ${theme.slexUi.sidebar.width}px`
    },
    centerContent: {
      display: 'flex',
      flexDirection: 'row'
    },
    leftContent: {
      flex: 1
    },
    rightContent: {
      flex: 1
    },
    bottomContent: {

    }
  }
}

export default styles
