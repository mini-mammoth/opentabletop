import React, { useContext } from 'react'

const StageContext = React.createContext()

function StageContext(props) {
  const { width, height, children } = props

  const context = useContext(StageContext)

  return (
    <StageContext.Provider value={}>
      {children}
    </StageContext.Provider>
  )
}

export {}
