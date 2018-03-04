const styles = theme => {
  return {
    container: {
      height: '100%',
      padding: `0 ${theme.slexUi.sidebar.width}px 0 ${theme.slexUi.sidebar.width}px`,
      display: 'flex',
      flexDirection: 'row'
    },
    topContent: {
      paddingLeft: `${theme.spacing.unit * 2}px`,
      paddingRight: `${theme.spacing.unit * 2}px`
    },
    centerContent: {
      paddingLeft: `${theme.spacing.unit * 2}px`,
      paddingRight: `${theme.spacing.unit * 2}px`,
      display: 'flex',
      flexDirection: 'column'
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    },
    sidebarContentOpen: {
      backgroundColor: '#ffeede'
    },
    sidebarContent: {
      transition: 'background-color 200ms ease-in-out',
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%'
    },
    leftContent: {
      flex: 1
    },
    rightContent: {
      flex: 1
    },
    bottomContent: {
      paddingLeft: `${theme.spacing.unit * 2}px`,
      paddingRight: `${theme.spacing.unit * 2}px`,
      display: 'flex',
      flexDirection: 'column'
    }
  }
}

export default styles
