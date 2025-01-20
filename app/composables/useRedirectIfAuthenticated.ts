export const useRedirectIfAuthenticated = (url: string = '/') => {
  const user = useSupabaseUser()

  watch(user, () => {
    if(user.value) return navigateTo(url)
  }, { immediate: true })

  return {
    user
  }
}
