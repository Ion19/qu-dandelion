import React from 'react'; 
import {ColumnsData} from './data' ;



import QuTableSS from './QuTableSS';

class App extends React.Component {

  alertFun=()=>{
    alert('hello World !!')
  }

  consoleFun=()=>{
    console.log('hey')
  }

  trialfun=()=>{
    console.log('second Function')
  }

  render(){
  return (
    <div className="App"> 

    


         <div style={{marginBottom:"100px"}}> 

      


      <QuTableSS
        urlCols='http://localhost/qu-agTable/index.php'
        urlRows="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json" 
        rowSelection="multiple"
        rowMultiSelectionWithClick 
        // exQuSpecialFns
        exFns={[
          // {type:"onGridReady",fns:[this.alertFun,this.consoleFun]}, 
          {type:"onDisplayColumnChanged",fns:[this.consoleFun]}, 
          {type:"onColumnResized",fns:[this.consoleFun,this.trialfun]}
          
        ]}

        upDateColumnsDefs={true}
        pagination
        paginationPageSize={100}
        cacheBlockSize={100}

             
      />
      </div>

      <br/>
      <div style={{marginTop:"25px"}}></div>
      <br/>
{/*   
      <QuTableSS
       urlCols={ColumnsData}
       urlRows="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json" 
       rowSelection="multiple"
       rowMultiSelectionWithClick 
      />  */}
    
 
    </div>
  );
}
}

export default App;
