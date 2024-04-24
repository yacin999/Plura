import { EditorBtns } from "@/lib/constants"
import React from "react"
import { EditorAction } from "./editor-actions"

export type DeviceTypes =  'Desktop' | 'Mobile' | 'Tablet'

export type EditorElement = {
    id : string
    styles : React.CSSProperties
    name : string
    type : EditorBtns
    content : | EditorElement[] | {}
}

export type Editor = {
    liveMode : boolean,
    elements : EditorElement[]
    selectedElements : EditorElement
    device : DeviceTypes
    previewMode : boolean
    funnelPageId : string
}

export type HistoryState = {
    history : Editor[]
    currentIndex : number
}

export type EditorState = {
    editor : Editor
    history : HistoryState
}

const initialEditorState : EditorState["editor"] = {
    elements : [
        {
            content : [],
            id : '__body',
            name : 'Body',
            styles : {},
            type : '__body'
        }
    ],
    selectedElements : {
        id : '',
        content : [],
        name : '',
        styles : {},
        type : null
    },
    device : "Desktop",
    previewMode : false,
    liveMode : false,
    funnelPageId : ''
}


const initialHistoryState : HistoryState = {
    history : [initialEditorState],
    currentIndex : 0
}


const initialState: EditorState = {
    editor: initialEditorState,
    history: initialHistoryState,
}


const addAnEelemnt = (
    editorArray : EditorElement[],
    action : EditorAction
) : EditorElement[] => {
    if (action.type !== "ADD_ELEMENT") 
        throw Error("You send the wrong action type to add element editor state")
        return  editorArray.map(item=> {
            if (item.id === action.payload.containerId && Array.isArray(item.content)) {
                return {
                    ...item,
                    content : [item.content, action.payload.elementDetails]
                }
            }else if ( item.content && Array.isArray(item.content)) {
                return {
                    ...item,
                    content : addAnEelemnt(item.content, action)
                }
            }

            return item
        })
}

const editorReducer = (
    state : EditorState = initialState,     
    action : EditorAction
) : EditorState => {
    switch (action.type) {
        case "ADD_ELEMENT" : 
            const updatedEditorState = {
                ...state.editor,
                elements : addAnEelemnt(state.editor.elements, action)
            }
            const updatedHistory = [
                ...state.history.history.slice(0, state.history.currentIndex + 1),
                {...updatedEditorState}
            ]

            const newEditorState = {
                ...state,
                editor : updatedEditorState,
                history : {
                    ...state.history,
                    history : updatedHistory,
                    currentIndex : updatedHistory.length - 1
                }
            }

            return newEditorState
        
        case "UPDATE_ELEMENT":
        case "DELETE_ELEMENT":
        case "CHANGE_CLICKED_ELEMENT":
        case "CHANGE_DEVICE":
        case "TOGGLE_PREVIEW_MODE":
        case "TOGGLE_LIVE_MODE":
        case "REDO":
        case "UNDO":
        case "LOAD_DATA":
        case "SET_FUNNELPAGE_ID":
        default : return state
    }
}