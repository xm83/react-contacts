import React, { Component } from 'react';
// React is the whole module (could be a class or an obj)
// Component is a class, where we can extend more methods of
// const Component = React.Component

class CreateContact extends Component {
//   state = {
//     name: ''
//   }
// this is the modern industry way to set state; but because this setup is outdated, we still use the conventional way below:

  constructor(props) {
      super(props);
      this.state = {
          name: '',
          phone: '',
          birthday: null
      }
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

  onClick = (e) => {
    const {name, phone, birthday} = this.state
    // what this is basically doing: pulling the value corresponding to the key in the obj and creating a new variable with the same name, with that value assigned
    // const name = this.state.name

    // send data from browser back to server.js
    // fetch is a built-in function and is used to make ajax promises just like axios
    fetch('/contact/create', {
      method: 'POST',
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
      <div style={{textAlign: 'center'}}>
        <h1>Create Contact</h1>
        <input type='text' onChange={this.onNameChange} className="field" placeholder="Name"/>
        <input type='text' onChange={this.onPhoneChange} className="field" placeholder="Phone"/>
        <input type='date' onChange={this.onBirthdayChange} className="field" placeholder="Birthday"/>
        <button onClick={this.onClick} className="btn">Create</button>
        <button onClick={this.onClickCancel} className="btn">Cancel</button>
      </div>
    );
  }
}

export default CreateContact;
