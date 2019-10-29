import React ,{PureComponent} from 'react'; 
 
import 'rsuite/dist/styles/rsuite-default.css'; 
import {DateRangePicker} from 'rsuite';
import { addDays, subDays,startOfDay, endOfDay,startOfWeek, isSameDay, endOfWeek, parse, format } from 'date-fns';

import Button from '@material-ui/core/Button';





class ExQuDateRange extends PureComponent {

    state = {
      
        filterType:'date-range', 
        filterFrom:'',
        filterTo:'', 
        filter:[], 
        Ranges : [
            {
              label: 'today',
              value: [startOfDay(new Date()), endOfDay(new Date())]
            },
            {
              label: 'yesterday',
              value: [
                startOfDay(addDays(new Date(), -1)),
                endOfDay(addDays(new Date(), -1))
              ]
            },
            {
              label: 'last7Days',
              value: [
                startOfDay(subDays(new Date(), 6)),
                endOfDay(new Date())
              ]
            }, 
            {
                label: '2 Years',
                value: [
                  startOfDay(subDays(new Date(), 364)),
                  endOfDay(addDays(new Date(), 364))
                ]
              }
          ]
    } 

    handleSubmitFilter=()=>{
      
        this.props.handleSubmitFilter(this.props.filterKey,this.state.filterFrom,this.state.filterType,this.state.filterTo); 
     
    }
    
    handleOnChange=(value)=>{
       this.setState({
           filterFrom:value[0].toDateString(), 
           filterTo:value[1].toDateString(), 
           filter:value
          
       } ,()=>console.log(this.state)
       )
    }

    componentDidMount(){
      if(this.props.data!==''){
        let filterDateRange;
      filterDateRange=this.props.data.filter((filterTag)=>(filterTag.filterKey===this.props.filterKey))
      if (filterDateRange.length!==0){
        const [{filter, filterTo}] = filterDateRange;
        this.setState({filter:[new Date(filter) , new Date(filterTo)]},()=>console.log(filterDateRange))
        
    }
    }
  }



    render(){
    return (
            <div className="qu-date-range">
               <DateRangePicker
                onChange={this.handleOnChange}
                value={this.state.filter}
                ranges={this.state.Ranges}
                
           />


               <Button variant="contained" color="primary"  
                onClick={this.handleSubmitFilter}>
                    Search
                </Button>  
            </div>
        );
    
}
}
export default ExQuDateRange;
