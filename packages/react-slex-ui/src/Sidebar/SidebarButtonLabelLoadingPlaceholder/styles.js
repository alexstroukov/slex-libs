const styles = theme => {
  return {
    container: {
      display: 'flex',
      height: theme.slexUi.sidebar.lineHeight,
      borderRadius: '2px',
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
