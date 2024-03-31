import { Button } from "../../components/Button/Button"

export function LeaderBoardPage() {
  const List = [
    { id: 1, name: "Великий маг", time: 8 },
    { id: 2, name: "Карточный мастер", time: 12 },
    { id: 3, name: "Гениальный игрок", time: 31 },
  ]

  return (
    <>
      <div>Лидерборд</div>
      <Button>Начать игру</Button>
      <ul>
        <li>
          <div>Позиция</div>
          <div>Пользователь</div>
          <div>Время</div>
        </li>
        {List.map(list => (
          <li>
            <div># {list.id}</div>
            <div>{list.name}</div>
            <div>{list.time}</div>
          </li>
        ))}
      </ul>
    </>
  )
}
