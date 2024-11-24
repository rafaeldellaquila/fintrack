import { defineEventHandler, readBody } from 'h3';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { tableName, query } = body;

	if (!tableName) throw createError({ statusCode: 400, message: 'Table name is required.' });

	const client = await serverSupabaseClient(event);

	const { data, error } = await client
		.from(tableName)
		.select('*')
		.match(query || {});

	if (error) throw createError({ statusCode: 500, message: error.message });
	return data;
});
