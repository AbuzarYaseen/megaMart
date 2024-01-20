import React from 'react'

const protectedRoutes = ({Component}) => {
  return (
    <div>
      <Component/>
    </div>
  )
}

export default protectedRoutes
