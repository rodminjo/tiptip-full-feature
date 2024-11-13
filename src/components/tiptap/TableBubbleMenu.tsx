import React from "react";
import {BubbleMenuPluginProps} from "@tiptap/extension-bubble-menu";
import {BubbleMenu} from "@tiptap/react";

interface BubbleMenuProps {
    editor: BubbleMenuPluginProps['editor'];
    duration? : number
}

const TableBubbleMenu = (props:BubbleMenuProps) => {
    let {editor, duration = 100} = props;

    return (
        <BubbleMenu editor={editor} tippyOptions={{ duration: duration }} shouldShow={e=>e.editor.isActive("table")}>
            <div className="bubble-menu popover" style={{whiteSpace:"nowrap", display:"inline-flex"}}>
                <button
                    className={"bubble-table"}
                    onClick={() => editor.chain().focus().insertTable({
                        rows: 3,
                        cols: 3,
                        withHeaderRow: true
                    }).run()
                    }
                >테이블 추가</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().addColumnAfter().run()}>열 삽입</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().deleteColumn().run()}>열 삭제</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().addRowAfter().run()}>행 삽입</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().deleteRow().run()}>행 삭제</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().mergeCells().run()}>셀 합병</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().splitCell().run()}>셀 분할</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().toggleHeaderCell().run()}>헤더 셀</button>
                <button className={"bubble-table"}
                        onClick={() => editor.chain().focus().deleteTable().run()}>테이블 삭제</button>
            </div>
        </BubbleMenu>
    )

}

export default TableBubbleMenu