const styles = theme => {
  return {
    container: {
      height: theme.slexUi.headerButtonLabel.size - 2,
      width: '100%',
      position: 'relative'
    },
    textContainer: {
      // position: 'absolute',
      backgroundColor: 'transparent',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      transition: 'opacity 1000ms',
      opacity: 1,
      // width: '100%',
      maxWidth: '100px'
    },
    placeholderContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'opacity 400ms',
      opacity: 1,
      height: '100%',
      width: '100%'
    },
    hidden: {
      opacity: '0!important'
    },
    text: {
      fontSize: theme.slexUi.headerButtonLabel.size,
      lineHeight: `${theme.slexUi.headerButtonLabel.size}px`,
      fontWeight: theme.slexUi.headerButtonLabel.fontWeight,
      fontFamily: theme.slexUi.headerButtonLabel.fontFamily,
      color: theme.slexUi.headerButtonLabel.color
    }
  }
}

export default styles
