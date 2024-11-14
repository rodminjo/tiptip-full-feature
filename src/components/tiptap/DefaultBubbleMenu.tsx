import React from "react";
import {BubbleMenuPluginProps} from "@tiptap/extension-bubble-menu";
import {BubbleMenu} from "@tiptap/react";
import {FuncName, getTiptapButtonComponent} from "./TiptapButtonMaker";

interface BubbleMenuProps {
    editor: BubbleMenuPluginProps['editor'];
    duration? : number
}

const DefaultBubbleMenu = (props:BubbleMenuProps) => {
    let {editor, duration = 100} = props;


    return (
        <BubbleMenu editor={editor} tippyOptions={{ duration: duration }}
                    shouldShow={(e) => {
                        const { selection } = e.editor.state;
                        const { $from } = selection;
                        // 현재 선택된 위치의 노드 타입을 가져옴
                        const node = $from.node();
                        // 선택된 노드가 테이블이면 메뉴 숨김
                        return !node.type.name.includes('table') &&
                            !e.editor.isActive("youtube") &&
                            !e.editor.isActive("video") &&
                            !e.editor.isActive("image") &&
                            !selection.empty;
                    }}>
            <div className="bubble-menu popover">
                {
                    [
                        FuncName.H1, FuncName.H2, FuncName.Bold,
                        FuncName.Italic, FuncName.Underline, FuncName.Strike, FuncName.CodeBlock
                    ].map(val =>{
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }
            </div>
        </BubbleMenu>
    )

}

export default DefaultBubbleMenu