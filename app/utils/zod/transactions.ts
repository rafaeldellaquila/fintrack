import { z } from 'zod';

import { CategoriesProps } from '~/types';

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

export const TransactionSchema = z.intersection(
	z.discriminatedUnion('type', [incomeSchema, expenseSchema, savingSchema, investmentSchema]),
	defaultSchema
);
