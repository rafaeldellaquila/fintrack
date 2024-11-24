import { Views } from '~/types';

export const transactionViewOptions: Views[] = [
	Views.Yearly,
	Views.Monthly,
	Views.Daily];

export const TransactionMenuItems = [
	[{
		label: 'Edit',
		icon: 'i-heroicons-pencil-square-20-solid',
		click: () => console.log('Edit')
	}, {
		label: 'Delete',
		icon: 'i-heroicons-trash-20-solid',
		click: () => console.log('Delete')
	}],
];
