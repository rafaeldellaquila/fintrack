<template>
	<UModal
		v-model="isOpen"
		@update:model-value="updateIsOpen"
	>
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				Add Transaction
			</template>
			<div>Hello!</div>
		</UCard>
	</UModal>
</template>

<script lang="ts" setup>
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
		required: true
	}
});

const emits = defineEmits(['update:modelValue']);

const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => emits('update:modelValue', value)
});

const updateIsOpen = (value: boolean) =>	isOpen.value = value;
</script>
