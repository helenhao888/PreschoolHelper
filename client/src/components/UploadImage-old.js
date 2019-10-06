import React,{Component} from 'react'
import API from '../utils/API';
const axios = require("axios");


class UploadImageold extends Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('myImage',this.state.file);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        // console.log("form data",formData);
        // console.log("config",config);
        API.uploadFile(this.state.file)
        // axios.post("/upload",formData,config)
            .then((response) => {
                console.log("upload response",response)
                alert("The file is successfully uploaded");
            }).catch((error) => {
                console.log("upload err",error)
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
        console.log("state file",this.state.file)
    }

    render() {
        return (
            <div >
                <h1>File Upload</h1>
                <form enctype="multipart/form-data">
                    <input type="file" name="avatar" onChange={this.onChange}/>
                    <button onClick={this.onFormSubmit} type="submit">Upload</button>
                </form>
                {/* <input type="file" name="myImage" onChange={this.onChange} /> */}
                {/* <form action="/profile" method="post" enctype="multipart/form-data">
                    <input type="file" name="avatar" />
                </form> */}

            </div>
        )
    }
}

export default UploadImageold