// import React from 'react';
// import {FileInput} from 'react-file-input'

var NavComponent = React.createClass({
    uploadSingleFile: function(){
        console.log('testing');
    },
    render: function(){
        return (
            <div className="navbar-a">
                <span id="logo">S3 GUI</span>
                <span className="behavior-button action" id="file-uploader" onClick={this.uploadSingleFile}>upload</span>
                <span className="behavior-button default">new folder</span>
            </div>
        );
    }
});

ReactDOM.render(<NavComponent name="nav" />, document.getElementById('navbar'));
