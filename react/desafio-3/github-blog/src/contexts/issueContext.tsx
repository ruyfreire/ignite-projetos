import { createContext, useCallback, useEffect, useState } from 'react'
import {
  Issue,
  Profile,
  getProfile,
  getRepoIssueById,
  getRepoIssues,
} from '../service/githubService'

interface IssueContextType {
  profile: Profile | null
  issues: Issue[] | null
  issue: Issue | null
  getIssueData: (id: number) => void
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

  const getIssueData = useCallback(
    async (id: number) => {
      if (!issue || issue.number !== id) {
        const data = await getRepoIssueById(id)
        setIssue(data)
      }
    },
    [issue]
  )

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
        getIssueData,
      }}
    >
      {children}
    </IssueContext.Provider>
  )
}
