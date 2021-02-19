
export const currencyFormatter = (value) => {
    return new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(
        value.toFixed(2)
    )
}