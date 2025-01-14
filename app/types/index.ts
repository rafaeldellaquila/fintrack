export type ViewsProps = 'Yearly' | 'Monthly' | 'Daily';

export type Period = {
  from: Date;
  to: Date;
};

export type CategoriesProps = 'Food' | 'Housing' | 'Transport' | 'Health' | 'Education' | 'Entertainment';

export type TransactionTypesProps = 'Income' | 'Expense' | 'Saving' | 'Investment';

export interface TransactionProps {
	id?: number;
	amount: number;
	category?: CategoriesProps;
	created_at: string;
	description?: string;
	type: TransactionTypesProps;
}
