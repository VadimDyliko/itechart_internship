import React from 'react';
import './ManageUsers.css';
import UserInline from '../UserInline/UserInline'

class ManageUser extends React.PureComponent {

  selectHandler = e => {
    this.props.filterHandler(e.target.value)
  }

  sortHandler = e => {
    this.props.sortHandler(e.target.value)
  }

  render() {
    return (<div className="manage-users">
      {
        this.props.manageUsers.map(user=>{
          return <UserInline key={user._id} user={user}/>
        })
      }
    </div>)
  }
}

export default ManageBooks;
