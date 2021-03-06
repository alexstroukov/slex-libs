import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import styles from './styles'
import { TableRow } from 'material-ui/Table'

class TableHeaderRow extends PureComponent {
  render () {
    const { classes, children, className, ...rest } = this.props
    return (
      <TableRow component={'li'} className={classNames(classes.container, className)} {...rest}>
        {children}
      </TableRow>
    )
  }
}
TableHeaderRow.propTypes = {
}

export default withStyles(styles)(TableHeaderRow)
