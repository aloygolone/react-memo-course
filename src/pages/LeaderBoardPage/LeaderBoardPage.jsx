import { Link } from "react-router-dom"
import styles from "./LeaderBoardPage.module.css"
import cn from "classnames"
import { Button } from "../../components/Button/Button"

export function LeaderBoardPage() {
  const List = [
    { id: 1, name: "Великий маг", time: 8 },
    { id: 2, name: "Карточный мастер", time: 12 },
    { id: 3, name: "Гениальный игрок", time: 31 },
  ]

  return (
    <>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.pagename}>Лидерборд</div>
          <Link to="/">
            <Button>Начать игру</Button>
          </Link>
        </div>
        <div className={styles.list}>
          <div className={cn(styles.listContent, styles.titleText)}>
            <div className={styles.position}>Позиция</div>
            <div className={styles.name}>Пользователь</div>
            <div className={styles.time}>Время</div>
          </div>
          {List.map(list => (
            <div className={cn(styles.listContent, styles.playerText)} key={list.id}>
              <div className={styles.position}># {list.id}</div>
              <div className={styles.name}>{list.name}</div>
              <div className={styles.time}>{list.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
