import * as React from "react";

export class FileSelector extends React.Component < undefined, undefined > {
  constructor(props: any) {
    super(props);
  }

  // handleChange(selectorFiles: FileList) {
  //   console.log(selectorFiles);
  // }

  fileHandler = e =>{
    let formData = new FormData();
    formData.append('login','login')
    formData.append('pass','pass')
    formData.append('profilePicture', e.target.files[0])
    console.log(formData);
    fetch("/test", {
      method: "POST",
      body: formData
    })
  }

  render() {
    return <div >
        <input type = "file" />
        <button onClick = {this.fileHandler} >upload</button>
      </div> ;
  }
}

export default FileSelector
