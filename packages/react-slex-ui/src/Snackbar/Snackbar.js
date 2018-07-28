import React, { PureComponent } from 'react'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import snackbarService from './snackbarService'

class WrappedSnackbar extends PureComponent {
  state = {
    error: this.props.error
  }
  open = ({ error }) => {
    this._open && this._open({ error })
  }
  close = () => {
    this._close && this._close()
  }
  componentDidMount () {
    this._open = ({ error }) => this.setState({ error })
    this._close = () => this.setState({ error: undefined })
    snackbarService.connect({ open: this.open, close: this.close })
  }
  componentWillUnmount () {
    snackbarService.disconnect()
    this._open = undefined
    this._close = undefined
  }
  render () {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!this.state.error}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{this.state.error}</span>}
        action={[
          <Button key={'close'} color={'primary'} size={'small'} onClick={this.close}>
            close
          </Button>
        ]}
      />
    )
  }
}
export default WrappedSnackbar
