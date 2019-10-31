import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import 'ag-grid-enterprise'; 
import Button from '@material-ui/core/Button';
import './dist/style.css';


import ExQuFilter from './src/ExQuFilter'; 
import ExQuFilterTags from './src/ExQuFilterTags';




class QuTableSS extends Component {
 
 
    state = { 
      
      columnDefs:[],
      exFilter:[],
      selectedRows:[],
      paginationPageSize: 10,
      rowEdited :[],
      updatedColumns:this.props.urlCols,
      defaultColDef: { 
    }, 
    exFilterComps:[]
}


    componentDidMount(){
      axios.get(this.props.urlCols)
      .then((res)=>this.setState({columnDefs:res.data[0],exFilterComps:res.data[1]}))      
      .catch((err)=>console.log(err))
    }
  
  

    onGridReady=(params)=> { 

    this.params = params;
  
   console.log('grid ready',params)
    const datasource = {
       
        getRows: (params) => {
          
            console.log('params of getRows',params) ; 
           const {exFilter}=this.state;
           const {urlRows} = this.props;
           
           
          axios.get(urlRows,{
          params:[params.request ,{exFilter}]
           
    })
      .then(((res) => res.data))
      .then(data => params.successCallback(data))

      .catch (err=>console.log(err))
        }
    };
    console.log('dataSource',datasource)
    
    params.api.setServerSideDatasource(datasource);

    if (this.props.exQuSpecialFns){
      
      this.props.exFns.map((fun)=>(fun.type==="onGridReady")?
      (fun.fns.map((fn)=>fn())):null)
  }
    
    }

    //Fetch Rows Data
    
    onLoadData=()=>{
    const datasource = {
       
    getRows: (params) => {
      
        console.log('params of getRows',params) ; 
       const {exFilter}=this.state;
       const {urlRows} = this.props;
       
       
      axios.get(urlRows,{
      params:[params.request ,{exFilter}]
       
})
  .then(((res) => res.data))
  .then(data => params.successCallback(data))

  .catch (err=>console.log(err))
    }
};
console.log('dataSource',datasource)

this.params.api.setServerSideDatasource(datasource)

    }

    // post updated Coldefs props

    handleUpdateColumnDefState=()=>{
      // console.log(this.params)
      // console.log(this.params.columnApi.getColumnState())	
      axios.post('./colData.json',{
        columnDefs:(this.params.columnApi.getColumnState())
      })
      .then((res)=>console.log(res))
      .then(console.log(this.params.columnApi.getColumnState()))
      .catch((err)=>console.log(err))
  
    }
  

    // column Resized

    onColumnResized=(e)=> {
      if (this.props.upDateColumnsDefs) {
  
          
          if(e.finished){
          
          this.handleUpdateColumnDefState()

          if (this.props.exQuSpecialFns){
      
            this.props.exFns.map((fun)=>(fun.type==="onColumnResized")?
            (fun.fns.map((fn)=>fn())):null)
        }
        }

         
    
  }
    }

    // pin columns

    onColumnPinned =()=>{
      if (this.props.upDateColumnsDefs) {
          this.handleUpdateColumnDefState()

          if (this.props.exQuSpecialFns){
      
            this.props.exFns.map((fun)=>(fun.type==="onColumnPinned")?
            (fun.fns.map((fn)=>fn())):null)
            }

          
      }
    
    }

    // Columns Visiblity
 
    onColumnVisible=()=>{
      if (this.props.upDateColumnsDefs) {
    this.handleUpdateColumnDefState()
    if (this.props.exQuSpecialFns){
      
      this.props.exFns.map((fun)=>(fun.type==="onColumnVisible")?
      (fun.fns.map((fn)=>fn())):null)
      }
      }
    }

    // Move Columns 
    onColumnMoved=()=>{
      if (this.props.upDateColumnsDefs) {
      this.handleUpdateColumnDefState()
      if (this.props.exQuSpecialFns){
      
        this.props.exFns.map((fun)=>(fun.type==="onColumnMoved")?
        (fun.fns.map((fn)=>fn())):null)
        }
      }
    }  

    // on Row Selected
    onRowSelected=(event)=>{
    console.log(event)
  }


    // on Selection Row Changed 
    onSelectionChanged=(event)=>{
    console.log('onSelectChanged',event)
    var rowCount  = event.api.getSelectedNodes();
    console.log(rowCount)
    // return array of selected rows each by rowId and rowData
    let rows = rowCount.map((row)=>({data:row.data , id:row.id}));
    this.setState({selectedRows:rows})
    
  }



    // edit Row Table Cell 

    onCellValueChanged =(event)=> { 
      const {rowIndex , oldValue , value , data }=event; 
      const {field} = event.column.colDef;
      this.setState((state)=>({
        rowEdited:[...state.rowEdited , {rowIndex , oldValue , value , data ,field}  ]
      }),()=>console.log(this.state.rowEdited)
      )
     
    }





  handlePostEditedRow=()=>{
    axios.post('/row', {
      rowEdited: this.state.rowEdited
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))

    this.setState({rowEdited:[] })
  }

    //
    

 

