<template>
	<div class="container">
		<div class="flex items-center justify-between">
			{{ date }}
		</div>
		<div class="flex items-center justify-end mr-10">
			{{ currency }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { TransactionProps } from '~/types';

const { date, transactions } = defineProps({
	date: String,
	transactions: Array
});

const sum = computed(() =>
	(transactions as TransactionProps[]).reduce((acc, transaction) => {
		if (transaction.type === 'Income') acc += transaction.amount;
		else acc -= transaction.amount;
		return acc;
	}, 0)
);

const { currency } = useCurrency(sum);
</script>

<style scoped>
.container {
	@apply grid grid-cols-2 py-4 border-b border-gray-200  text-gray-500  font-bold;
	@apply dark:border-gray-800 dark:text-gray-400;
}
</style>
