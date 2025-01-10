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
				:schema="schema"
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
				>
					Save
				</UButton>
			</UForm>
		</UCard>
	</UModal>
</template>

<script lang="ts" setup>
import { z } from 'zod';
import { CategoriesProps } from '~/types';
import { categories, transactionTypes } from '~/utils/constants';

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
		required: true
	}
});
const emits = defineEmits(['update:modelValue']);

const defaultSchema = z.object({
	amount: z.number().positive('Amount must be greater than 0'),
	created_at: z.string(),
	description: z.string().optional(),
});

const incomeSchema = z.object({
	type: z.literal('Income'),
});

const expenseSchema = z.object({
	type: z.literal('Expense'),
	category: z.nativeEnum(CategoriesProps)
});

const savingSchema = z.object({
	type: z.literal('Saving'),
});

const investmentSchema = z.object({
	type: z.literal('Investment'),
});

const schema = z.intersection(
	z.discriminatedUnion('type', [incomeSchema, expenseSchema, savingSchema, investmentSchema]),
	defaultSchema
);

const form = ref();

const save = async () => {
	if (form.value.errors.length) return;
};

const initialState = {
	type: undefined,
	amount: 0,
	created_at: undefined,
	description: undefined,
	category: undefined
};

const state = ref({ ...initialState });

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
