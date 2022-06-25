import dayjs from 'dayjs'
import Head from 'next/head'

import styles from '@/pages/index.module.css'
import { SearchReposRes } from 'DiscoverRepos/model/SearchReposRes'
import { RepoData } from 'DiscoverRepos/model/RepoData'
import { ShowResults } from '../DiscoverRepos'

interface Props {
  repos: RepoData[]
}

export default function DiscoverRepos({ repos }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Discover Repos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <ShowResults repos={repos} />
      </main>
    </div>
  )
}
export async function getServerSideProps() {
  const SEVEN_DAYS_AGO = dayjs().subtract(7, 'day').format('YYYY-MM-DD')

  const res = await fetch(
    `https://api.github.com/search/repositories?q=created:%3E${SEVEN_DAYS_AGO}&sort=stars&order=desc`
  )
  const { items }: SearchReposRes = await res.json()
  const topTen = items.slice(0, 10)
  const props: Props = { repos: topTen }
  return { props }
}
