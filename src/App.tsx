import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { debounce, cloneDeep, findLastIndex } from 'lodash'
import { faker } from '@faker-js/faker'

import DynamicList from './components/DynamicList'
import MockTitle from './components/MockTitle'
import MockContent from './components/MockContent'

import './App.css'
import type { Content, PartialContent } from './types'

const CONTENT: PartialContent[] = [
  {
    id: uuidv4(),
    classNames: ['AppSideHighlight']
  },
  {
    id: uuidv4(),
    classNames: ['']
  },
  {
    id: uuidv4(),
    classNames: ['']
  },
  {
    id: uuidv4(),
    classNames: ['']
  },
  {
    id: uuidv4(),
    classNames: ['']
  },
  {
    id: uuidv4(),
    classNames: ['']
  },
  {
    id: uuidv4(),
    classNames: ['']
  }
]

function App(): React.ReactElement {
  // states
  const [childrenTop, setChildrenTop] = useState<number[]>([])
  const [content, setContent] = useState<Content[]>([])
  const appMainRef = useRef<HTMLDivElement | null>(null)

  // functions
  const handleScroll = (e: Event) => {
    const scrollTarget = e.target as HTMLDivElement

    if (scrollTarget.scrollTop === 0) {
      const newContent = cloneDeep(content)
      newContent.forEach((c, index) => {
        if (index === 0 && !c.classNames.includes('AppSideHighlight')) {
          c.classNames.push('AppSideHighlight')
        } else {
          c.classNames = c.classNames.filter(
            (name) => name !== 'AppSideHighlight'
          )
        }
      })
      setContent(newContent)
    } else if (
      scrollTarget.scrollTop ===
      scrollTarget.scrollHeight - window.innerHeight
    ) {
      const newContent = cloneDeep(content)
      newContent.forEach((c, index) => {
        if (
          index === content.length - 1 &&
          !c.classNames.includes('AppSideHighlight')
        ) {
          c.classNames.push('AppSideHighlight')
        } else {
          c.classNames = c.classNames.filter(
            (name) => name !== 'AppSideHighlight'
          )
        }
      })
      setContent(newContent)
    } else {
      const childNode = appMainRef?.current?.children
      if (!childNode) return
      const childCurrentPosition = Array.from(childNode).map(
        (child) => child.getBoundingClientRect().top
      )
      const lastIndex = findLastIndex(
        childCurrentPosition,
        (child) => child < window.innerHeight / 2
      )
      const newContent = cloneDeep(content)
      newContent.forEach((c, index) => {
        if (index === lastIndex) {
          c.classNames.push('AppSideHighlight')
        } else {
          c.classNames = c.classNames.filter(
            (name) => name !== 'AppSideHighlight'
          )
        }
      })
      setContent(newContent)
    }
  }
  const debouncedHandleScroll = debounce(handleScroll, 400)
  const handleListClick = (index: number) => {
    appMainRef?.current?.scrollTo({
      top: childrenTop[index] - window.innerHeight / 5,
      left: 0,
      behavior: 'smooth'
    })
  }

  // hooks
  useEffect(() => {
    const newContent = cloneDeep(CONTENT)
    const finalContent = newContent.map((c, index) => {
      if (index === 0) {
        return {
          ...c,
          chapterTitle: 'summary',
          content: <MockTitle content="summary" />
        }
      }
      return {
        ...c,
        chapterTitle: `chapter ${index + 3}`,
        content: (
          <MockContent
            chapterTitle={`chapter ${index + 3}`}
            oldContent={faker.lorem.paragraphs(5, '\n\n')}
            newContent={faker.lorem.paragraphs(5, '\n\n')}
          />
        )
      }
    }) as Content[]
    setContent(finalContent)
  }, [])
  useEffect(() => {
    if (appMainRef?.current?.children) {
      setChildrenTop(
        Array.from(appMainRef?.current?.children).map((child) => child.getBoundingClientRect().top)
      )
    }
  }, [appMainRef?.current?.children])
  useEffect(() => {
    const target = appMainRef.current
    target?.addEventListener('scroll', debouncedHandleScroll)
    return () => {
      target?.removeEventListener('scroll', debouncedHandleScroll)
    }
  }, [appMainRef, debouncedHandleScroll])

  // main
  return (
    <div className="App">
      <div className="AppSide">
        <DynamicList list={content} handleListClick={handleListClick} />
      </div>
      <div className="AppMain" ref={appMainRef}>
        {content.map((c) => (
          <React.Fragment key={c.id}>{c.content}</React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default App
