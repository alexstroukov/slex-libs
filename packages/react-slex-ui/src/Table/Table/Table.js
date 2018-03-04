import React from 'react'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableHead } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import styles from './styles'
import _ from 'lodash'

const WrappedTable = (props) => {
  const { classes, tableActionRow, headerRows, topRow, tableRows } = props
  const mappedTopRow = _.get(topRow, 'props.show', true) === false
    ? undefined
    : topRow
  return (
    <Paper className={classes.container}>
      {tableActionRow && <div>{tableActionRow}</div>}
      <Table component={'div'} className={classes.table}>
        <TableHead component={'ul'}>
          {headerRows}
        </TableHead>
        <TableBody component={'ul'}>
          {mappedTopRow}
          {tableRows}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(WrappedTable)
