import React from 'react';
import './Log.css'

class Log extends React.PureComponent {

  selectHandler = e => {
    this.props.suGetLog(e.target.value)
  }

  render () {
    let log = this.props.log?(
      <>
        {
          this.props.log.map((item, i) => {
            return <div className='log__item' key={item.date+i}>{i+1}) ({item.date}) --- {item.message}</div>
          })
        }
      </>
    ):null
    return (
      <div className="log">
      <span>Show last: </span><select className="log__select" onChange={this.selectHandler}>
        <option>20</option>
        <option>50</option>
        <option>100</option>
        <option>200</option>
      </select>
        {log}
      </div>
    )
  }
}

export default Log;
