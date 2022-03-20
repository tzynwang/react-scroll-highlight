import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { debounce, cloneDeep, findLastIndex } from "lodash";
import classNames from "classnames";

import "./App.css";
import type { MockContentProps, Content } from "./types";

function MockTitle(): React.ReactElement {
  return <div className="MockTitle">Summary</div>;
}

function MockContent(props: MockContentProps): React.ReactElement {
  const { chapterTitle } = props;

  return (
    <div>
      <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>
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
  );
}

const CONTENT: Content[] = [
  {
    id: uuidv4(),
    classNames: [""],
    chapterTitle: "summary",
    content: <MockTitle />,
  },
  {
    id: uuidv4(),
    classNames: [""],
    chapterTitle: "chapter 3",
    content: <MockContent chapterTitle="chapter 3" />,
  },
  {
    id: uuidv4(),
    classNames: [""],
    chapterTitle: "chapter 6",
    content: <MockContent chapterTitle="chapter 6" />,
  },
  {
    id: uuidv4(),
    classNames: [""],
    chapterTitle: "chapter 10",
    content: <MockContent chapterTitle="chapter 10 " />,
  },
  {
    id: uuidv4(),
    classNames: [""],
    chapterTitle: "chapter 11",
    content: <MockContent chapterTitle="chapter 11" />,
  },
  {
    id: uuidv4(),
    classNames: [""],
    chapterTitle: "chapter 14",
    content: <MockContent chapterTitle="chapter 14" />,
  },
  {
    id: uuidv4(),
    classNames: [""],
    chapterTitle: "chapter 17",
    content: <MockContent chapterTitle="chapter 17" />,
  },
];

function App(): React.ReactElement {
  // states
  const [childrenTop, setChildrenTop] = useState<number[]>([]);
  const [content, setContent] = useState<Content[]>(CONTENT);
  const appMainRef = useRef<HTMLDivElement | null>(null);

  // functions
  const handleScroll = (e: Event) => {
    const scrollTarget = e.target as HTMLDivElement;

    if (scrollTarget.scrollTop === 0) {
      const newContent = cloneDeep(content);
      newContent.forEach((c, index) => {
        if (index === 0 && !c.classNames.includes("AppSideHighlight")) {
          c.classNames.push("AppSideHighlight");
        } else {
          c.classNames = c.classNames.filter(
            (name) => name !== "AppSideHighlight"
          );
        }
      });
      setContent(newContent);
    } else if (
      scrollTarget.scrollTop ===
      scrollTarget.scrollHeight - window.innerHeight
    ) {
      const newContent = cloneDeep(content);
      newContent.forEach((c, index) => {
        if (
          index === content.length - 1 &&
          !c.classNames.includes("AppSideHighlight")
        ) {
          c.classNames.push("AppSideHighlight");
        } else {
          c.classNames = c.classNames.filter(
            (name) => name !== "AppSideHighlight"
          );
        }
      });
      setContent(newContent);
    } else {
      const childNode = appMainRef?.current?.children;
      if (!childNode) return;
      const childCurrentPosition = Array.from(childNode).map(
        (child) => child.getBoundingClientRect().top
      );
      const lastIndex = findLastIndex(
        childCurrentPosition,
        (child) => child < window.innerHeight / 2
      );
      const newContent = cloneDeep(content);
      newContent.forEach((c, index) => {
        if (index === lastIndex) {
          c.classNames.push("AppSideHighlight");
        } else {
          c.classNames = c.classNames.filter(
            (name) => name !== "AppSideHighlight"
          );
        }
      });
      setContent(newContent);
    }
  };
  const debouncedHandleScroll = debounce(handleScroll, 400);
  const handleListClick = (index: number) => {
    appMainRef?.current?.scrollTo({
      top: childrenTop[index] - window.innerHeight / 5,
      left: 0,
      behavior: "smooth",
    });
  };

  // hooks
  useEffect(() => {
    const childNode = appMainRef?.current?.children;
    if (childNode) {
      setChildrenTop(
        Array.from(childNode).map((child) => child.getBoundingClientRect().top)
      );
    }
  }, []);
  useEffect(() => {
    const target = appMainRef.current
    target?.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      target?.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [appMainRef, debouncedHandleScroll]);

  // main
  return (
    <div className="App">
      <div className="AppSide">
        <ul>
          {content.map((c, index) => (
            <li
              key={c.id}
              onClick={() => handleListClick(index)}
              className={classNames(c.classNames)}
            >
              {c.chapterTitle}
            </li>
          ))}
        </ul>
      </div>
      <div className="AppMain" ref={appMainRef}>
        {content.map((c) => (
          <div key={c.id}>{c.content}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
