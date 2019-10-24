import React ,{Component} from 'react'; 
 
import 'rsuite/dist/styles/rsuite-default.css'; 
import {DateRangePicker} from 'rsuite';
import { addDays, subDays,startOfDay, endOfDay,startOfWeek, isSameDay, endOfWeek, parse, format } from 'date-fns';

import Button from '@material-ui/core/Button';





class ExQuDateRange extends Component {

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
           filterFrom:value[0], 
           filterTo:value[1], 
           filter:value
          
       } ,()=>console.log(this.state)
       )
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
