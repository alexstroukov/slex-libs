const styles = theme => {
  return {
    container: {
      flexDirection: 'row',
      display: 'flex',
      height: '100%'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0.5',
      flexDirection: 'column',
      padding: '50px'
    },
    title: {
      fontSize: '22px'
    },
    subtitle: {
      fontSize: '31px',
      fontWeight: '200'
    }
  }
}

export default styles
