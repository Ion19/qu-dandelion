import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';




export class ExQuTextFilter extends Component {

    state = {
      
        filterType:'text', 
        filter:''
    } 
    

    componentDidMount(){
     
      if(this.props.data!==''){
        let filterText;
      filterText=this.props.data.map((filterTag)=>(filterTag.filterType==='text')?(filterTag.filter):(''))
    this.setState({filter:filterText})
    }
  }
  

 

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

    handleSubmitFilter=()=>{
      
        this.props.handleSubmitFilter(this.props.filterKey,this.state.filter,this.state.filterType); 
     
    }        


    render() {
        return (
                <>
               
                
                <TextField
                id="outlined-search"
                label="Search "
                type="search"
                value={this.state.filter}
                name="filter"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} 
              />

                <br/>
              
                <Button variant="contained" color="primary"  
                onClick={this.handleSubmitFilter}>
                    Search
                </Button>  
                </> 
         
        );
    }
}


export default ExQuTextFilter;
 