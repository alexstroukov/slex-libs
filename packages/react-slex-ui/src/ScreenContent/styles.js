const fullHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const styles = theme => {
  return {
    container: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column'
    },
    content: {
      display: 'flex',
      width: '100%',
      minHeight: fullHeight - 60
    },
    childrenContainer: {
      width: '100%'
    },
    loaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
    loader: {
      width: 20,
      height: 20,
      minWidth: 20,
      minHeight: 20,
      marginBottom: 60,
      alignSelf: 'center'
    }
  }
}

export default styles
