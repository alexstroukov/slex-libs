
const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },
  cursor: {
    cursor: 'pointer'
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
})

export default styles
