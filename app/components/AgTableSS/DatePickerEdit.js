import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';


  const styles = theme => ({
    demo: {
      height: 240,
    },
    divider: {
      margin: `${theme.spacing(3)}px 0`,
    },
    picker: {
      margin: `${theme.spacing(3)}px 5px`,
    }
  });
  
  class DateInput extends PureComponent {
    state = {
      selectedDate: new Date(),
     
    }
  
    handleDateChange = (date) => {
      this.setState({ selectedDate: date });
      console.log(this.state.selectedDate)
    }

    
 
    getValue () {
        return this.state.selectedDate;
      }
  
    render() {
      const { selectedDate } = this.state;
      const { classes } = this.props;
     
      return (
        
         
            <>
             
              <div className={classes.picker}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                 
                  format="DD/MM/YYYY" 
                  placeholder="dd/mm/yyyy"
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  animateYearScrolling={false}
                />
              </MuiPickersUtilsProvider>
              </div>
              </>
              
  
             
              
         
        
      );
    }
  }
  
  
  DateInput.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DateInput);
