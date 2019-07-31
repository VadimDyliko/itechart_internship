import React from 'react';
import './ManageUsers.css';
import UserInline from '../UserInline/UserInline'

class ManageUsers extends React.PureComponent {


  inputHandler = e => {
    this.setState({input: e.target.value})
  }

  searchHandler = e => {
    e.preventDefault()
    this.props.searchHandler(this.state.input)
  }

  render() {
    return (<div className="manage-users">
      <form onSubmit={this.searchHandler} className="search__form">
        <input type="text" className="search__input form-control" onChange={this.inputHandler}/>
        <button type="submit" className="btn">Search</button>
      </form>
      {
        this.props.manageUsers.map(user=>{
          return <UserInline key={user._id} user={user}/>
        })
      }
    </div>)
  }
}

export default ManageUsers;
