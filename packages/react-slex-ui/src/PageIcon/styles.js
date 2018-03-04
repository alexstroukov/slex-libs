const styles = theme => {
  return {
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'inherit',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonWrapper: {
      borderRadius: '50%',
      backgroundColor: '#d6d5d5'
    },
    button: {
      display: 'flex',
      height: 40,
      width: 40,
      minHeight: 40,
      minWidth: 40,
      borderRadius: '50%',
      backgroundColor: 'inherit'
    },
    image: {
      height: 40,
      width: 40,
      minHeight: 40,
      minWidth: 40,
      borderRadius: '50%'
    }
  }
}

export default styles
