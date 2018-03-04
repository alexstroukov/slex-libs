import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { TableCell } from 'material-ui/Table'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import styles from './styles'

class WrappedTableCell extends PureComponent {
  render () {
    const { classes, style = {}, align = 'inherit', children, className, ...rest } = this.props
    return (
      <TableCell component={'div'} className={classNames(classes.container, className)} style={{ ...style, justifyContent: align }} {...rest}>
        {children}
      </TableCell>
    )
  }
}

WrappedTableCell.propTypes = {
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center']),
  style: PropTypes.object,
  children: PropTypes.any
}

export default withStyles(styles)(WrappedTableCell)
