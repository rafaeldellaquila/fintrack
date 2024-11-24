import { ref } from 'vue';

/**
 * Fetches data from a Supabase table using the `api/table` endpoint.
 *
 * @param tableName - The name of the table to fetch data from.
 * @param query - An optional query object to filter the data.
 *
 * @returns An object containing the following reactive properties:
 * - `data`: The fetched data, or `null` if the fetch failed.
 * - `loading`: Whether the fetch is currently in progress.
 * - `error`: The error message, if any.
 * - `fetch`: A function to re-run the fetch.
 */
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
