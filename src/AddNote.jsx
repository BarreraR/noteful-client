import React, {Component} from 'react';
import config from './config';
import ApiContext from './ApiContext';

export default class AddNote extends Component {
  state = {
    noteName : {
      name: ''
    },
    noteFolderId : {
      folderId: ''
    },
    noteContent : {
      content: '', 
    }      
  }

  static contextType = ApiContext;

  updateNoteName(name){
    this.setState({noteName: {name: name}});
  }

  updateNoteFolderId(folderId){
    this.setState({noteFolderId: {folderId: folderId}});
  }

  updateNoteContent(content){
    this.setState({noteContent: {content: content}});
  }


  handleSubmit(event) {
    event.preventDefault();
    const { noteName, noteContent, noteFolderId } = this.state;
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(noteName, noteContent, noteFolderId)
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(note => {
      this.props.history.push(`/`);
      this.context.addNote(note);
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    const folders = this.context.folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>);
    console.log(folders)
    return (
      <form className="addFolder" onSubmit={e => this.handleSubmit(e)} style={{backgroundColor:"lightblue", padding:"10px"}}>
        <h2>Add Note</h2>
        
        <label htmlFor="note__name">Note Name: </label>
        <input type="text" name="note__name" id="note__name"
          onChange={e => this.updateNoteName(e.target.value)}/>
        <br/>
        <label htmlFor="note__folderId">Select Folder: </label>
        <select 
          onChange={e => this.updateNoteFolderId(e.target.value)}>
          {folders}
        </select>
        <br/>
        <label htmlFor="note__content">Note Content: </label>
        <textarea name="note__content" id="note__content" rows="5"
          onChange={e => this.updateNoteContent(e.target.value)}/>
        <br/>





        <button type="submit">Submit</button>
      </form>
    );
  }
}