<template>
  <UCard>
    <template #header>
      Confirm
    </template>

    <div class="text-center">
      <p class="mb-4">
        Wait a moment while we sign you in...
      </p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
useRedirectIfAuthenticated()
</script>