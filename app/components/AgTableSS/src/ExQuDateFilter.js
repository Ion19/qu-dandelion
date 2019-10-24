import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';



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

class ExQuDateFilter extends PureComponent {
  state = {
    filter: Date.now(),
    filterType:'Date'
    
    
  }

  componentDidMount(){
     
    if(this.props.data!==''){
      let filterDate;
    filterDate=this.props.data.map((filterTag)=>(filterTag.filterType==='date')?(filterTag.filter):(''))
  this.setState({filter:filterDate})
  }
}


  handleDateChange = (date) => {
    this.setState({ filter: date },
    ()=>(this.props.handleSubmitFilter(this.props.filterKey,this.state.filter._d , this.state.filterType))
    );
    
  }


  render() {
    const { filter } = this.state;
    const { classes } = this.props;
    
    return (

  <div className="qu-filter-date">
            <Typography variant="button" className={classes.divider}>Date</Typography>
            <div className={classes.picker}>
              <div className={classes.divider}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker 
                  
                  format="DD/MM/YYYY"
                  placeholder="10/10/2018"
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  value={filter}
                  onChange={this.handleDateChange}
                  animateYearScrolling={true}
                />
              </MuiPickersUtilsProvider>
              </div>

             
            </div>
    </div>
    
    );
  }
  }


    ExQuDateFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExQuDateFilter);