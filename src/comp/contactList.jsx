import React, { Component } from 'react';
// React is the whole module (could be a class or an obj)
// Component is a class, where we can extend more methods of
// const Component = React.Component

class Contact extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("contact Id is", this.props.Id);
    return(
      <div className='contact'>
        <ul>
          <li>Name: {this.props.name}</li>
          <li>Phone: {this.props.phone}</li>
          <li>Birthday: {this.props.birthday}</li>
        </ul>
        <button onClick={() => this.props.edit(this.props.Id)} className="btn">Edit</button>
        <button onClick={() => this.props.delete(this.props.Id)} className="btn">Delete</button>
      </div>
    )
    
  }
}


class ContactList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          contacts: []
      }
  }

  componentDidMount() {
    fetch('/contact/', {
      method: 'GET',
    }).then(res => res.json())
    .then(json => {
      console.log("json:", json);
      // store the data (an array) in the state
      this.setState({
        contacts: json
      })
    })
    .catch((err) => {
      console.log("err:", err);
    })
  }

  deleteContact = (id) => {
    // fetch call to delete the contact from the database
    fetch('/contact/' + id, {
      method: 'DELETE',
    }).then(res => res.json())
    .then(json => {
      console.log("json:", json);
      // store the data (an array) in the state
      this.setState({
        // re-render page with updated contacts
        contacts: this.state.contacts.filter(item => item._id !== id)
      })
    })
    .catch((err) => {
      console.log("err:", err);
    })

  }

  onClick = (e) => {
    this.props.updateZero(); // go to create contact page
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>All Contacts</h1>
        <button onClick={this.onClick} className="btn">Create New</button>
        {this.state.contacts.map(obj => (
          <Contact key={obj._id} Id={obj._id} name={obj.name} phone={obj.phone} birthday={obj.birthday} edit={this.props.updateTwo} delete={this.deleteContact} />
        ))}      
      </div>
    );
  }
}

export default ContactList;
