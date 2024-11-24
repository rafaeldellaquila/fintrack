import { ref } from 'vue';

export function useSupabase<T>(tableName: string, query?: Record<string, unknown>) {
	const data = ref<T[] | null>(null);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const fetch = async () => {
		loading.value = true;
		error.value = null;

		try {
			const response = await $fetch<T[]>(`/api/table`, {
				method: 'POST',
				body: { tableName, query },
			});

			data.value = response;
		}
		catch (err: unknown) {
			console.log('useSupabase error', err);
			error.value = err instanceof Error ? err.message : 'Unknown error';
		}
		finally {
			loading.value = false;
		}
	};

	return {
		data,
		loading,
		error,
		fetch,
	};
}
