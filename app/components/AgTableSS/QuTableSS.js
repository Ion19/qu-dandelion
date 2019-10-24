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
      paginationPageSize:50,
      rowEdited :[],
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
    
}


  
  onColumnResized=(e)=> {
    console.log("event of column resized",e);
    
    let colsInfo;

    colsInfo=e.columns;
            
          for (let i=0 ; i < colsInfo.length ; i++) {
           this.setState(({
             columnDefs : this.state.columnDefs.map((col)=>(
           (col.field === colsInfo[i].colDef.field)? {
            ...col , width:colsInfo[i].actualWidth
           }:
           {...col}
           ))
          }))
           
          }
    
  }
  
    onColumnMoved=(params)=>{
      console.log('colum moved' , params)


      let oldIndex;
      let newIndex;
      
     
           
      oldIndex=(params.column!==null)?(this.state.columnDefs.findIndex((col)=>(col.field===params.column.colDef.field))):""; 
      newIndex=params.toIndex; 

      console.log(oldIndex , newIndex)
        
      const {columnDefs} = this.state ;

      this.columns_move(columnDefs,oldIndex,newIndex); 

      console.log(this.state.columnDefs)

    }
      
    columns_move=(columns, oldIndex, newIndex)=> {
      
      columns.splice(newIndex, 0, columns.splice(oldIndex, 1)[0]);
      return (columns,
      this.setState({
        columnDefs:columns
      }))
;
  };  
    
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


onDisplayedColumnsChanged =(params)=>{
  console.log("DisplayedColumnsChanged",params)
}



onColumnPinned =(params)=>{
  console.log("pinned params",params);
  this.setState(
    ({
      columnDefs:this.state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , pinned:params.pinned} : {...col} )
    }));
    console.log(this.state.columnDefs)
  }
 
  onColumnVisible=(params)=>{
    console.log("col visible",params); 
      this.setState(
      ({
          columnDefs:this.state.columnDefs.map((col)=>(col.field===params.column.colDef.field)? {...col , hide:!params.visible} : {...col} )
        }));

  
      console.log(this.state.columnDefs);
  }

  // onRowSelected=(event)=>{
  //   console.log(event)
  // }

  onSelectionChanged=(event)=>{
    var rowCount  = event.api.getSelectedNodes();
    let rows = rowCount.map((row)=>({data:row.data , id:row.id}));
    this.setState({selectedRows:rows})
    
  }

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
      
        ,()=>(this.onGridReady(this.params))
        
        );
         
       
      }

      else if (filterModel.filterType==='multi-select'){
      
        filtered= this.state.exFilter.filter((filterTag)=>filterTag.filterType !== 'multi-select'); 
        this.setState({
       
          exFilter:([...filtered , filterModel])
        }
      
        ,()=>(this.onGridReady(this.params))
        
        ); 
       
      } else {  
     

     this.setState({
       
       exFilter:([...this.state.exFilter , filterModel])
     }
   
     ,()=>(this.onGridReady(this.params))
     
     );
    
      }

  
    }
   

  }
   



  removeExFilterTag=(updatedFilter)=>{
    this.setState({
      exFilter:updatedFilter
    },()=>(this.onGridReady(this.params)))
  }

 
  
  render() {
    
    const {rowMultiSelectionWithClick ,rowSelection} =this.props

  
    return (
      <div 
        className="ag-theme-balham qu-ag-grid"
        style={{ 
        height: '1500px', 
         }} 
      >
        <ExQuFilterTags data={this.state.exFilter} updateFilterTag={this.removeExFilterTag}/>
        <ExQuFilter data={this.state.exFilter} submitFilter={this.exFilterSearch} /> 
    
        
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
            // columnDefs={ColumnsData}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            sideBar={this.state.sideBar}
            onColumnResized={this.onColumnResized}
            pagination={true}
            paginationAutoPageSize={false}
            
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

            onColumnPinned ={this.onColumnPinned}

            // onDisplayedColumnsChanged={this.onDisplayedColumnsChanged}
            onDragStopped={this.onDragStopped}
            onColumnVisible={this.onColumnVisible}
             // getMainMenuItems={this.getMainMenuItems}


            //  onRowSelected={this.onRowSelected}
             onSelectionChanged={this.onSelectionChanged}

             

            

          
          >
        </AgGridReact>
      </div>
    );
  }
}

export default QuTableSS;


