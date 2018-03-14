const styles = theme => {
  return {
    container: {
      height: theme.slexUi.gridTileLabel.size - 2,
      width: '100%',
      position: 'relative'
    },
    textContainer: {
      position: 'absolute',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      transition: 'opacity 1000ms',
      opacity: 1,
      width: '100%'
    },
    placeholderContainer: {
      position: 'absolute',
      transition: 'opacity 400ms',
      opacity: 1,
      height: '100%',
      width: '100%'
    },
    hidden: {
      opacity: '0!important'
    },
    text: {
      fontSize: theme.slexUi.gridTileLabel.size,
      lineHeight: `${theme.slexUi.gridTileLabel.size}px`,
      textTransform: theme.slexUi.gridTileLabel.textTransform,
      fontWeight: theme.slexUi.gridTileLabel.fontWeight,
      fontFamily: theme.slexUi.gridTileLabel.fontFamily,
      color: theme.slexUi.gridTileLabel.color
    }
  }
}

export default styles
