<template>
	<div class="container">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-1">
				<UIcon
					:name="icon"
					:class="[iconColor]"
				/>
				<span>{{ transaction.description }}</span>
			</div>
			<div>
				<UBadge
					v-if="transaction.category"
					color="white"
					class="capitalize"
				>
					{{ transaction.category }}
				</UBadge>
			</div>
		</div>
		<div class="flex items-center justify-end space-x-2">
			<div>{{ currency }}</div>
			<div>
				<UDropdown
					:items="TransactionMenuItems"
					:popper="{ placement: 'bottom-start' }"
				>
					<UButton
						color="white"
						variant="ghost"
						trailing-icon="i-heroicons-ellipsis-horizontal"
					/>
				</UDropdown>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { TransactionProps } from '~/types';

const { transaction } = defineProps({
	transaction: {
		type: Object as PropType<TransactionProps>,
		required: true
	}
});

const isIncome = computed(() => transaction.type === 'income');
const icon = computed(() => isIncome.value ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-up-left');
const iconColor = computed(() => isIncome.value ? 'text-green-600' : 'text-red-600');

const { currency } = useCurrency(transaction.amount);
</script>

<style scoped>
.container {
	@apply grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100
}
</style>
