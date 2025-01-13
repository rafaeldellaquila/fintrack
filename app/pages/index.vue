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
			:amount="transactions.incomeTotal.value"
			:last-amount="100"
			:loading="pending"
		/>
		<Trend
			color="red"
			title="Expense"
			:amount="transactions.expenseTotal.value"
			:last-amount="100"
			:loading="pending"
		/>
		<Trend
			color="green"
			title="Investments"
			:amount="12000"
			:last-amount="100"
			:loading="pending"
		/>
		<Trend
			color="red"
			title="Saving"
			:amount="23000"
			:last-amount="143000"

			:loading="pending"
		/>
	</section>

	<section class="flex justify-between mb-10">
		<div>
			<h2 class="text-2xl font-extrabold">
				Transactions
			</h2>
			<div class="text-gray-500 dark:text-gray-400">
				You have {{ transactions.incomeCount.value }}
				incomes and {{ transactions.expenseCount.value }}
				expenses this period
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
				@saved="refresh()"
			/>
		</div>
	</section>

	<section v-if="!pending">
		<div
			v-for="({ date, transactions: transactionsOnDay }) in transactions.grouped.byDate.value"
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
				@delete="refresh()"
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
import { transactionViews } from '~/utils/constants';

const selectedView = ref(transactionViews[1]);
const isOpen = ref(false);

const {
	pending,
	refresh,
	transactions
} = useFetchTransactions()

await refresh();
</script>

<style>
.trends {
	@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10
}
</style>
