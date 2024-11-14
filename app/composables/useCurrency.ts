export function useCurrency(amount: number | Ref<number>): Readonly<{ currency: ComputedRef<string> }> {
	const currency = computed(
		() => {
			return new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			}).format(isRef(amount) ? amount.value : amount);
		}
	);

	return {
		currency
	};
}
