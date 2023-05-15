import { useContext, useRef } from 'react'

import { IssueContext } from '../../../../contexts/issueContext'

import { SearchContainer } from './styles'

interface SearchIssueProps {
  publications: number
}

export const SearchIssue = ({ publications }: SearchIssueProps) => {
  const debounceRef = useRef<number | undefined>(undefined)
  const { searchTerm, searchIssueData } = useContext(IssueContext)

  const debounceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      const search = e.target.value
      if (search === '' || search.length > 3) {
        searchIssueData(e.target.value)
      }
    }, 500)
  }

  return (
    <SearchContainer>
      <div className="subtitle">
        <p>Publicações</p>
        <span>{`${publications} publicações`}</span>
      </div>

      <input
        placeholder="Buscar conteúdo"
        onChange={debounceInput}
        defaultValue={searchTerm}
      />
    </SearchContainer>
  )
}
