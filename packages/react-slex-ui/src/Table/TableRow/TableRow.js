import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { TableRow } from 'material-ui/Table'
import classNames from 'classnames'
import styles from './styles'

class WrappedTableRow extends PureComponent {
  render () {
    const { classes, children, className, onClick } = this.props
    return (
      <TableRow
        component={'li'}
        className={classNames(classes.container, className)}
        onClick={onClick}
      >
        {children}
      </TableRow>
    )
  }
}

WrappedTableRow.propTypes = {
}

export default withStyles(styles)(WrappedTableRow)
