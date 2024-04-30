"use client"

import { EditorElement } from '@/providers/editor/editor-provider';
import React from 'react'
import TextComponent from './text';

type Props = {
    element : EditorElement
}

const Recursive = ({element}: Props) => {
  switch (element.type) {
    case "text":
        return <TextComponent element={element}/>  
    default:
        return null
  }
}

export default Recursive