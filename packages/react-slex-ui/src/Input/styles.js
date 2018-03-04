const styles = theme => {
  return {
    container: {
      width: '100%',
      transition: 'background-color 0.3s ease-out'
    },
    loading: {
      backgroundColor: '#ccc5c51a'
    },
    cursor: {
      cursor: 'default'
    },
    underlineShown: {
      width: '100%',
      position: 'absolute',
      height: '1px',
      bottom: '21px',
      transition: 'background-color 200ms ease-in-out',
      backgroundColor: 'transparent'
    },
    underlineHidden: {
      width: '100%',
      position: 'absolute',
      height: '1px',
      bottom: '21px',
      transition: 'background-color 200ms ease-in-out',
      backgroundColor: 'white'
    }
  }
}

export default styles
