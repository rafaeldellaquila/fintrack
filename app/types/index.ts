export enum Views {
	Yearly = 'Yearly',
	Monthly = 'Monthly',
	Daily = 'Daily',
}

export interface TransactionProps {
	id: number;
	amount: number;
	category: string;
	created_at: string;
	description: string;
	type: string;
}
