const styles = theme => {
  return {
    container: {
      display: 'flex',
      borderRadius: '2px',
      height: theme.slexUi.sidebar.lineHeight,
      minHeight: theme.slexUi.sidebar.lineHeight,
      width: theme.slexUi.sidebar.lineHeight,
      minWidth: theme.slexUi.sidebar.lineHeight,
      backgroundColor: '#939292'
    },
    dashed: {
      border: '1px dashed #f4f4f4',
      flex: 1,
      borderRadius: '2px'
    }
  }
}

export default styles