  exFilterSearch=(filterKey , filterValue ,filterType ,filterTo='')=> {
    if (filterValue.length !==0 ) {

      let filterModel = 
      {"filterKey": filterKey,"filterType":filterType ,"filter":filterValue,"filterTo":filterTo };
     
     
     // Set filter properties

     //Edit the text filter  
      
     let filtered=[]; 
      if((filterModel.filterType==='text')){

        console.log('Key',filterModel.filterKey)

      
        filtered= this.state.exFilter.filter((filterTag)=>filterTag.filterKey !== filterKey);
        this.setState({
       
          exFilter:([...filtered , filterModel])
        }
      
        ,()=>(this.onLoadData())
        
        );
         
       
      }

       if (filterModel.filterType==='multi-select'){
      
        filtered= this.state.exFilter.filter((filterTag)=>filterTag.filterType !== 'multi-select'); 
        this.setState({
       
          exFilter:([...filtered , filterModel])
        }
      
        ,()=>(this.onLoadData())
        
        ); 
       
      }
      
       if (filterModel.filterType==='date'){
      
        filtered= this.state.exFilter.filter((filterTag)=>filterTag.filterType !== 'date'); 
        this.setState({
       
          exFilter:([...filtered , filterModel])
        }
      
        ,()=>(this.onLoadData())
        
        ); 
       
      }
      
       if (filterModel.filterType==='number-range'){
      
        filtered= this.state.exFilter.filter((filterTag)=>filterTag.filterType !== 'number-range'); 
        this.setState({
       
          exFilter:([...filtered , filterModel])
        }
      
        ,()=>(this.onLoadData())
        
        ); 
       
      }

       if (filterModel.filterType==='date-range'){
      
        filtered= this.state.exFilter.filter((filterTag)=>filterTag.filterType !== 'date-range'); 
        this.setState({
       
          exFilter:([...filtered , filterModel])
        }
      
        ,()=>(this.onLoadData())
        
        ); 
       
      }
    
  
    }
   
  }
   
  removeExFilterTag=(updatedFilter)=>{
    this.setState({
      exFilter:updatedFilter
    },()=>(this.onLoadData()))
  }

 
  
  render() {
    
    const {
      rowMultiSelectionWithClick,
      rowSelection,
      pagination, 
      paginationPageSize, 
      cacheBlockSize
    } =this.props

  
    return (
      <div 
        className="ag-theme-balham qu-ag-grid"
        style={{ 
        marginBottom:"50px",
        height:'1000px'

         }} 
      >
        <div style={{marginTop:"25px", marginBottom:"25px"}}>
        <ExQuFilterTags 
        data={this.state.exFilter} 
        submitFilter={this.exFilterSearch} 
        updateFilterTag={this.removeExFilterTag}
        />
        <ExQuFilter 
        data={this.state.exFilter} 
        submitFilter={this.exFilterSearch}
        urlMultiSuggestion="http://localhost/qu-agSuggestion/index.php" 
        filters={this.state.exFilterComps}
        // filters={[
        //   {filterKey:'athlete',filterName:"Athlete" ,filterType:"text"},
        //   {filterKey:'sport',filterName:"Sport" ,filterType:"text"},
        //   {filterKey:'country',filterName:"Country" ,filterType:"multi-select"},
        //   {filterKey:'year',filterName:"Year" ,filterType:"date"},
        //   {filterKey:'age',filterName:"Age" ,filterType:"number-range"},
        //   {filterKey:'range',filterName:"Trial Range" ,filterType:"date-range"}
        // ]}
        /> 
        </div>

      
        <div style={{padding:"25px"}}>
          
         <Button style={{marginLeft:"20px"}} variant="contained" color="secondary" onClick={()=>this.onLoadData()}>
           Load  
         </Button>
         
         <Button style={{marginLeft:"20px"}} variant="contained" color="primary" onClick={()=>this.handleUpdateColumnDefState()}>
              Update Column 
          </Button>

        

        </div>  
        
         {/* <button onClick={()=>this.handleSelectRowsBtn()}>
           Show Selected rows 
         </button> 

         <button onClick={()=>this.handleEditRowsBtn()}>
           Show edited rows 
         </button> 

         <button onClick={()=>this.handlePostEditedRow()} >
           Post edited Row 
         </button> */}



        <AgGridReact
                    
            rowModelType="serverSide"
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            // load Rows on Grid Ready
            onGridReady={this.onGridReady}


            // column Resized
            onColumnResized={this.onColumnResized}
            // column Moved 
            onColumnMoved= {this.onColumnMoved}
            // column Pinned
            onColumnPinned={this.onColumnPinned}
            // column Visiblity 
            onColumnVisible={this.onColumnVisible}


            //Pagination 
            pagination={pagination}
            // Pagination page Size "number of rows in each page" 
            paginationPageSize={paginationPageSize}
            // number of rows will be submitted to the get requset 
            cacheBlockSize = {cacheBlockSize}
            
            //pin filter menu
            suppressMenuHide = {true}
           
            //Row Selection Type {single/ multible || select on Click}
            rowSelection={rowSelection}
            rowMultiSelectWithClick={rowMultiSelectionWithClick} 

            // on Row Selected 
            onRowSelected={this.onRowSelected}
            onSelectionChanged={this.onSelectionChanged}

            //Edit cells
            onCellValueChanged={this.onCellValueChanged}          
          />
        
      </div>
    );
  }
}

export default QuTableSS;


