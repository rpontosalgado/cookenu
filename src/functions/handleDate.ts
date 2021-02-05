export function formatDateTime (date: Date): string {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dateTimeString = `${day}/${month+1}/${year}, ${hour}:${minutes}:${seconds}`
  return dateTimeString
}