import React from 'react';

export interface MockContentProps {
  chapterTitle: string;
}

export interface Content {
  id: string;
  classNames: string[];
  chapterTitle: string;
  content: React.ReactNode;
}
