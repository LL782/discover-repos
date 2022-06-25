import { rest } from 'msw'

import { reposResponse } from './responses/gitHubSearchRepos'

export const handlers = [
  rest.get('https://api.github.com/search/repositories', (_, res, ctx) => {
    return res(ctx.json(reposResponse))
  }),
]
