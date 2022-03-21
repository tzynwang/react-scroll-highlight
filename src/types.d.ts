import React from 'react'

export interface Content {
  id: string
  classNames: string[]
  chapterTitle: string
  content: React.ReactNode
}

export type PartialContent = Partial<Content>
