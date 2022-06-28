import '@testing-library/react'
import { getServerSideProps } from '../pages'

const TODAY = '2020-01-30'
const SEVEN_DAYS_AGO = '2020-01-23'
jest.useFakeTimers().setSystemTime(new Date(TODAY))

const unmockedFetch = global.fetch
const fakeResponse = { json: () => Promise.resolve({ items: [] }) }

describe('index page', () => {
  it('Calls GitHub for the most starred repos created within the last seven days', async () => {
    global.fetch = jest.fn().mockResolvedValue(fakeResponse)
    await getServerSideProps()

    const searchApi = 'https://api.github.com/search/'
    const createdQuery = `q=created:%3E${SEVEN_DAYS_AGO}`
    const highestStarsFirst = 'stars&order=desc'
    const expectedUrl = `${searchApi}repositories?${createdQuery}&sort=${highestStarsFirst}`
    expect(fetch).toHaveBeenCalledWith(expectedUrl)

    global.fetch = unmockedFetch
  })
})
