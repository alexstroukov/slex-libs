const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary['500'],
      flexDirection: 'row',
      display: 'flex',
      height: '100%'
    },
    titleContainer: {
      flex: 0.5,
      flexDirection: 'column',
      padding: '50px'
    }
  }
}

export default styles
