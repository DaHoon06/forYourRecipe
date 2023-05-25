import { setupWorker } from 'msw'
import { handlers } from './handler'

export const Worker = setupWorker(...handlers)
