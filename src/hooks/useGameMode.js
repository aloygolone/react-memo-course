import { useContext } from "react"
import { GameModeContext } from "../contexts/gameMode"

export function useGameMode() {
  return useContext(GameModeContext)
}
