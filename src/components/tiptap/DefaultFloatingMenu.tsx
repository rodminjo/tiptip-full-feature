import React from "react";
import {FloatingMenuPluginProps} from "@tiptap/extension-floating-menu";
import {FloatingMenu} from "@tiptap/react";
import {FuncName, getTiptapButtonComponent} from "./TiptapButtonMaker";

interface FloatingMenuProps {
    editor: FloatingMenuPluginProps['editor'];
    duration? : number
}

const DefaultFloatingMenu = (props: FloatingMenuProps) => {
    let {editor, duration = 100} = props;

    return (
        editor && (
            <FloatingMenu editor={editor} tippyOptions={{duration: duration}}>
                <div className={"floating-menu popover"}>
                    {
                        [
                            FuncName.H1, FuncName.H2, FuncName.Bold,
                            FuncName.Italic, FuncName.Underline, FuncName.Strike
                        ].map(val =>{
                            return (
                                getTiptapButtonComponent(val, editor)
                            )
                        })
                    }
                </div>
            </FloatingMenu>
        )
    )
}

export default DefaultFloatingMenu