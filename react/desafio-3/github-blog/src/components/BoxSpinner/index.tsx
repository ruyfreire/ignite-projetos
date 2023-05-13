import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Box } from './styles'

export const BoxSpinner = () => {
  return (
    <Box>
      <FontAwesomeIcon icon={faSpinner} size="4x" spinPulse />
    </Box>
  )
}
