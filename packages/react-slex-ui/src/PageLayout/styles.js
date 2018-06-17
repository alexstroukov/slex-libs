const fullHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
const styles = theme => {
  return {
    container: {
      height: '100%',
      display: 'block',
      position: 'relative'
    },
    containerFullHeight: {
      minHeight: fullHeight
    },
    iconContainer: {
      zIndex: 1,
      margin: '10px 80px 10px 80px'
    },
    headerContainer: {
      flex: 1
    },
    sidebarContent: {
      height: '100%',
      width: '100%'
    },
    sidebarContainer: {
      top: '0',
      left: '0',
      width: theme.slexUi.sidebar.width,
      height: '100%',
      position: 'absolute'
    },
    horizontalContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    verticalContainer: {
      flex: 1,
      height: '100%',
      display: 'block',
      position: 'relative'
    },
    pageContainer: {
      width: '100%',
      marginBottom: '80px'
    },
    routeProgressVertical: {
      position: 'fixed',
      width: '100%',
      top: '0',
      height: '3px',
      lineHeight: '0px'
    },
    routeProgressHorizontal: {
      position: 'fixed',
      width: '100%',
      top: '0',
      height: '3px',
      lineHeight: '0px'
    }
  }
}

export default styles
