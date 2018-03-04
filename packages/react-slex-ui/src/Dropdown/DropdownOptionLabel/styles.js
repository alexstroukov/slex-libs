const styles = theme => {
  return {
    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    one: {
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0',
      animation: 'dot 1.3s infinite',
      animationDelay: '0.0s',

      backgroundColor: 'black',
      borderRadius: '50%',
      height: 3,
      width: 3,
      marginRight: 3
    },
    two: {
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0',
      animation: 'dot 1.3s infinite',
      animationDelay: '0.2s',

      backgroundColor: 'black',
      borderRadius: '50%',
      height: 3,
      width: 3,
      marginRight: 3
    },
    three: {
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0',
      animation: 'dot 1.3s infinite',
      animationDelay: '0.3s',

      backgroundColor: 'black',
      borderRadius: '50%',
      height: 3,
      width: 3
    },
    '@keyframes dot': {
      '0%': { opacity: 0.25 },
      '50%': { opacity: 0.5 },
      '100%': { opacity: 1 }
    }
  }
}

export default styles
