import React, {Component} from 'react';
import config from './config';
import ApiContext from './ApiContext';

export default class AddFolder extends Component {
  state = {
    folder : {
      name: ''
    }      
  }

  static contextType = ApiContext;

  updateFolderName(name){
    this.setState({folder: {name: name}});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { folder } = this.state;

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
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
    
    return (
      <form className="addFolder" onSubmit={e => this.handleSubmit(e)} style={{backgroundColor:"lightblue", padding:"10px"}}>
        <h2>Add Folder</h2>
        <label htmlFor="folder__name">Folder Name: </label>
        <input type="text" name="folder__name" id="folder__name"
          onChange={e => this.updateFolderName(e.target.value)}/>

        <button type="submit">Submit</button>
      </form>
    )
  }
}