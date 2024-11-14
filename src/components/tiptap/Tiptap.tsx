import './asset/tiptap.scss'
import './asset/popover.scss'
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import "highlight.js/styles/stackoverflow-dark.min.css";
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {Highlight} from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Toolbar from "./Toolbar";
import DefaultBubbleMenu from "./DefaultBubbleMenu";
import DefaultFloatingMenu from "./DefaultFloatingMenu";
import {Image} from "@tiptap/extension-image";
import {TextStyle} from "@tiptap/extension-text-style";
import Fontsize from "./extensions/fontsize";
import CustomCodeBlockLowlight from "./extensions/codeblock";
import {Indent} from "./extensions/textedit.indent";
import {Underline} from "@tiptap/extension-underline";
import {Color} from "@tiptap/extension-color";
import {FontFamily} from "@tiptap/extension-font-family";
import {TextAlign} from "@tiptap/extension-text-align";
import TableBubbleMenu from "./TableBubbleMenu";
import {TableCell} from "@tiptap/extension-table-cell";
import {TableHeader} from "@tiptap/extension-table-header";
import {TableRow} from "@tiptap/extension-table-row";
import {Table} from "@tiptap/extension-table";
import {YoutubeExt} from "./extensions/youtube.ext";
import {Video} from "tiptap-basic-video";


/**
 *  blockQuote 주석표시 (Control + Shift + B / Cmd + Shift + B)
 *  highlight 강조표시
 * @constructor 조경민
 */

interface TiptapProps {
    content?: string;
    editable?: boolean;
}

export interface TiptapForwardProps {
    getHtml : ()=> string
}

const Tiptap = forwardRef((props: TiptapProps, ref) => {
    let {content = "", editable = true} = props

    const [isEditMode, setIsEditMode] = useState<boolean>(editable)
    const [text, setText] = useState<string>(content)

    // 외부 props가 변경될 때 editor content 업데이트
    useEffect(() => {
        setText(content);
    }, [content]);

    // 외부 editable props가 변경될 때 editable 상태 업데이트
    useEffect(() => {
        setIsEditMode(editable);
        
    }, [editable]);


    const extensions = [
        CustomCodeBlockLowlight,
        Link.extend({ inclusive: false }).configure({
            openOnClick: true,
        }),
        StarterKit.configure({
            codeBlock: false,
        }),
        TextStyle,
        Fontsize,
        Underline,
        Color,
        Indent,
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
            alignments: ['left', 'center', 'right', 'justify'],
            defaultAlignment: 'left',
        }),
        FontFamily,
        Table.configure({
            resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Image.configure({ inline: true, allowBase64: true }),
        YoutubeExt.configure({
            inline: true,
        }),
        Video,
    ]

    const editor = useEditor({
        extensions: extensions,
        content: text,
        editable: isEditMode,
        onUpdate({editor}){
            setText(editor.getHTML())
        }
    });

    useEffect(() => {
        editor && editor.setEditable(isEditMode)
    }, [isEditMode]);


    // 외부 호출 함수 : 정지, 재생, 리셋
    useImperativeHandle(ref, ():TiptapForwardProps => ({
        getHtml: ()=>{return text}
    }));



    return (
        <div className="tiptap-frame">
            {editor && <Toolbar editor={editor}/>}

            {/* FloatingMenu는 에디터가 포커스되면 나타나는 메뉴 */}
            {editor && <DefaultFloatingMenu editor={editor} duration={100}/>}

            {/* BubbleMenu는 선택한 텍스트 위에 표시되는 메뉴 */}
            {editor && <DefaultBubbleMenu editor={editor} duration={100}/>}

            {/* TableBubbleMenu는 선택한 테이블 위에 표시되는 메뉴 */}
            {editor && <TableBubbleMenu editor={editor} duration={100}/>}

            {/* 에디터 */}
            <EditorContent
                id="tiptap"
                editor={editor}
                onClick={() => editor?.commands.focus()}
            />
        </div>
    );
})

export default Tiptap;