export enum ViewsProps {
	yearly = 'Yearly',
	monthly = 'Monthly',
	daily = 'Daily',
}

export enum CategoriesProps {
	food = 'Food',
	housing = 'Housing',
	transport = 'Transport',
	health = 'Health',
	education = 'Education',
	entertainment = 'Entertainment',
}

export enum TransactionTypesProps {
	income = 'Income',
	expense = 'Expense',
	saving = 'Saving',
	investment = 'Investment',
}

export interface TransactionProps {
	id: number;
	amount: number;
	category: CategoriesProps[];
	created_at: string;
	description: string;
	type: TransactionTypesProps;
}
