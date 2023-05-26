import { rest } from 'msw'

const url = 'http://localhost:40001/api'

export const handlers = [
  rest.post(`${url}/search`, (req, res, ctx) => {
    return res(ctx.json([{ keyword: '복음밥' }]))
  }),
  rest.get('', (req, res, ctx) => {
    return res(ctx.json([{ name: '전다훈' }]))
  }),
]
