<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">
			Summary
		</h1>
		<div>
			<USelect
				v-model="viewSelected"
				:options="transactionViewOptions"
			/>
		</div>
	</section>

	<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
		<FinancialTrend />
		<FinancialTrend />
		<FinancialTrend />
		<FinancialTrend />
	</section>
</template>

<script setup lang="ts">
import FinancialTrend from '~/components/financial-trend.vue';
import { transactionViewOptions } from '~/utils/constants';

const viewSelected = ref(transactionViewOptions[1]);
</script>

<style></style>
