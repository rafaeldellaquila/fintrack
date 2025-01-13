<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">
			Summary
		</h1>
		<div>
			<USelect
				v-model="selectedView"
				:options="transactionViews"
			/>
		</div>
	</section>

	<section class="trends">
		<Trend
			color="green"
			title="Income"
			:amount="incomeTotal"
			:last-amount="100"
			:loading="isLoading"
		/>
		<Trend
			color="red"
			title="Expense"
			:amount="expenseTotal"
			:last-amount="100"
			:loading="isLoading"
		/>
		<Trend
			color="green"
			title="Investments"
			:amount="12000"
			:last-amount="100"
			:loading="isLoading"
		/>
		<Trend
			color="red"
			title="Saving"
			:amount="23000"
			:last-amount="143000"

			:loading="isLoading"
		/>
	</section>

	<section class="flex justify-between mb-10">
		<div>
			<h2 class="text-2xl font-extrabold">
				Transactions
			</h2>
			<div class="text-gray-500 dark:text-gray-400">
				You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this period
			</div>
		</div>
		<div>
			<UButton
				icon="i-heroicons-plus-circle"
				color="white"
				variant="solid"
				label="Add"
				@click="isOpen = true"
			/>
			<TransactionModal
				v-model="isOpen"
				@saved="refreshTransactions()"
			/>
		</div>
	</section>

	<section v-if="!isLoading">
		<div
			v-for="({ date, transactions: transactionsOnDay }) in transactionsGroupedByDate"
			:key="date"
			class="mb-10"
		>
			<TransactionDailySummary
				:date="date"
				:transactions="transactionsOnDay"
			/>
			<Transaction
				v-for="transaction in transactionsOnDay"
				:key="transaction.id"
				:transaction="transaction"
				@delete="refreshTransactions()"
			/>
		</div>
	</section>
	<section v-else>
		<USkeleton
			v-for="i in 4"
			:key="i"
			class="h-8 w-full mb-2"
		/>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TransactionDailySummary from '~/components/transaction-daily-summary.vue';
import Transaction from '~/components/transaction.vue';
import Trend from '~/components/trend.vue';
import type { TransactionProps } from '~/types';
import { transactionViews } from '~/utils/constants';

const selectedView = ref(transactionViews[1]);
const transactions = ref<TransactionProps[]>([]);
const supabase = useSupabaseClient();
const isLoading = ref(false);
const isOpen = ref(false);

const income = computed(() => transactions.value.filter((transaction) => transaction.type === 'Income'));
const expense = computed(() => transactions.value.filter((transaction) => transaction.type === 'Expense'));

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() => income.value.reduce((acc, transaction) => acc + transaction.amount, 0));
const expenseTotal = computed(() => expense.value.reduce((acc, transaction) => acc + transaction.amount, 0));

const fetchTransactions = async () => {
	isLoading.value = true;

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
		isLoading.value = false;
	}
};

const refreshTransactions = async () => transactions.value = await fetchTransactions();

const { transactionsGroupedByDate } = useGroupedTransactionsByDate(
	transactions as Ref<TransactionProps[]>
);

await refreshTransactions();
</script>

<style>
.trends {
	@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10
}
</style>
