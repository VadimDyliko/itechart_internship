import React from 'react'

const LogInBtn = ({clickHandler}) =>{

  return(
    <>
      <button className="btn btn-primary" onClick={clickHandler}>LogIn</button>
    </>
  )
}

export default LogInBtn
