import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
});

class ExQuModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(props){
      this.setState({open:props.open})
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
      >
        
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
           {this.props.children}
          </div>
        </Modal>
      </Grid>
    );
  }
}

ExQuModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExQuModal);