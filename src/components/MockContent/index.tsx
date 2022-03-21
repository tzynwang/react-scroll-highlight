import React, { memo } from 'react'
import type { MockContentProps } from './types'

function MockContent(props: MockContentProps): React.ReactElement {
  const { chapterTitle, oldContent, newContent } = props

  return (
    <div className="MockContentContainer">
      <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>
        {chapterTitle}
      </div>
      <div className="MockContent">
        <div className="MockContentLeft">{oldContent}</div>
        <div className="MockContentRight">{newContent}</div>
      </div>
    </div>
  )
}

export default memo(MockContent)
