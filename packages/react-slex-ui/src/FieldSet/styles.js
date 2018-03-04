const styles = theme => {
  return {
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column'
    },
    label: {
      color: theme.typography.primaryTextColor,
      textTransform: 'uppercase',
      fontWeight: '400',
      fontFamily: theme.typography.fontFamily,
      fontStyle: 'normal',
      fontSize: '10px',
      lineHeight: '24px',
      minHeight: '24px'
    },
    field: {
      flex: 1
    },
    message: {
      opacity: 1,
      transition: 'opacity .2s ease-out',
      // color: theme.palette.error['500'],
      // lineHeight: '24px',
      // minHeight: '24px',
      // fontSize: '10px',
      // fontWeight: '400',
      // fontFamily: theme.typography.fontFamily,
      // fontStyle: 'normal'
    }
  }
}

export default styles
