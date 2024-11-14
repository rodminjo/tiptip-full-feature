import React from 'react';
import {Editor} from "@tiptap/react";
import TiptapButton from "./component/TiptapButton";
import FontColorPicker from "./component/FontColorPicker";
import FontSizeSelector from "./component/FontSizeSelector";
import FontFamilySelector from "./component/FontFamilySelector";
import HighlightColorPicker from "./component/HighlightColorPicker";
import LinkAdder from "./component/LinkAdder";
import ImageSelector from "./component/ImageSelector";
import VideoAdder from "./component/VideoAdder";
import HtmlViewer from "./component/HtmlViewer";

export enum FuncName {
    Bold = 'button-bold',
    Italic = 'button-italic',
    Underline = 'button-underline',
    Strike = 'button-strike',
    H1 = 'button-h1',
    H2 = 'button-h2',
    H3 = 'button-h3',
    BulletList = 'button-list-bulleted',
    OrderedList = 'button-list-numbered',
    AlignLeft = 'button-align-left',
    AlignCenter = 'button-align-center',
    AlignRight = 'button-align-right',
    HorizontalRule = 'button-line',
    Blockquote = 'button-blockquote',
    Table = 'button-table',
    CodeBlock = 'button-code-block',
    ClearFormatting = 'button-clear',
    FontColor = 'button-font-color',
    FontSize = 'button-font-size',
    FontFamily = 'button-font-family',
    Highlight = 'button-highlight',
    Menu = 'button-menu',
    Subject = 'button-subject',
    FontMenu = 'button-font-menu',
    Link = "button-link",
    Image = "button-image",
    Video = "button-video",
    Html = "button-html",
    Seperator = "toolbar-item-separator"
}


