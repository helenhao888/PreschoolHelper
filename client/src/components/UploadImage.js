import React from 'react'

const axios = require("axios");

class UploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onUploadClick (e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload",formData,config)
            .then((response) => {
                console.log("response data",response.data);
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
           
            <div className="input-group form-group">
                <label htmlFor="myImage" className="col-md-4 control-label">Student Photo</label>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit" onClick={this.onUploadClick}>Upload</button>
            </div>   
         
        )
    }
}

export default UploadImage