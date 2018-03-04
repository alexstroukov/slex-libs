const styles = theme => {
  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: '0',
      margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`
    },
    title: {
      marginRight: theme.spacing.unit * 2,
      position: 'relative',
      flex: 1
    },
    toolbar: {
      flex: 1,
      justifyContent: 'flex-end',
      display: 'flex'
    }
  }
}

export default styles
