import React, { Fragment } from 'react';
import { MaterialDropZone } from 'dan-components';
import request from 'superagent';

class QuDropZoneUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      acceptedFiles:[], 
      rejectedFiles:[]
    };
  }

  componentDidMount(){
      console.log(this.props)
  }

  handleAcceptedFiles=(files)=>{
    this.setState({acceptedFiles:[...this.state.acceptedFiles,...files]}, 
        ()=>console.log(this.state.acceptedFiles)) 
}

handleDropRejected=(files)=>{
    this.setState({
        rejectedFiles:[...this.state.acceptedFiles, files]
    })
}


    handleSave=()=>{
        const req = request.post('https://httpbin.org/post');
        let files=this.state.acceptedFiles;
        files.forEach(file => {
            req.attach(file.name, file);
          });
      
          req.end((res,err)=>{
              console.log(res)
              console.log('error',err)
          })
          
        }

        




  render() {
    const { files } = this.state;
    return (
      <Fragment>
        <div>
            <form onSubmit={(e)=>e.preventDefault()}>
          <MaterialDropZone
            files={files}
            // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={true}
            accept={['application/pdf']}
            minSize={10}
            maxSize={5000000}
            filesLimit={5}
            chunking={true}
            chunkSize= {1}
            retryChunks= {true}
            retryChunksLimit= {3}
            chunksUploaded={(file, done)=> done()}
                
            showButton	
            onDropAccepted={this.handleAcceptedFiles}
            onDropRejected={this.handleDropRejected}
            onPreviewDrop={this.handlePreviewDrop}
            text="Drag and drop file(s) here or click"
          />

          <button onClick={this.handleSave}>
                submit with superagent
          </button>

          
          </form>
        </div>
      </Fragment>
    );
  }
}

export default QuDropZoneUpload;