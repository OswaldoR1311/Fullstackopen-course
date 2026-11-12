import React from 'react'

interface EntryProps {
  children: React.ReactNode
}

const divStyle = {
  borderStyle: 'solid',
  borderWidth: '2px',
}

const BaseEntry = ({ children }: EntryProps) => {
  return (
    <div style={divStyle}>
      {children}
    </div>
  )
}

export default BaseEntry
