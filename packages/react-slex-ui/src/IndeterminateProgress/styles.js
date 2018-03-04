const styles = theme => {
  return {
    containerVertical: {
      transform: 'translate(0, 0)',
      display: 'block',
      position: 'fixed',
      width: '1px',
      height: '100%',
      maxHeight: '100%',
      opacity: '1',
      transition: 'opacity 1s'
    },
    indeterminateVertical: {
      animationName: 'verticalanim',
      animationDuration: '2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      backgroundColor: theme.palette.primary['500'],
      display: 'block',
      position: 'absolute',
      left: '0',
      right: '0',
      height: '0%',
      transition: 'height .2s cubic-bezier(.4,0,.2,1)'
    },
    containerHorizontal: {
      transform: 'translate(0, 0)',
      display: 'block',
      position: 'relative',
      height: '1px',
      width: '100%',
      maxWidth: '100%',
      opacity: '1',
      transition: 'opacity 1s'
    },
    indeterminateHorizontal: {
      animationName: 'horizontalanim',
      animationDuration: '2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      backgroundColor: theme.palette.primary['500'],
      display: 'block',
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '0%',
      transition: 'width .2s cubic-bezier(.4,0,.2,1)'
    },
    '@keyframes horizontalanim': {
      '0%': {
        transform: 'translate(0, 0)',
        left: '0%',
        width: '0%'
      },
      '50%': {
        transform: 'translate(0, 0)',
        left: '25%',
        width: '75%'
      },
      '75%': {
        transform: 'translate(0, 0)',
        left: '100%',
        width: '0%'
      }
    },
    '@keyframes verticalanim': {
      '0%': {
        transform: 'translate(0, 0)',
        top: '0%',
        height: '0%'
      },
      '50%': {
        transform: 'translate(0, 0)',
        top: '25%',
        height: '75%'
      },
      '75%': {
        transform: 'translate(0, 0)',
        top: '100%',
        height: '0%'
      }
    }
  }
}

export default styles
