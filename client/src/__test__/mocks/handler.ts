import { rest } from 'msw'

export const handlers = [
  rest.get('', (req, res, ctx) => {
    return res(ctx.json([{ name: '전다훈' }]))
  }),
  rest.get('', (req, res, ctx) => {
    return res(ctx.json([{ name: '전다훈' }]))
  }),
]
