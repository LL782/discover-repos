import { getServerSideProps } from '../pages/index'

const TODAY = '2020-01-30'
const SEVEN_DAYS_AGO = '2020-01-23'
jest.useFakeTimers().setSystemTime(new Date(TODAY))

const unmockedFetch = global.fetch

describe('Discover Repos', () => {
  describe('When getting server side props', () => {
    beforeAll(async () => {
      global.fetch = jest.fn().mockResolvedValue({ json: () => Promise })
      await getServerSideProps()
    })
    afterAll(() => {
      global.fetch = unmockedFetch
    })
    it('Calls GitHub for the most starred, recently created repos ', () => {
      const searchApi = 'https://api.github.com/search/'
      const createdQuery = `q=created:%3E${SEVEN_DAYS_AGO}`
      const highestStarsFirst = 'stars&order=desc'
      const expectedUrl = `${searchApi}repositories?${createdQuery}&sort=${highestStarsFirst}`
      expect(fetch).toHaveBeenCalledWith(expectedUrl)
    })
  })
})