export const FuncMap: Map<FuncName, React.FC<{ editor: Editor }>> = new Map([
    [FuncName.Bold, ({ editor }) => (
        <TiptapButton
            key={FuncName.Bold}
            editor={editor}
            classStr={FuncName.Bold}
            activeEvent={(editor) => editor.isActive('bold')}
            onClickEvent={(editor) => editor.chain().focus().toggleBold().run()}
        />
    )],
    [FuncName.Italic, ({ editor }) => (
        <TiptapButton
            key={FuncName.Italic}
            editor={editor}
            classStr={FuncName.Italic}
            activeEvent={(editor) => editor.isActive('italic')}
            onClickEvent={(editor) => editor.chain().focus().toggleItalic().run()}
        />
    )],
    [FuncName.Underline, ({ editor }) => (
        <TiptapButton
            key={FuncName.Underline}
            editor={editor}
            classStr={FuncName.Underline}
            activeEvent={(editor) => editor.isActive('underline')}
            onClickEvent={(editor) => editor.chain().focus().toggleUnderline().run()}
        />
    )],
    [FuncName.Strike, ({ editor }) => (
        <TiptapButton
            key={FuncName.Strike}
            editor={editor}
            classStr={FuncName.Strike}
            activeEvent={(editor) => editor.isActive('strike')}
            onClickEvent={(editor) => editor.chain().focus().toggleStrike().run()}
        />
    )],
    [FuncName.H1, ({ editor }) => (
        <TiptapButton
            key={FuncName.H1}
            editor={editor}
            classStr={FuncName.H1}
            activeEvent={(editor) => editor.isActive('heading', { level: 2 })}
            onClickEvent={(editor) => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
    )],
    [FuncName.H2, ({ editor }) => (
        <TiptapButton
            key={FuncName.H2}
            editor={editor}
            classStr={FuncName.H2}
            activeEvent={(editor) => editor.isActive('heading', { level: 3 })}
            onClickEvent={(editor) => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
    )],
    [FuncName.H3, ({ editor }) => (
        <TiptapButton
            key={FuncName.H3}
            editor={editor}
            classStr={FuncName.H3}
            activeEvent={(editor) => editor.isActive('heading', { level: 4 })}
            onClickEvent={(editor) => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        />
    )],
    [FuncName.BulletList, ({ editor }) => (
        <TiptapButton
            key={FuncName.BulletList}
            editor={editor}
            classStr={FuncName.BulletList}
            activeEvent={(editor) => editor.isActive('bulletList')}
            onClickEvent={(editor) => editor.chain().focus().toggleBulletList().run()}
        />
    )],
    [FuncName.OrderedList, ({ editor }) => (
        <TiptapButton
            key={FuncName.OrderedList}
            editor={editor}
            classStr={FuncName.OrderedList}
            activeEvent={(editor) => editor.isActive('orderedList')}
            onClickEvent={(editor) => editor.chain().focus().toggleOrderedList().run()}
        />
    )],
    [FuncName.AlignLeft, ({ editor }) => (
        <TiptapButton
            key={FuncName.AlignLeft}
            editor={editor}
            classStr={FuncName.AlignLeft}
            activeEvent={(editor) => editor.isActive({ textAlign: 'left' })}
            onClickEvent={(editor) => editor.chain().focus().setTextAlign('left').run()}
        />
    )],
    [FuncName.AlignCenter, ({ editor }) => (
        <TiptapButton
            key={FuncName.AlignCenter}
            editor={editor}
            classStr={FuncName.AlignCenter}
            activeEvent={(editor) => editor.isActive({ textAlign: 'center' })}
            onClickEvent={(editor) => editor.chain().focus().setTextAlign('center').run()}
        />
    )],
    [FuncName.AlignRight, ({ editor }) => (
        <TiptapButton
            key={FuncName.AlignRight}
            editor={editor}
            classStr={FuncName.AlignRight}
            activeEvent={(editor) => editor.isActive({ textAlign: 'right' })}
            onClickEvent={(editor) => editor.chain().focus().setTextAlign('right').run()}
        />
    )],
    [FuncName.HorizontalRule, ({ editor }) => (
        <TiptapButton
            key={FuncName.HorizontalRule}
            editor={editor}
            classStr={FuncName.HorizontalRule}
            activeEvent={() => false}
            onClickEvent={(editor) => editor.chain().focus().setHorizontalRule().run()}
        />
    )],
    [FuncName.Blockquote, ({ editor }) => (
        <TiptapButton
            key={FuncName.Blockquote}
            editor={editor}
            classStr={FuncName.Blockquote}
            activeEvent={(editor) => editor.isActive('blockquote')}
            onClickEvent={(editor) => editor.chain().focus().toggleBlockquote().run()}
        />
    )],
    [FuncName.Table, ({ editor }) => (
        <TiptapButton
            key={FuncName.Table}
            editor={editor}
            classStr={FuncName.Table}
            activeEvent={(editor) => editor.isActive('table')}
            onClickEvent={(editor) => editor.chain().focus().insertTable().run()}
        />
    )],
    [FuncName.CodeBlock, ({ editor }) => (
        <TiptapButton
            key={FuncName.CodeBlock}
            editor={editor}
            classStr={FuncName.CodeBlock}
            activeEvent={(editor) => editor.isActive('codeBlock')}
            onClickEvent={(editor) => editor.chain().focus().toggleCodeBlock().run()}
        />
    )],
    [FuncName.ClearFormatting, ({ editor }) => (
        <TiptapButton
            key={FuncName.ClearFormatting}
            editor={editor}
            classStr={FuncName.ClearFormatting}
            activeEvent={() => false}
            onClickEvent={(editor) => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        />
    )],
    [FuncName.FontColor, ({ editor }) => (
        <FontColorPicker key={FuncName.FontColor} editor={editor} />
    )],
    [FuncName.FontSize, ({ editor }) => (
        <FontSizeSelector key={FuncName.FontSize} editor={editor} />
    )],
    [FuncName.FontFamily, ({ editor }) => (
        <FontFamilySelector key={FuncName.FontFamily} editor={editor} />
    )],
    [FuncName.Highlight, ({editor})=>(
        <HighlightColorPicker key={FuncName.Highlight} editor={editor} />
    )],
    [FuncName.Link, ({editor})=>(
        <LinkAdder key={FuncName.Link} editor={editor} />
    )],
    [FuncName.Image, ({editor})=>(
        <ImageSelector key={FuncName.Image} editor={editor} />
    )],
    [FuncName.Video, ({editor})=>(
        <VideoAdder key={FuncName.Video} editor={editor} />
    )],
    [FuncName.Html, ({editor})=>(
        <HtmlViewer key={FuncName.Html} editor={editor}/>
    )],
    [FuncName.Seperator, ({editor})=> (
        <div key={Math.random()} className="toolbar-item-separator"/>
    )]
]);

export const getTiptapButtonComponent = (name: FuncName, editor: Editor) => {
    let map = FuncMap.get(name);
    if (!map) return null;

    return map({editor: editor})
}
