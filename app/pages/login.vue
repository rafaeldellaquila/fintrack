<template>
<UCard v-if="!success">
  <template #header>
    Sign-in to Fintrack
  </template>
  <form @submit.prevent="handleLogin">
    <UFormGroup
      label="Email"
      :required="true"
      name="email"
      class="mb-4"
      help="You will receive an email with the confirmation link">
        <UInput v-model="email" type="email" placeholder="Email" />
    </UFormGroup>

    <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">Sign-in</UButton>
  </form>
</UCard>
<UCard v-else>
  <template #header>
    Email has been sent
  </template>

  <div class="text-center">
    <p class="mb-4">We have sent and email to <strong>{{ email }}</strong> with a sign-in link.</p>
    <p>
      <strong>Important:</strong> The link will expire in 5 minutes.
    </p>
  </div>
</UCard>
</template>

<script lang="ts" setup>
const success = ref(false)
const email = ref('')
const pending = ref(false)
const toast = useToast()
const supabase = useSupabaseClient()

useRedirectIfAuthenticated()
const handleLogin = async () => {
  pending.value = true
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://localhost:3000'
      }
    })

    if(error) {
      toast.add({
        title: 'Error authenticating',
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
        description: error.message
      })
    } else {
      success.value = true
    }

  } finally {
    pending.value = false
  }
}

</script>