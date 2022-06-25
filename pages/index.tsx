import dayjs from 'dayjs'
import Head from 'next/head'

import styles from '@/pages/index.module.css'
import { SearchReposRes } from 'discoverRepos/model/SearchReposRes'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Discover Repos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <h1>Hello World</h1>
      </main>
    </div>
  )
}
export async function getServerSideProps() {
  const SEVEN_DAYS_AGO = dayjs().subtract(7, 'day').format('YYYY-MM-DD')

  const res = await fetch(
    `https://api.github.com/search/repositories?q=created:%3E${SEVEN_DAYS_AGO}&sort=stars&order=desc`
  )
  const repos: SearchReposRes = await res.json()
  return { props: { repos } }
}
