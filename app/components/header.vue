<template>
	<header class="flex justify-between items-center mt-10">
		<NuxtLink to="/" class="text-xl font-bold">Fintrack</NuxtLink>
		<UDropdown
		v-if="user"
		:items="items"
		:ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }"
		:popper="{ placement: 'bottom-start' }">

			<UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

			<template #account="{ item }">
				<div class="text-left">
					<p>Signed in as</p>
					<p class="truncate font-medium text-gray-900 dark:text-white">{{ item.label }}</p>
				</div>
			</template>

			<template #item="{ item }">
				<span class="truncate">{{ item.label }}</span>
				<UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
			</template>
	</UDropdown>
	</header>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const items = ref([
  [{
    label: user.value?.email ?? '...Loading',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    click: () => console.log('Link to settings in the future')
  }, {
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: async () => {
      await supabase.auth.signOut()
      return navigateTo('/login')
    }
  }]
])

</script>