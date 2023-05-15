import { createContext, useCallback, useEffect, useState } from 'react'
import {
  Issue,
  Profile,
  getProfile,
  getRepoIssueById,
  getRepoIssues,
  getSearchIssues,
} from '../service/githubService'

interface IssueContextType {
  profile: Profile | null
  issues: Issue[] | null
  issue: Issue | null
  searchTerm: string
  getIssueData: (id: number) => void
  searchIssueData: (search: string) => void
}

export const IssueContext = createContext({} as IssueContextType)

interface IssueContextProviderProps {
  children: React.ReactNode
}

export const IssueContextProvider = ({
  children,
}: IssueContextProviderProps) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [issues, setIssues] = useState<Issue[] | null>(null)
  const [issue, setIssue] = useState<Issue | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const getIssueData = useCallback(
    async (id: number) => {
      if (!issue || issue.number !== id) {
        const data = await getRepoIssueById(id)
        setIssue(data)
      }
    },
    [issue]
  )

  const searchIssueData = useCallback(async (search: string) => {
    let data: Issue[] | null = []

    if (search === '') {
      data = await getRepoIssues()
    } else {
      const response = await getSearchIssues(search)
      data = response?.items || []
    }

    setSearchTerm(search)
    setIssues(data)
  }, [])

  useEffect(() => {
    const getProfileData = async () => {
      const data = await getProfile()
      setProfile(data)
    }

    const getIssuesData = async () => {
      const data = await getRepoIssues()
      setIssues(data)
    }

    getProfileData()
    getIssuesData()
  }, [])

  return (
    <IssueContext.Provider
      value={{
        issue,
        issues,
        profile,
        searchTerm,
        getIssueData,
        searchIssueData,
      }}
    >
      {children}
    </IssueContext.Provider>
  )
}
