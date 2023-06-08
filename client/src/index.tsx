import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import '@styles/global.scss'
import store from './store'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from '@store/AuthProvieder'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
