import { Link } from "react-router-dom"
import styles from "./SelectLevelPage.module.css"
import Checkbox from "../../components/Checkbox/Checkbox"
import { useGameMode } from "../../hooks/useGameMode"

export function SelectLevelPage() {
  const { isSelected, setIsSelected } = useGameMode()
  const selectGameMode = () => {
    setIsSelected(prevState => !prevState)
    console.log(isSelected)
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        {/* 1. Создаем контекст который будет передавать данные режима */}
        {/* 2. отобразить количество попыток в компоненте cards, там же будет состояние попыток */}
        {/* 3. нужно в cards в OpenCard мы должны создать условие если включен режим */}
        {/* 4.  если ровно 2 карточки без пары, а попытки еще остались то мы должны перевернуть карточки без пары и вычесть попытку*/}
        <Checkbox id={"modeCheckbox"} name={"modeCheckbox"} label={"Игра до 3 ошибок"} onClick={selectGameMode()} />
      </div>
    </div>
  )
}
