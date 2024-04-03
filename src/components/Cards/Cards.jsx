import { shuffle } from "lodash"
import { useEffect, useState } from "react"
import { generateDeck, getTimerValue } from "../../utils/cards"
import styles from "./Cards.module.css"
import { EndGameModal } from "../../components/EndGameModal/EndGameModal"
import { Button } from "../../components/Button/Button"
import { Card } from "../../components/Card/Card"
import * as C from "../../const"
import { useGameMode } from "../../hooks/useGameMode"
import lifeHeartImageUrl from "./images/lifeHeart.png"
import alohomoraImageUrl from "./images/alohomora.png"
import cn from "classnames"

const lifeHeartImage = lifeHeartImageUrl
const alohomoraImage = alohomoraImageUrl

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([])

  // Текущий статус игры
  const [status, setStatus] = useState(C.STATUS_PREVIEW)

  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null)
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null)

  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  })

  // Подключаем easyMode
  const { isEasyMode } = useGameMode()
  const [lifes, setLifes] = useState(isEasyMode ? 3 : 1)

  // Подключаем алахамору
  const [usedAlohomora, setUsedAlohomora] = useState(false)

  function useAlohomora() {
    setUsedAlohomora(true)
  }

  useEffect(() => {
    if (usedAlohomora) {
      const notOpenedCards = cards.filter(card => !card.open)
      const randomCard = notOpenedCards[Math.floor(Math.random() * notOpenedCards.length)]
      const randomPair = notOpenedCards.filter(
        sameCards => randomCard.suit === sameCards.suit && randomCard.rank === sameCards.rank,
      )

      randomPair[1].open = true
      randomPair[0].open = true
      setUsedAlohomora(false)
    }
  }, [cards, usedAlohomora])

  function finishGame(status = C.STATUS_LOST) {
    setGameEndDate(new Date())
    setStatus(status)
  }
  function startGame() {
    const startDate = new Date()
    setGameEndDate(null)
    setGameStartDate(startDate)
    setTimer(getTimerValue(startDate, null))
    setStatus(C.STATUS_IN_PROGRESS)
  }
  function resetGame() {
    setLifes(isEasyMode ? 3 : 1)
    setGameStartDate(null)
    setGameEndDate(null)
    setTimer(getTimerValue(null, null))
    setStatus(C.STATUS_PREVIEW)
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card
      }

      return {
        ...card,
        open: true,
      }
    })

    setCards(nextCards)

    const isPlayerWon = nextCards.every(card => card.open)

    // Победа - все карты на поле открыты

    if (isPlayerWon) {
      finishGame(C.STATUS_WON)
      return
    }

    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open)

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank)

      if (sameCards.length < 2) {
        return true
      }

      return false
    })

    if (openCardsWithoutPair.length >= 2) {
      setTimeout(() => {
        openCardsWithoutPair[1].open = false
        openCardsWithoutPair[0].open = false
      }, 1000)
      setLifes(lifes - 1)
    }

    // ... игра продолжается
  }

  // "Игрок проиграл", т.к на поле есть две открытые карты без пары
  useEffect(() => {
    if (lifes === 0) {
      finishGame(C.STATUS_LOST)
      return
    }
  }, [lifes])

  const isGameEnded = status === C.STATUS_LOST || status === C.STATUS_WON

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== C.STATUS_PREVIEW) {
      return
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно")
      return
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10))
    })

    const timerId = setTimeout(() => {
      startGame()
    }, previewSeconds * 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [status, pairsCount, previewSeconds])

  // Обновляем значение таймера в интервале
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate))
    }, 300)
    return () => {
      clearInterval(intervalId)
    }
  }, [gameStartDate, gameEndDate])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === C.STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>

        {status === C.STATUS_IN_PROGRESS ? (
          <>
            <div onClick={useAlohomora} className={cn(styles.alohomoraBack, { [styles.notActive]: usedAlohomora })}>
              <img className={styles.alohomoraImg} src={alohomoraImage} alt="alohomora" />
            </div>
            <div className={styles.lifeText}>Количество жизней: {lifes}</div>
            <img className={styles.lifeHeart} src={lifeHeartImage} alt="life_heart" />
            <Button onClick={resetGame}>Начать заново</Button>
          </>
        ) : null}
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== C.STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === C.STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}
    </div>
  )
}
