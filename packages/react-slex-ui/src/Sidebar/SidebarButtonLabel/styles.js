const styles = theme => {
  return {
    container: {
      width: '100%',
      padding: `0 0 0 ${theme.spacing.unit * 2}px`
    },
    text: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.slexUi.sidebar.fontSize,
      lineHeight: `${theme.slexUi.sidebar.lineHeight}px`,
      width: 100
    }
  }
}

export default styles
