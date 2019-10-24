import React from 'react'; 
import {ColumnsData} from './data'


import QuTableSS from './QuTableSS';

function App() {
  return (
    <div className="App"> 
          

      <QuTableSS
       urlCols={ColumnsData}
       urlRows="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json" 
       rowSelection="multiple"
       rowMultiSelectionWithClick 
      />
 
    </div>
  );
}

export default App;
