import dayjs from 'dayjs'
import Head from 'next/head'

import styles from '@/pages/index.module.css'
import { SearchReposRes } from 'discoverRepos/model/SearchReposRes'
import { RepoData } from 'discoverRepos/model/RepoData'

interface Props {
  repos: RepoData[]
}

export default function Home({ repos }: Props) {
  const topTen = repos.slice(0, 10)

  const repoLinks = topTen.map((r) => (
    <a href={r.html_url} key={r.html_url}>
      {r.full_name}
    </a>
  ))

  return (
    <div className={styles.container}>
      <Head>
        <title>Discover Repos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>{repoLinks}</main>
    </div>
  )
}
export async function getServerSideProps() {
  const SEVEN_DAYS_AGO = dayjs().subtract(7, 'day').format('YYYY-MM-DD')

  const res = await fetch(
    `https://api.github.com/search/repositories?q=created:%3E${SEVEN_DAYS_AGO}&sort=stars&order=desc`
  )
  const { items }: SearchReposRes = await res.json()
  const props: Props = { repos: items }
  return { props }
}
