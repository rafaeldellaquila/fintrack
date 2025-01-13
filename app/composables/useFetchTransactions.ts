import type { TransactionProps } from "~/types";

export const useFetchTransactions = () => {
const supabase = useSupabaseClient();
const transactions = ref<TransactionProps[]>([]);
const pending = ref(false);

const income = computed(() => transactions.value.filter((transaction) => transaction.type === 'Income'));
const expense = computed(() => transactions.value.filter((transaction) => transaction.type === 'Expense'));

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() => income.value.reduce((acc, transaction) => acc + transaction.amount, 0));
const expenseTotal = computed(() => expense.value.reduce((acc, transaction) => acc + transaction.amount, 0));

const fetchTransactions = async () => {
	pending.value = true;

	try {
		const { data: transactions } = await useAsyncData('transactions',
			async () => {
				const { data, error } = await supabase
					.from('transactions').select('*').order('created_at', { ascending: false });

				if (error) return [];
				return data;
			});

		return transactions.value ?? [];
	}
	catch (error) {
		console.error('error fetching transactions', error);
		return [];
	}
	finally {
		pending.value = false;
	}
};

const refresh = async () => transactions.value = await fetchTransactions();

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
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate,
      },
      income,
      expense,
      incomeTotal,
      expenseTotal,
      incomeCount,
      expenseCount
    },
    refresh,
    pending
  }
}
