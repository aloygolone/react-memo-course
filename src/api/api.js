const host = "https://wedev-api.sky.pro/api/leaderboard"

// Получить leaderboard
export async function getLeaderList() {
  const response = await fetch(host, { method: "GET" })

  if (!response.status === 200) {
    throw new Error("Ошибка получения")
  }

  const data = await response.json()
  return data
}

// Добавить лидера в список
export async function postLeader() {
  const response = await fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: "Пользователь",
      time: 8,
    }),
  })

  if (!response.status === 201) {
    throw new Error("Ошибка отправки")
  }

  const data = await response.json()
  return data
}
