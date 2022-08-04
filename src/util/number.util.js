
export const currencyFormatter = (value) => {
  return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
    Number(value).toFixed(2)
  )
}
