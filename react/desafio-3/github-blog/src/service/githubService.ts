import { api } from './api'

export interface Profile {
  name: string
  login: string
  bio?: string
  company?: string
  avatar_url: string
  followers: number
  html_url: string
}

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const response = await api.get('users/ruyfreire')
    return response.data
  } catch (error) {
    return null
  }
}

interface searchIssueParams {
  q?: string
  repo?: string
}

export interface Issue {
  id: number
  title: string
  created_at: string
  number: number
  html_url: string
  body: string
  comments: number
  user: {
    login: string
  }
}

export const getRepoIssues = async (): Promise<Issue[] | null> => {
  try {
    const response = await api.get(
      `repos/rocketseat-education/reactjs-github-blog-challenge/issues`
    )
    return response.data
  } catch (error) {
    return null
  }
}

export const getSearchIssues = async (params: searchIssueParams) => {
  try {
    const response = await api.get('search/issues', { params })
    return response.data
  } catch (error) {
    return null
  }
}

export const getRepoIssueById = async (
  issueId: number
): Promise<Issue | null> => {
  try {
    const response = await api.get(
      `repos/rocketseat-education/reactjs-github-blog-challenge/issues/${issueId}`
    )
    return response.data
  } catch (error) {
    return null
  }
}
