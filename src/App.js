import './App.css';
import React, { Component } from 'react';
import CreateContact from './comp/createContact';
import ContactList from './comp/contactList';
import EditContact from './comp/editContact';

class App extends Component {

  constructor() {
    super();
    this.state = {
      page: 1,
      contactId: ''
    }
  }

  // CreateContact
  updateZero = () => {
    this.setState({
      page: 0
    })
  }
  // ContactList
  updateOne = () => {
    this.setState({
      page: 1
    })
  }
  // EditContact
  updateTwo = (contactId) => {
    this.setState({
      contactId: contactId,
      page: 2
    })
  }

  render() {
    let display;
    if (this.state.page === 0) {
      display = (
        <div> 
          <CreateContact updateOne={this.updateOne}/>
        </div>
        );
    } else if (this.state.page === 1) {
      display = (
        <div>
          <ContactList updateOne={this.updateOne} updateZero={this.updateZero} updateTwo = {this.updateTwo} contactId={this.state.contactId}/>
        </div>
      )
    } else if(this.state.page === 2) {
      display = (
        <div>
          <EditContact updateOne={this.updateOne} contactId={this.state.contactId}/>
        </div>
      )
    }

    return (
      <div>
        {display}
      </div>
      
    )
  }
}

export default App;
