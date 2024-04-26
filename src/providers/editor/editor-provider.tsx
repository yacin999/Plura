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


const updateAnElement = (
    editorArray : EditorElement[],
    action : EditorAction
) : EditorElement[] => {
    if (action.type !== "UPDATE_ELEMENT") {
        throw Error("You send the wrong action type to the update element state")
    }

    return editorArray.map(item => {
        if (item.id === action.payload.elementDetails.id) {
            return {
                ...item, 
                ...action.payload.elementDetails
            }
        }else if (item.content && Array.isArray(item.content)) {
            return {
                ...item,
                content : updateAnElement(item.content, action)
            }
        }
        return item
    })
}

const deleteAnElement = (
    editorArray: EditorElement[],
    action: EditorAction
  ): EditorElement[] => {
    if (action.type !== 'DELETE_ELEMENT')
      throw Error(
        'You sent the wrong action type to the Delete Element editor State'
      )
    return editorArray.filter((item) => {
      if (item.id === action.payload.elementDetails.id) {
        return false
      } else if (item.content && Array.isArray(item.content)) {
        item.content = deleteAnElement(item.content, action)
      }
      return true
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
            const updatedElements = updateAnElement(state.editor.elements, action)
            const updatedElementIsSelected = state.editor.selectedElements.id === action.payload.elementDetails.id
            const updatedEditorStateWithUpdate = {
                ...state.editor,
                elements : updatedElements,
                selectedElements : updatedElementIsSelected ? action.payload.elementDetails : {
                    id : '',
                    content : [],
                    name : '',
                    styles : {},
                    type : null
                },

            }
            const updatedHistoryWithUpdate = [
                ...state.history.history.slice(0, state.history.currentIndex + 1),
                {...updatedEditorStateWithUpdate}, // save a copy of the updated state
            ]

            const updatedEditor = {
                ...state,
                editor : updatedEditorStateWithUpdate,
                history : {
                    ...state.history,
                    history : updatedHistoryWithUpdate,
                    currentIndex : updatedHistoryWithUpdate.length - 1 
                }
            }

            return updatedEditor
        case "DELETE_ELEMENT":
            const updatedElementsAfterDelete = deleteAnElement(state.editor.elements, action)
            const updatedEditorStateAfterDelete = {
                ...state.editor,
                elements : updatedElementsAfterDelete
            }

            const updatadHistoryAfterDelete = [
                ...state.history.history.slice(0, state.history.currentIndex + 1),
                { ...updatedEditorStateAfterDelete}, // save a copy of the updated state
            ]

            const deletedState = {
                ...state,
                editor : updatedEditorStateAfterDelete,
                history : {
                    ...state.history.history,
                    history : updatadHistoryAfterDelete,
                    currentIndex : updatadHistoryAfterDelete.length - 1
                }
            }

            return deletedState
        case "CHANGE_CLICKED_ELEMENT":
            const clickedState = {
                ...state,
                editor : {
                    ...state.editor,
                    selectedElement : action.payload.elementDetails || {
                        id : "",
                        content : [],
                        name : "",
                        styles : {},
                        type : null
                    }
                },
                history : {
                    ...state.history,
                    history : [
                        ...state.history.history.slice(0, state.history.currentIndex + 1),
                        {...state.editor}
                    ],
                    currentIndex : state.history.currentIndex + 1
                }
            }
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