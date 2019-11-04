import React from 'react';
import Paper from '@material-ui/core/Paper'; 
import QuDropZoneUpload from './QuDropZoneUpload';
import QuFineUpload from './QuFineUpload';

const Form = () => {
  return (
  <>
    <div>
      <Paper>

          <QuDropZoneUpload/>
      
      </Paper>
    </div>


    <br/>
    
    
    <div>
      <Paper>

          <QuFineUpload
          itemLimit={11} 
          minSizeLimit={0} 
          sizeLimit={300000000} 
          allowedExtensions={['jpg','png','pdf']} 
          maxWidth={500} 
          minWidth={100} 
          maxHeight={390} 
          minHeight={100} 
          />
      
       </Paper>
      </div>
  </>
    
   
  );
}

export default Form;
