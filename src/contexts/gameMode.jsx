import { createContext, useState } from "react"

export const GameModeContext = createContext(null)

export const GameModeProvider = ({ children }) => {
  const [isSelected, setIsSelected] = useState(false)

  return <GameModeContext.Provider value={{ isSelected, setIsSelected }}>{children}</GameModeContext.Provider>
}
