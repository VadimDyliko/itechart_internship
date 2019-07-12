import React from 'react'
import './Book.css'

const Book = ({tittle, bookAthour, _id}) => {
  return (
    <div className="book">
      <h2>{tittle}</h2>
      <h3>{bookAthour}</h3>
      <p>{_id}</p>
    </div>

  )
}

export default Book
