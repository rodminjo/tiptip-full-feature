import React from 'react';
import {Editor} from '@tiptap/react';
import HighlightColorPicker from "./component/HighlightColorPicker";
import ImageSelector from "./component/ImageSelector";
import LinkAdder from "./component/LinkAdder";
import VideoAdder from "./component/VideoAdder";
import HtmlViewer from "./component/HtmlViewer";
import {FuncName, getTiptapButtonComponent} from "./TiptapButtonMaker";
import PopoverButton from "./component/PopoverButton";


interface ToolBarProps {
    editor: Editor;
}

const Toolbar = ({editor}: ToolBarProps) => {
    return (
        <div className="toolbar-container">
            <div className="toolbar-item-box">
                {
                    [FuncName.H1, FuncName.H2, FuncName.H3].map(val =>{
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }

                {
                    <PopoverButton editor={editor}
                                   classStr={FuncName.FontMenu}
                                   buttonList={[
                                       [
                                           FuncName.Bold, FuncName.Italic, FuncName.Underline, FuncName.Strike,
                                           FuncName.FontColor, FuncName.FontSize, FuncName.FontFamily
                                       ].map(val =>{
                                           return (
                                               getTiptapButtonComponent(val, editor)
                                           )
                                       })
                                   ]}
                    />
                }

                <div className="toolbar-item-separator" />

                <HighlightColorPicker editor={editor} />

                <div className="toolbar-item-separator" />
                {
                    <PopoverButton editor={editor}
                                   classStr={FuncName.Subject}
                                   buttonList={[
                                       [FuncName.BulletList, FuncName.OrderedList, FuncName.AlignLeft,
                                           FuncName.AlignCenter, FuncName.AlignRight].map(val =>{
                                           return (
                                               getTiptapButtonComponent(val, editor)
                                           )
                                       })
                                   ]}
                    />
                }

                <LinkAdder editor={editor} isToolbar={true} />

                <div className="toolbar-item-separator" />
                {
                    [FuncName.HorizontalRule, FuncName.Blockquote].map(val =>{
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }

                <div className="toolbar-item-separator" />
                {
                    [FuncName.Table].map(val =>{
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }

                <ImageSelector editor={editor} />
                <VideoAdder editor={editor} />

                {
                    [FuncName.CodeBlock].map(val =>{
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }

                <div className="toolbar-item-separator" />
                {
                    [FuncName.ClearFormatting].map(val =>{
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }

                <HtmlViewer editor={editor}/>
            </div>
        </div>
    )
}

export default Toolbar