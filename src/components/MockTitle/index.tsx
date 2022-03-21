import React, { memo } from 'react'
import type { MockTitleProps } from './types'

function MockTitle(props: MockTitleProps): React.ReactElement {
  const { content } = props
  return <div className="MockTitle">{content}</div>
}

export default memo(MockTitle)
