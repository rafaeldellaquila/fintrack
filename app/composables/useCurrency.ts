/**
 * Format a number as a currency string.
 *
 * @param {number | Ref<number>} amount
 * The number to format.
 *
 * @returns {Readonly<{ currency: ComputedRef<string> }>}
 * An object with a single property `currency`, containing a reactive string
 * representation of the formatted number in BRL.
 */
export function useCurrency(amount: number | Ref<number>): Readonly<{ currency: ComputedRef<string> }> {
  const currency = computed(
    () => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(isRef(amount) ? amount.value : amount)
    }
  )

  return {
    currency
  }
}
