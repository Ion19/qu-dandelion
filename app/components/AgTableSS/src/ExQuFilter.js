import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


import Modal from '@material-ui/core/Modal';



import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; 

import ExQuDateFilter from './ExQuDateFilter'; 
import ExQuTextFilter from './ExQuTextFilter';
import ExQuMultiFilter from './ExQuMultiFilter';
import ExQuDateRange from './ExQuDateRange';
import ExQuNumberRangeFilter from './ExQuNumberRangeFilter';




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
   demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});



class ExQuFilter extends React.Component {
  state = {
    open: false,
    filter:'', 
    filterKey:'', 
    data:''
  }; 

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value, open:true 
    },()=>(console.log(this.state)));
  };

  handleSubmitFilter=(filterKey,filter,filterType,filterTo)=>{
    if(filter.length !== 0) {
    this.props.submitFilter(filterKey,filter,filterType,filterTo)
    console.log(filter.length)  
    console.log(filterKey , filter)
    }
    this.handleClose() 
    
  } 

  componentWillReceiveProps(nextProps){
    this.setState({
      data:nextProps.data
    })
  }


  handleShowModal=()=>{
    if (this.state.filterKey === "athlete") {
          return (  
                <ExQuTextFilter 
                filterKey={this.state.filterKey}  
                handleSubmitFilter={this.handleSubmitFilter}
                data={this.state.data}
                />
          );
      }

      if (this.state.filterKey === "date") {
          return (  
                <ExQuDateFilter 
                filterKey={this.state.filterKey}  
                handleSubmitFilter={this.handleSubmitFilter} 
                data={this.state.data}
                />
                

          );
      }

      if (this.state.filterKey === "country") {
        return (  
              <ExQuMultiFilter 
              filterKey={this.state.filterKey}  
              handleSubmitFilter={this.handleSubmitFilter} 
              data={this.state.data}

              />
              

        );
    }

    if (this.state.filterKey === "daterange") {
      return (  
            <ExQuDateRange 
            filterKey={this.state.filterKey}  
            handleSubmitFilter={this.handleSubmitFilter}
            />
            

      );
  }

    if (this.state.filterKey === "age") {
      return (  
           <ExQuNumberRangeFilter 
            filterKey={this.state.filterKey}  
            handleSubmitFilter={this.handleSubmitFilter}
            data={this.state.data}

           />
            

      );
  }
  }



    


  render() {
    const { classes } = this.props;
    const { open , filterKey } = this.state;

    return (
     <> 
        <FormControl className={classes.formControl}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterKey}
              onChange={this.handleChange}
              inputProps={{
                name: 'filterKey',
              }}
            >
              <MenuItem disabled value={null}>
                <em>None</em>
              </MenuItem>
              <MenuItem value="athlete">Athlete</MenuItem>
              <MenuItem value="country">Country</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="daterange">Date Range</MenuItem>
              <MenuItem value="age">Age</MenuItem>
            </Select>
        </FormControl>
       
        
       


    
       <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
                <div style={getModalStyle()} className={classes.paper}>
                
                
                {this.handleShowModal()}
                    
                
                    <br/>

               
                  
                
                
                
                </div>
        </Modal>
      </>
    );
  }
}

ExQuFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExQuFilter);