<template>
	<UModal
		v-model="isOpen"
		@update:model-value="updateIsOpen"
	>
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				Add Transaction
			</template>

			<UForm
				ref="form"
				:state="state"
				:schema="TransactionSchema"
				@submit.prevent="save"
			>
				<UFormGroup
					label="Transaction Type"
					:required="true"
					name="type"
					class="mb-4"
				>
					<USelect
						v-model="state.type"
						placeholder="Select the transaction type"
						:options="transactionTypes"
					/>
				</UFormGroup>

				<UFormGroup
					label="Amount"
					:required="true"
					name="amount"
					class="mb-4"
				>
					<UInput
						v-model.number="state.amount"
						type="number"
						placeholder="Amount"
					/>
				</UFormGroup>

				<UFormGroup
					label="Transaction Date"
					:required="true"
					name="created_at"
					class="mb-4"
				>
					<UInput
						v-model="state.created_at"
						type="date"
						icon="i-heroicons-calendar-days-20-solid"
					/>
				</UFormGroup>

				<UFormGroup
					label="Description"
					hint="Optional description of the transaction"
					name="description"
					class="mb-4"
				>
					<UInput
						v-model="state.description"
						placeholder="Description"
					/>
				</UFormGroup>

				<UFormGroup
					v-if="state.type === 'Expense'"
					label="Category"
					name="category"
					class="mb-4"
				>
					<USelect
						v-model="state.category"
						:required="true"
						placeholder="Category"
						:options="categories"
					/>
				</UFormGroup>

				<UButton
					type="submit"
					color="black"
					variant="solid"
					:loading="isLoading"
				>
					Save
				</UButton>
			</UForm>
		</UCard>
	</UModal>
</template>

<script lang="ts" setup>
import { CategoriesProps, TransactionTypesProps, type TransactionProps } from '~/types';
import { categories, transactionTypes } from '~/utils/constants';
import { TransactionSchema } from '~/utils/zod/transactions';

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
		required: true
	}
});

const emits = defineEmits(['update:modelValue', 'saved']);
const initialState: TransactionProps = {
	type: TransactionTypesProps.income,
	amount: 0,
	created_at: '',
	description: '',
	category: undefined,
};

const state = ref({ ...initialState });


const supabase  = useSupabaseClient<TransactionProps>();
const toast = useToast();
const form = ref();
const isLoading = ref(false);

const save = async () => {
	if (form.value.errors.length) return;

	isLoading.value = true;
	try {
		console.log('state', state.value);
		const { error } = await supabase.from('transactions').upsert({
			...state.value
		});

		if (!error) {
			toast.add({
				title: 'Success',
				icon: 'i-heroicons-check-circle',
				description: 'Transaction saved successfully',
			});

			isOpen.value = false;
		}
	}
	catch (e) {
		if (e instanceof Error) {
    toast.add({
      title: 'Error',
      icon: 'i-heroicons-check-circle',
      description: e.message,
      color: 'red'
    });
  }
	}
	finally {
		isLoading.value = false;
	}
};

const resetForm = () => {
	Object.assign(state.value, initialState);
	form.value.clear();
};

const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => {
		if (!value) resetForm();
		emits('update:modelValue', value);
	}
});

const updateIsOpen = (value: boolean) =>	isOpen.value = value;
</script>
