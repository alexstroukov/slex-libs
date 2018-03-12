const styles = theme => {
  return {
    container: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    image: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      transition: 'opacity 600ms',
      opacity: 1
    },
    placeholderImage: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      transition: 'opacity 800ms',
      opacity: 1
    },
    hidden: {
      opacity: '0!important'
    },
    placeholder: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      opacity: 1,
      // backgroundColor: '#d6d5d5',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      transition: 'opacity 600ms',
      justifyContent: 'center'
    },
    icon: {
      color: '#939292'
    }
  }
}

export default styles
