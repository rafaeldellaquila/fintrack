<template>
<div>
	<div class="font-bold" :class="[color]">
		{{ title }}
	</div>
	<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
		<USkeleton v-if="loading" class="h-8 w-full" />
		<span v-else>{{ currency }}</span>
	</div>
	<div>
		<USkeleton v-if="loading" class="h-6 w-full" />
		<span v-else class="flex space-x-1 items-center text-sm">
			<UIcon :name="icon" class="w-6 h-6" :class="{ green: trendingUp, red: !trendingUp }" />
			<div class="text-gray-500 dark:text-gray-400">
				{{ percentageTrend }} vs last period
			</div>
		</span>
	</div>
</div>
</template>

<script lang="ts" setup>
const { title, amount, lastAmount, color, loading } = defineProps({
	title: String,
	amount: {
		type: Number,
		default: 0
	},
	lastAmount: {
		type: Number,
		default: 0
	},
	color: String,
	loading: Boolean
});

const trendingUp = computed(() => amount >= lastAmount);
const icon = computed(() => trendingUp.value ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down');

const { currency } = useCurrency(amount);

console.log(amount, lastAmount)
const percentageTrend = computed(
	() => {
		if (amount === 0 || lastAmount === 0) return '-';

		const bigger = Math.max(amount, lastAmount);
		const lower = Math.min(amount, lastAmount);
		const ratio = ((bigger - lower) / lower) * 100;

		return `${Math.ceil(ratio)}%`;
	}
);
</script>

<style>
.green {
	@apply text-green-600 dark:text-green-400
}

.red {
	@apply text-red-600 dark:text-red-400
}
</style>