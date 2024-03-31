import styles from "./EndGameModal.module.css"

import { Button } from "../Button/Button"

import deadImageUrl from "./images/dead.png"
import celebrationImageUrl from "./images/celebration.png"
import submitImageUrl from "./images/submit.png"
import { Link } from "react-router-dom"
import { postLeader } from "../../api/api"

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const title = isWon ? "Вы попали в лидерборд!" : "Вы проиграли!"

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl

  const imgAlt = isWon ? "celebration emodji" : "dead emodji"

  const submitImg = submitImageUrl

  const nameInputElement = document.getElementById("name-input")

  // const buttonElement = document.getElementById("add-button");

  // const addNameByEnter = () => {
  //   document.addEventListener("keypress", function (e) {
  //     const key = e
  //     if (key === 13) {
  //       buttonElement.click()
  //     }
  //   })
  // }

  const time = `${gameDurationMinutes.toString().padStart("2", "0")}.${gameDurationSeconds
    .toString()
    .padStart("2", "0")}`

  const sumbitPostLeader = () => {
    postLeader({ nameInputElement, time })
  }

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isWon ? (
        <div className={styles.userblock}>
          <input id="name-input" type="text" className={styles.input} placeholder="Пользователь" />
          <img onClick={sumbitPostLeader} className={styles.submitImg} src={submitImg} alt="Отправить имя" />
        </div>
      ) : null}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>{time}</div>

      <Button onClick={onClick}>Начать сначала</Button>
      <Link to="/leaderboard">
        <div className={styles.leaderBoardLink}>Перейти к лидерборду</div>
      </Link>
    </div>
  )
}
