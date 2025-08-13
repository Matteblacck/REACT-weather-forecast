// Функция для получения локального времени города
export const cityTimeZones: Record<string, string> = {
    MOSCOW: "Europe/Moscow",
    "SAINT-PETERSBURG": "Europe/Moscow",
    IRKUTSK: "Asia/Irkutsk", // UTC+8
    NOVOSIBIRSK: "Asia/Novosibirsk", // UTC+7
  };
export const getLocalTime = (city: string) => {
    const timeZone = cityTimeZones[city];
    return new Date().toLocaleTimeString("ru-RU", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Функция для получения локальной даты города
  export const getLocalDate = (city: string) => {
    const timeZone = cityTimeZones[city];
    return new Date().toLocaleDateString("en-US", {
      timeZone,
      weekday: "long",
    });
  };
  // Получаем текущий час с учетом часового пояса
  export const getCurrentLocalHour = (city: string) => {
    const timeZone = cityTimeZones[city];
    return new Date().toLocaleTimeString("en-US", {
      timeZone,
      hour: "numeric",
      hour12: false,
    });
  };