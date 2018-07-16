import React, { Component } from 'react';
// React is the whole module (could be a class or an obj)
// Component is a class, where we can extend more methods of
// const Component = React.Component

class EditContact extends Component {

  constructor(props) {
      super(props);
      this.state = {
          name: '',
          phone: '',
          birthday: null,
          id: ''
      }
  }

  componentDidMount() {
    let id = this.props.contactId;
    console.log("id is", id);

    fetch('/contact/' + id, {
      method: 'GET',
    }).then(res => res.json())
    .then(json => {
      console.log("json:", json);
      // store the data (an object) in the state
      this.setState({
        name: json.name,
        phone: json.phone,
        birthday: json.birthday,
        id: json._id
      })
    })
    .catch((err) => {
      console.log("err:", err);
    })
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onPhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  onBirthdayChange = (e) => {
    this.setState({
      birthday: e.target.value
    })
  }

  // update Contact
  onClick = (e) => {
    const {name, phone, birthday, id} = this.state
    
     fetch('/contact/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        birthday
      }) 
    }).then((res)=> {
      if(res.status === 200) {
        console.log("success:", res);
        // switch page to ContactList
        this.props.updateOne();
      } else {
        // error
        console.log("error:", res);
      }
    }).catch((err) => {
      // network error
      console.log("err:", err);
    })
  }

  onClickCancel = (e) => {
      console.log("canceled");
      // switch page to ContactList
      this.props.updateOne();
  }

  render() {
    return (
      <div className='contact'>
        {this.state.name ? (
          <div>
            <h3>Edit Contact</h3>
            <input type='text' onChange={this.onNameChange} className="field" value={this.state.name} placeholder="Name"/>
            <input type='text' onChange={this.onPhoneChange} className="field" value={this.state.phone} placeholder="Phone"/>
            <input type='date' onChange={this.onBirthdayChange} className="field" value={this.state.birthday} placeholder="Birthday"/>
            <button onClick={this.onClick} className="btn">Save</button>
            <button onClick={this.onClickCancel} className="btn">Cancel</button>
          </div>
        ) : 'You should not see this'}
      </div>
    )
  }
}

export default EditContact;
