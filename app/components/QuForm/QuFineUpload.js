import React, { Component } from 'react'; 

 
import FineUploaderTraditional from 'fine-uploader-wrappers/traditional';
import Gallery from 'react-fine-uploader';
 
// ...or load this specific CSS file using a <link> tag in your document
import 'react-fine-uploader/gallery/gallery.css';
 
// const 
 
class QuFineUpload extends Component {

    state={
        optins:{validation:{
            itemLimit:this.props.itemLimit,
            sizeLimit:this.props.sizeLimit, 
            allowedExtensions:this.props.allowedExtensions, 
            allowEmpty:true, 
            // acceptFiles:['image/jpeg', 'image/png', 'image/bmp'],


            image:{
                maxHeight:this.props.maxHeight
            } 
            
        }}
    }

    uploader = new FineUploaderTraditional({
        options: {
           
            ...this.state.optins,

            chunking: {
                enabled: true
            },
            // validation: {
            //     itemLimit: 0,
            //     // minSizeLimit:150,
            //     sizeLimit:16000, 
            //     allowedExtensions:['jpg','png','txt'], 
            //     allowEmpty:true, 
            //     image:{
            //         maxHeight:400
            //     }
            // },
            autoUpload: false,
            // interceptSubmit:false,

            
    
            
            request: {
                endpoint: 'https://httpbin.org/post'
            },
            retry: {
                enableAuto: false
                
            }

            
        }

    })

    componentDidMount(){    
    this.uploader.on('statusChange', (id, oldStatus, newStatus) => {
            console.log(id, oldStatus, newStatus)
            }
        )
    }

    handleUpload=()=>{
        this.uploader.methods.setParams(['aaaa','sss'])
        this.uploader.methods.uploadStoredFiles()
    }

 


   

    render() {
        return (
            <>
            <Gallery fileInput-disabled={false} dropzone-disabled={ false } uploader={ this.uploader } />
            <button onClick={()=>this.handleUpload()}>upload</button>
            </>
           
        );
    }
}
 
export default QuFineUpload;