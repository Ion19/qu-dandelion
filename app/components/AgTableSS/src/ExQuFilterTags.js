import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper'; 
import Modal from '@material-ui/core/Modal';

import ExQuDateFilter from './ExQuDateFilter'; 
import ExQuTextFilter from './ExQuTextFilter';
import ExQuMultiFilter from './ExQuMultiFilter';
import ExQuDateRange from './ExQuDateRange';
import ExQuNumberRangeFilter from './ExQuNumberRangeFilter';




const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
});

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}




class ExQuFilterTags extends React.Component { 

    state={
        chipData:[],
        open:false , 
        activeTag:''
       
    }

    componentWillReceiveProps(nextProps) {
        
          this.setState({ chipData: nextProps.data },()=>console.log(this.state.chipData)); 
          
      }

     
 
  handleDelete = data => () => {
    this.setState({
        chipData:this.state.chipData.filter((tag)=>(tag.filter !== data.filter))
    },()=>(this.props.updateFilterTag(this.state.chipData)

    )
    )
 

  }; 

 


  handleClick=(data)=>{
   this.setState({activeTag:data},()=> this.handleOpen())
    }

  handleOpen = () => {
    this.setState({ open: true });
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleShowModal=()=>{
    if (this.state.activeTag.filterKey === "athlete") {
          return (  
                <ExQuTextFilter 
                filterKey={this.state.activeTag.filterKey}  
                handleSubmitFilter={this.handleSubmitFilter}
                data={this.state.chipData}
                />
          );
      }

      else if (this.state.activeTag.filterKey === "sport") {
        return (  
              <ExQuTextFilter 
              filterKey={this.state.activeTag.filterKey}  
              handleSubmitFilter={this.handleSubmitFilter}
              data={this.state.chipData}
              />
        );
    }

      else if (this.state.activeTag.filterKey === "date") {
          return (  
                <ExQuDateFilter 
                filterKey={this.state.activeTag.filterKey}
                handleSubmitFilter={this.handleSubmitFilter} 
                data={this.state.chipData}
                />
                

          );
      }

      else if (this.state.activeTag.filterKey === "multi-select") {
        return (  
              <ExQuMultiFilter 
              filterKey={this.state.activeTag.filterKey}
              handleSubmitFilter={this.handleSubmitFilter} 
              data={this.state.chipData}

              />
              

        );
    }

    else if (this.state.activeTag.filterKey === "daterange") {
      return (  
            <ExQuDateRange 
            filterKey={this.state.activeTag.filterKey}
            handleSubmitFilter={this.handleSubmitFilter}
            data={this.state.chipData}
            />
            

      );
  }

    else if (this.state.activeTag.filterKey === "age") {
      return (  
           <ExQuNumberRangeFilter 
            filterKey= {this.state.activeTag.filterKey}
            handleSubmitFilter={this.handleSubmitFilter}
            data={this.state.chipData}
            min={0}
            max={100}
           />
            

      );
  }
  }

  handleSubmitFilter=(filterKey,filter,filterType,filterTo)=>{
    if(filter.length !== 0) {
    this.props.submitFilter(filterKey,filter,filterType,filterTo)

    }
    this.handleClose() 
    
  } 

 

  render() {
    const { classes } = this.props;
    const {chipData }  = this.state; 
   

      
    return (
      <>
      <Paper className={classes.root}>
        
        {chipData.map((data , index) => {
        

          return (
      
            <Chip
              key={index}
              label={(data.filterTo!=='') ?  `${data.filter} - ${(data.filterTo)} ` :  ` ${(data.filter)}`}
              onDelete={this.handleDelete(data)}
              className={classes.chip}
              onClick={()=>this.handleClick(data)}
            />
           
         
          );

        })}
                
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
             
            >
              <div style={getModalStyle()} className={this.props.classes.paper}>
                    {this.handleShowModal()}
              </div>
            </Modal>
        

        

           

      </Paper>

      </>
    );
  }
}

ExQuFilterTags.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExQuFilterTags);