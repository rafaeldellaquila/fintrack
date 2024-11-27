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
						:loading="isLoading"
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

const emit = defineEmits(['delete']);

const isLoading = ref(false);
const toast = useToast();
const supabase = useSupabaseClient();
const { currency } = useCurrency(transaction.amount);

const isIncome = computed(() => transaction.type === 'income');
const icon = computed(() => isIncome.value ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-up-left');
const iconColor = computed(() => isIncome.value ? 'text-green-600' : 'text-red-600');

const deleteTransaction = async () => {
	isLoading.value = true;

	try {
		await supabase.from('transactions').delete().eq('id', transaction.id);

		toast.add({
			title: 'Transaction deleted',
			icon: 'i-heroicons-check-circle',
			color: 'green'
		});

		emit('delete', transaction.id);
	}
	catch (error) {
		console.error('error deleting transaction', error);
		toast.add({
			title: 'Error deleting transaction',
			icon: 'i-heroicons-exclamation-circle',
			color: 'red'
		});
	}
	finally {
		isLoading.value = false;
	}
};

const TransactionMenuItems = [
	[{
		label: 'Edit',
		icon: 'i-heroicons-pencil-square-20-solid',
		click: () => console.log('Edit')
	}, {
		label: 'Delete',
		icon: 'i-heroicons-trash-20-solid',
		click: deleteTransaction
	}],
];
</script>

<style scoped>
.container {
	@apply grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100
}
</style>
