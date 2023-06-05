import { QueryClient } from 'react-query'

const queryErrorHandler = (error: unknown): void => {
  const message = error instanceof Error ? error.message : 'ERROR,'
  console.log(message)
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
})
