<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">
			Summary
		</h1>
		<div>
			<USelect
				v-model="selectedView"
				:options="transactionViewOptions"
			/>
		</div>
	</section>

	<section class="trends">
		<Trend
			color="green"
			title="Income"
			:amount="5000"
			:last-amount="1300"
			:loading="false"
		/>
		<Trend
			color="red"
			title="Expense"
			:amount="100"
			:last-amount="10230"
			:loading="false"
		/>
		<Trend
			color="green"
			title="Investments"
			:amount="12000"
			:last-amount="100"
			:loading="false"
		/>
		<Trend
			color="red"
			title="Saving"
			:amount="23000"
			:last-amount="143000"

			:loading="false"
		/>
	</section>

	<section>
		<Transaction
			v-for="transaction in transactions"
			:key="transaction.id"
			:transaction="transaction"
		/>
	</section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Transaction from '~/components/transaction.vue';
import Trend from '~/components/trend.vue';
import { useSupabase } from '~/composables/useSupabase';
import type { TransactionProps } from '~/types';
import { transactionViewOptions } from '~/utils/constants';

const selectedView = ref(transactionViewOptions[1]);
const { data: transactions, fetch: fetchTransactions } = useSupabase<TransactionProps>('transactions');

onMounted(() => {
	fetchTransactions();
});
</script>

<style>
.trends {
	@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10
}
</style>
