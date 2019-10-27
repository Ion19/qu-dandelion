import React,{Component} from 'react';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';






class ExQuNumberRangeFilter extends Component {
  

  state={
    valueRange:[20, 37], 
    filterType:'number-range'
   
  }

  componentDidMount(){
     
    if(this.props.data!==''){
      let filterNumberRange;
    filterNumberRange=this.props.data.filter((filterTag)=>(filterTag.filterType==='number-range'))
    if (filterNumberRange.length!==0){
      const [{filter , filterTo}] = filterNumberRange ; 
      this.setState({valueRange:[filter,filterTo]});
      console.log(filter , filterTo)
  }
}
}


   handleChangeRange = (event,newValue) => {
        this.setState({valueRange:newValue}, ()=>console.log(newValue))
  };

  handleSubmitFilter=()=>{
      
    this.props.handleSubmitFilter(this.props.filterKey,this.state.valueRange[0],this.state.filterType,this.state.valueRange[1]); 
 
}        


   render(){

    const marks = [
      {
        value: this.props.min,
        label: this.props.min,
      },
     
      {
        value: this.props.max,
        label: this.props.max,
      },
    ];
    

  return (
    <>
      
      
          <Slider 
            value={this.state.valueRange}
            onChange={this.handleChangeRange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={this.props.max}
            min={this.props.min}
            valueLabelDisplay="on"
            marks={marks}
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