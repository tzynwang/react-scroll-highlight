import React, { memo } from 'react'
import type { MockContentProps } from './types'

function MockContent(props: MockContentProps): React.ReactElement {
  const { chapterTitle } = props

  return (
    <div className="MockContentContainer">
      <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>
        {chapterTitle}
      </div>
      <div className="MockContent">
        <div className="MockContentLeft">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit expedita
          deserunt exercitationem consequatur, eveniet excepturi dolores vero
          deleniti? Nobis necessitatibus beatae natus ipsa eum error aliquid id
          esse! A, officia!
        </div>
        <div className="MockContentRight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          excepturi eius! Velit nostrum laborum adipisci in est veniam ea, a
          possimus, dicta illum ullam, autem quisquam obcaecati! Quae, atque
          cupiditate!
        </div>
      </div>
    </div>
  )
}

export default memo(MockContent)
