import React, {Component} from 'react';
import config from './config';
import ApiContext from './ApiContext';
import ValidationError from './ValidationError';

export default class AddFolder extends Component {
  state = {
    folder : {
      name: '',
      touched: false
    }      
  }

  validateName() {
    const name = this.state.folder.name.trim();
    if (name.length === 0) {
      return 'Folder name is required';
    }
  }

  static contextType = ApiContext;

  updateFolderName(name){
    this.setState({folder: {name: name, touched: true}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { folder } = this.state;

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: folder.name})
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(folder => {
      this.props.history.push(`/`);
      this.context.addFolder(folder);
    })
    .catch(error => {
      console.error({ error })
    })

  }

  render(){
    const folderNameError = this.validateName();
    return (
      <form className="addFolder" onSubmit={e => this.handleSubmit(e)} style={{backgroundColor:"lightblue", padding:"10px"}}>
        <h2>Add Folder</h2>
        <label htmlFor="folder__name">Folder Name: </label>
        <input type="text" name="folder__name" id="folder__name"
          onChange={e => this.updateFolderName(e.target.value)}/>
        {this.state.folder.touched && (
          <ValidationError message={folderNameError} />
        )}

        <button 
          type="submit"
          disabled={folderNameError}
        >Submit</button>
      </form>
    )
  }
}