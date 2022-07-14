import React, { useState } from 'react'

export const AppContext = React.createContext({});

export const AppProvider = props => {
  const [currentState, setCurrentState] = useState(null);
  const handleState = value => {
    setCurrentState(value);
  }
  const contextValue = { handleState, currentState}
  return(
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )  
};
