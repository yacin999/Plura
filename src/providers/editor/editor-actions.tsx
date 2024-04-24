import { DeviceTypes, EditorElement } from "./editor-provider"



export type editorAction = 
    |  
        {
            type : "ADD_ELEMENT",
            payload : {
                containerId : string,
                elementDetails : EditorElement
            }
        }
    |   {
            type : "UPDATE_ELEMENT",
            payload : {
                elementDetails : EditorElement
            }
        }
    |   {
            type : "DELETE_ELEMENT",
            payload : {
                elementDetails : EditorElement
            }
        }
    |   {
            type : "CHANGE_CLICKED_ELEMENT",
            payload : {
                elementDetails? : EditorElement |
                {
                    id : ""
                    content : []
                    name : ''
                    styles : {}
                }
            }
        }
    |   {
        type : "CHANGE_DEVICE",
        payload : {
            device : DeviceTypes
        }
    }