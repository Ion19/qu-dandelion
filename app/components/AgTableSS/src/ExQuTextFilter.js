import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';




export class ExQuTextFilter extends PureComponent {

    state = {
      
        filterType:'text', 
        filter:'', 
        filterKey:this.props.filterKey
    } 
    

    componentDidMount(){
     
      // get the value of the filter input 

      if(this.props.data!==''){
        let filterText;
      filterText=this.props.data.filter((filterTag)=>(filterTag.filterKey===this.state.filterKey));
      if (filterText.length!==0){
        const [{filter}] = filterText 
        this.setState({filter})
    
      }
      }  
  }
  

 

  handleChange = event => {
    console.log(event.target.value);
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