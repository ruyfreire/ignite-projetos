import styled from 'styled-components'

export const HistoryContainer = styled.main`
  padding: 3.125rem 3.5rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 2.375rem;
    color: ${(props) => props.theme['gray-100']};
    margin-bottom: 2rem;
  }
`

export const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  border-radius: 8px 8px 0 0;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    thead {
      tr {
        background: ${(props) => props.theme['gray-600']};
        font-size: 0.875rem;
        line-height: 1.6;
        font-weight: bold;
        color: ${(props) => props.theme['gray-100']};
        text-align: left;
        padding: 0 1rem;
      }

      th {
        padding: 1rem;

        &:first-child {
          padding-left: 2rem;
        }

        &:last-child {
          padding-right: 2rem;
        }
      }
    }

    tbody {
      tr {
        background: ${(props) => props.theme['gray-700']};
        border-top: 4px solid ${(props) => props.theme['gray-800']};
        color: ${(props) => props.theme['gray-300']};
        font-size: 0.875rem;
        line-height: 1.6;
      }

      td {
        padding: 1rem;

        &:first-child {
          padding-left: 2rem;
          width: 50%;
        }

        &:last-child {
          padding-right: 2rem;
        }
      }
    }
  }
`

const STATUS_COLOR = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};
  }
`
