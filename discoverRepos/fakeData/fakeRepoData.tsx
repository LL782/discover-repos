import { RepoData } from '../model/RepoData'

export const description = 'test_description'
export const name = 'test_full_name'
export const stars = 999
export const url = 'http://test_html_url/'

export const fakeRepoData: RepoData = {
  created_at: '',
  full_name: name,
  html_url: url,
  language: '',
  description: description,
  stargazers_count: stars,
}
