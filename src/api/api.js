const host = "https://wedev-api.sky.pro/api/v2/leaderboard"

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
export async function postLeader({ nameInputElement, time, achievements }) {
  const response = await fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      time: time,
      achievements: achievements,
    }),
  })

  if (!response.status === 201) {
    throw new Error("Ошибка отправки")
  }

  const data = await response.json()
  return data
}
