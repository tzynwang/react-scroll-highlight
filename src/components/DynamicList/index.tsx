import React, { memo } from 'react'
import classNames from 'classnames'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import type { Content } from '../../types'

interface DynamicListProps {
  list: Content[]
  handleListClick: (index: number) => void
}

function DynamicList(props: DynamicListProps): React.ReactElement {
  const { list, handleListClick } = props

  return (
    <List>
      {list.map((l, index) => (
        <ListItem
          key={l.id}
          onClick={() => handleListClick(index)}
          className={classNames(l.classNames)}
          disablePadding
        >
          <ListItemButton>
            <ListItemText primary={l.chapterTitle} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default memo(DynamicList)
