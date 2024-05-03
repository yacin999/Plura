"use client"

import { EditorElement } from '@/providers/editor/editor-provider';
import React from 'react'
import TextComponent from './text';
import Container from './container';
import VideoComponent from './video';
import LinkComponent from './link-component';
import TwoColumns from './two-columns';
import ContactFormComponenet from './contact-form-component';

type Props = {
    element : EditorElement
}

const Recursive = ({element}: Props) => {
  switch (element.type) {
    case "text":
        return <TextComponent element={element}/>  
    case "__body" :
        return <Container element={element}/>
    case 'container' :
        return <Container element={element}/>
    case "video" :
        return <VideoComponent element={element}/>
    case "link" :
        return <LinkComponent element={element}/>
    case "2Col" : 
        return <TwoColumns element={element}/>
    case "contactForm":
        return <ContactFormComponenet element={element}/>
    default:
        return null
  }
}

export default Recursive