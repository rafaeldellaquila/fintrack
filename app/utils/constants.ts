import type { TransactionTypesProps, ViewsProps } from '~/types'

export const transactionViews: ViewsProps[] = [
  'Yearly',
  'Monthly',
  'Daily'
]

export const transactionTypes: TransactionTypesProps[] = [
  'Income',
  'Expense',
  'Saving',
  'Investment'
]

export const categories = [
  'Food' ,
  'Housing' ,
  'Transport' ,
  'Health' ,
  'Education' ,
  'Entertainment'
] as const
