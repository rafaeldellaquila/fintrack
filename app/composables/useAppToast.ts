export const useAppToast = () => {
  const toast = useToast()
  return {
    toastSuccess: ({title = 'Success message', description}:{title?: string, description?: string}) => {
      toast.add({
        title,
        icon: 'i-heroicons-check-circle',
        color: 'green',
        description
      })
    },
    toastError: ({title = 'Error message', description}: {title?: string, description?: string}) => {
      toast.add({
        title,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
        description
      })
    }
  }
}
