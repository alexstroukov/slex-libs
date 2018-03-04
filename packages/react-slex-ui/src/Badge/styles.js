const styles = theme => {
  return {
    container: {
      display: 'flex',
      width: theme.slexUi.badge.size,
      height: theme.slexUi.badge.size,
      minWidth: theme.slexUi.badge.size,
      minHeight: theme.slexUi.badge.size,
      background: '#9fd4f2',
      borderRadius: '50%'
    },
    icon: {
      color: theme.slexUi.badge.color,
      fontSize: theme.slexUi.badge.size
    }
  }
}

export default styles
