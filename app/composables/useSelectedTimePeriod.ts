import { startOfYear, endOfYear, sub, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns'
import type { Period, ViewsProps } from '~/types'

export const useSelectedTimePeriod = (
  period: Ref<ViewsProps>
): { current: Ref<Period>; previous: Ref<Period> } => {

  if (!period.value) {
    const defaultPeriod: Period = { from: new Date(), to: new Date() };
    return {
      current: ref(defaultPeriod),
      previous: ref(defaultPeriod),
    };
  }

  const current = computed<Period>(() => {
    switch (period.value) {
      case 'Yearly':
        return { from: startOfYear(new Date()), to: endOfYear(new Date()) };
      case 'Monthly':
        return { from: startOfMonth(new Date()), to: endOfMonth(new Date()) };
      case 'Daily':
        return { from: startOfDay(new Date()), to: endOfDay(new Date()) };
      default:
        return { from: new Date(), to: new Date() };
    }
  });

  const previous = computed<Period>(() => {
    switch (period.value) {
      case 'Yearly':
        return {
          from: startOfYear(sub(new Date(), { years: 1 })),
          to: endOfYear(sub(new Date(), { years: 1 })),
        };
      case 'Monthly':
        return {
          from: startOfMonth(sub(new Date(), { months: 1 })),
          to: endOfMonth(sub(new Date(), { months: 1 })),
        };
      case 'Daily':
        return {
          from: startOfDay(sub(new Date(), { days: 1 })),
          to: endOfDay(sub(new Date(), { days: 1 })),
        };
      default:
        return { from: new Date(), to: new Date() };
    }
  });

  return { current, previous };
};