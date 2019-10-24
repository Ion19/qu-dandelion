import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';






class ExQuNumberRangeFilter extends Component {
  

  state={
    valueRange:[20, 37], 
    filterType:'number-range'
   
  }

//   componentDidMount(){
     
//     if(this.props.data!==''){
//       let filterNumberRange;
//     filterNumberRange=this.props.data.map((filterTag)=>(filterTag.filterType==='number-range')?([parseInt(filterTag.filter),parseInt(filterTag.filterTo)]):(''))
//   this.setState({valueRange:filterNumberRange})
//   }
// }


   handleChangeRange = (event,newValue) => {
        this.setState({valueRange:newValue}, ()=>console.log(newValue))
  };

  handleSubmitFilter=()=>{
      
    this.props.handleSubmitFilter(this.props.filterKey,this.state.valueRange[0],this.state.filterType,this.state.valueRange[1]); 
 
}        


   render(){

  return (
    <>
      
      
          <Slider 
            value={this.state.valueRange}
            onChange={this.handleChangeRange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={100}
            min={0}
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

export default ExQuNumberRangeFilter;