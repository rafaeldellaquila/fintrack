import type { TransactionProps } from '~/types';

/**
 * Groups transactions by date, returning an array of objects
 * containing the date in the format DD/MM/YYYY and an array
 * of transactions that occurred on that date.
 *
 * The array is sorted by the date in descending order (newest
 * first).
 *
 * @param {Ref<TransactionProps[]>} transactions - The array of transactions.
 *
 * @returns {ComputedRef<{ date: string, transactions: TransactionProps[] }[]>} - The grouped transactions.
 */
export const useGroupedTransactionsByDate = (transactions: Ref<TransactionProps[]>) => {
	const transactionsGroupedByDate = computed(() => {
		if (!transactions.value) return [];

		const groupedTransactions: Record<string, TransactionProps[]> = {};

		for (const transaction of transactions.value || []) {
			const rawDate = new Date(transaction.created_at);
			const formattedDate = new Intl.DateTimeFormat('pt-BR').format(rawDate);

			if (!groupedTransactions[formattedDate]) groupedTransactions[formattedDate] = [];

			groupedTransactions[formattedDate].push(transaction);
		}

		const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
			const dateA = new Date(a.split('/').reverse().join('-'));
			const dateB = new Date(b.split('/').reverse().join('-'));

			return dateB.getTime() - dateA.getTime();
		});

		const data = sortedDates.map((date) => ({
			date,
			transactions: groupedTransactions[date],
		}));

		return data;
	});

	return {
		transactionsGroupedByDate
	};
};
