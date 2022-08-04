export const currentDate = () =>
  formatDate(new Date().toISOString().substr(0, 10))

export const formatDate = (date) => {
  if (!date) return null
  const [year, month, day] = date.split('-')
  return `${day}-${month}-${year}`
}
export const parseDate = (date) => {
  if (!date) return null
  const [day, month, year] = date.split('-')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export const subtractDays = (dias) => {
  const date = new Date()
  date.setDate(date.getDate() - dias)
  return formatDate(date.toISOString().substr(0, 10))
}

export const firstDateMonth = () => {
  return formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .substr(0, 10))
}

export const lastDateMonth = () => {
  return formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    .toISOString()
    .substr(0, 10))
}
