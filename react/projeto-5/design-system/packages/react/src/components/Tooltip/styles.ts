import * as Tooltip from '@radix-ui/react-tooltip'

import { styled } from '../../styles'

export const TooltipContent = styled(Tooltip.Content, {
  fontFamily: "$default",
  fontSize: "$sm",
  fontWeight: "$medium",
  lineHeight: "$short",
  color: "$gray100",
  
  padding: "$3 $4",
  borderRadius: "$sm",
  backgroundColor: '$gray900',
});

export const TooltipArrow = styled(Tooltip.Arrow, {
  fill: '$gray900',
});
