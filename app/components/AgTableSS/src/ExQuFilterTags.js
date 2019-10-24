import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

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
});

class ExQuFilterTags extends React.Component { 

    state={
        chipData:[]
    }

    componentWillReceiveProps(nextProps) {
        
          this.setState({ chipData: nextProps.data },()=>console.log(this.state.chipData)); 

          
        
      }
 
  handleDelete = data => () => {
    // const  chipData  = this.props.data;
    // let updatedData;
    this.setState({
        chipData:this.state.chipData.filter((tag)=>(tag.filter !== data.filter))
    },()=>(this.props.updateFilterTag(this.state.chipData)

    )
    )
 

  }; 

  render() {
    const { classes } = this.props;
    const {chipData}  = this.state; 
   

      
    return (
      <Paper className={classes.root}>
        
        {chipData.map((data , index) => {
        

          return (
            <Chip
              key={index}
              label={`${data.filter.toString()} - ${(data.filterTo.toString())} ` } 
              onDelete={this.handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </Paper>
    );
  }
}

ExQuFilterTags.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExQuFilterTags);