import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import 'ag-grid-enterprise'; 
import './dist/style.css';


import ExQuFilter from './src/ExQuFilter'; 
import ExQuFilterTags from './src/ExQuFilterTags';




class QuTableSS extends Component {
 
 
    state = { 
      
      columnDefs:this.props.urlCols,
      exFilter:[],
      selectedRows:[],
      paginationPageSize: 10,
      rowEdited :[],
      updatedColumns:this.props.urlCols,
      defaultColDef: { 
    }
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

    // Row Selected
    onRowSelected=(event)=>{
    console.log(event)
  }


    // edit Row Table Cell 

    onCellValueChanged= (params)=> {
      const {rowIndex , oldValue , newValue , data  } =params; 
      const {field} = params.column.colDef;
      this.setState((state)=>({
        rowEdited:[...state.rowEdited , {rowIndex , oldValue , newValue , data ,field}  ]
      })
      )
      // console.log(params)
      // console.log(this.state.rowEdited)
      // this.onGridReady(params)
    }


    // onDisplayedColumnsChanged =(params)=>{
    //   console.log("DisplayedColumnsChanged")
    // }


  
  //   // onSelectionChanged 
  // onSelectionChanged=(event)=>{
  //   var rowCount  = event.api.getSelectedNodes();
  //   let rows = rowCount.map((row)=>({data:row.data , id:row.id}));
  //   this.setState({selectedRows:rows})
    
  // }

  handleSelectRowsBtn=()=>{
    console.log("Selected Rows",...this.state.selectedRows)
  }

  handleEditRowsBtn=()=>{
     console.log("Edited Rows",...this.state.rowEdited)
  }

  handlePostEditedRow=()=>{
    axios.post('/row', {
      rowEdited: this.state.rowEdited
    })
    .then((res)=> {
      console.log(res);
    })
    .catch((err)=> {
      console.log(err);
    });

    this.setState({rowEdited:[] })
  }

    //
    

 

  exFilterSearch=(filterKey , filterValue ,filterType ,filterTo='')=> {
    if (filterValue !=='' || filterValue !==[]) {

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

  // onColumnEverythingChanged=(params)=>{
  //   console.log('everything Changed',params)
  // }

 
//   onDisplayedColumnsChanged=(params)=>{

//     if(this.props.upDateColumnsDefs){
//     console.log('changed',params)
//     let columns;
//     columns=(params.columnApi.getColumnState())
//     axios.post('./data.json',{
//       columns
//     })
//     .then((res)=>console.log(res))
//     .catch((err)=>console.log(err))

//     if (this.props.exQuSpecialFns){
      
//       // this.props.exFns.map((fun)=>(fun.type==="onDisplayColumnChanged")?
//       // (fun.fns.map((fn)=>fn())):null)
//   }
// }

//   }

 
  
  render() {
    
    const {rowMultiSelectionWithClick ,rowSelection} =this.props

  
    return (
      <div 
        className="ag-theme-balham qu-ag-grid"
        style={{ 
        height: '1500px', 
         }} 
      >
        <ExQuFilterTags 
        data={this.state.exFilter} 
        submitFilter={this.exFilterSearch} 
        updateFilterTag={this.removeExFilterTag}
        />
        <ExQuFilter 
        data={this.state.exFilter} 
        submitFilter={this.exFilterSearch} 
        filters={[
          {filterKey:'athlete',filterName:"Athlete" ,filterType:"text"},
          {filterKey:'sport',filterName:"Sport" ,filterType:"text"},
          {filterKey:'country',filterName:"Country" ,filterType:"multi-select"},{filterKey:'year',filterName:"Year" ,filterType:"date"},
          {filterKey:'age',filterName:"Age" ,filterType:"number-range"},
          {filterKey:'range',filterName:"Trial Range" ,filterType:"date-range"}
        ]}
        /> 

      
        
        
         {/* <button onClick={()=>this.handleSelectRowsBtn()}>
           Show Selected rows 
         </button> 

         <button onClick={()=>this.handleEditRowsBtn()}>
           Show edited rows 
         </button> 

         <button onClick={()=>this.handlePostEditedRow()} >
           Post edited Row 
         </button> */}
         <button onClick={()=>this.onLoadData()}>
           Load 
         </button>

         <button onClick={()=>this.handleUpdateColumnDefState()}>
           column State
         </button>


        <AgGridReact
                    
            rowModelType="serverSide"
            columnDefs={this.state.columnDefs}
            // columnDefs={ColumnsData}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            sideBar={this.state.sideBar}
            onColumnResized={this.onColumnResized}

            //Pagination 

            pagination={this.props.pagination}
            // Pagination page Size "number of rows in each page" 
            paginationPageSize={this.props.paginationPageSize}
            // number of rows will be submitted to the get requset 
            cacheBlockSize = {this.props.cacheBlockSize}
            
            // paginationAutoPageSize={false}
            rowDragManaged={true}	
            
            //darg and move column true or false
            // suppressMovableColumns={true}
            frameworkComponents={this.state.frameworkComponents}      
            onColumnMoved= {this.onColumnMoved}
            //pin filter menu
            suppressMenuHide = {true}
            // floatingFilter={true}
            //Row Selection
            rowSelection={rowSelection}
            rowMultiSelectWithClick={rowMultiSelectionWithClick} 

            //Edit cells
            onCellValueChanged={this.onCellValueChanged}

            onColumnPinned={this.onColumnPinned}

            // onDisplayedColumnsChanged={this.onDisplayedColumnsChanged}
            onDragStopped={this.onDragStopped}
            onColumnVisible={this.onColumnVisible}
             // getMainMenuItems={this.getMainMenuItems}


             onRowSelected={this.onRowSelected}
             onSelectionChanged={this.onSelectionChanged}

             onColumnEverythingChanged={this.onColumnEverythingChanged}

             onDisplayedColumnsChanged={this.onDisplayedColumnsChanged}

            

             

            

          
          >
        </AgGridReact>
      </div>
    );
  }
}

export default QuTableSS;


