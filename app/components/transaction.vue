<template>
<div class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
	<div class="flex items-center justify-between space-x-4 col-span-2">
		<div class="flex items-center space-x-1">
			<UIcon :name="icon" :class="[iconColor]" />
			<span>{{ transaction.description }}</span>
		</div>
		<div>
			<UBadge v-if="transaction.category" color="white" class="capitalize">
				{{ transaction.category }}
			</UBadge>
		</div>
	</div>
	<div class="flex items-center justify-end space-x-2">
		<div>{{ currency }}</div>
		<div>
			<UDropdown :items="TransactionMenuItems" :popper="{ placement: 'bottom-start' }">
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
import { useAppToast } from '~/composables/useAppToast'
import type { TransactionProps } from '~/types'

const { transaction } = defineProps({
  transaction: {
    type: Object as PropType<TransactionProps>,
    required: true
  }
})

const emit = defineEmits(['delete'])

const isLoading = ref(false)
const { toastSuccess, toastError } = useAppToast()
const supabase = useSupabaseClient()
const { currency } = useCurrency(transaction.amount)

const isIncome = computed(() => transaction.type === 'Income')
const icon = computed(() => isIncome.value ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-up-left')
const iconColor = computed(() => isIncome.value ? 'text-green-600' : 'text-red-600')

const deleteTransaction = async () => {
  isLoading.value = true
  if(transaction.id === undefined) return

  try {
    await supabase.from('transactions').delete().eq('id', transaction.id)

    toastSuccess({
      title: 'Transaction deleted'
    })

    emit('delete', transaction.id)
  } catch (error) {
    console.error('error deleting transaction', error)
    toastError({
      title: 'Error deleting transaction'
    })
  } finally {
    isLoading.value = false
  }
}

const TransactionMenuItems = [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit')
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: deleteTransaction
  }]
]
</script>

<style scoped>
.container {
	@apply grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100
}
</style>