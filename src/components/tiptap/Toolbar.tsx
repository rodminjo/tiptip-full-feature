import React from 'react';
import {Editor} from '@tiptap/react';
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
                    [FuncName.H1, FuncName.H2, FuncName.H3, FuncName.Seperator].map(val => {
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
                                       ].map(val => {
                                           return (
                                               getTiptapButtonComponent(val, editor)
                                           )
                                       })
                                   ]}
                    />
                }
                {
                    [FuncName.Highlight, FuncName.Seperator].map(val=>{
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }
                {
                    <PopoverButton editor={editor}
                                   classStr={FuncName.Subject}
                                   buttonList={[
                                       [FuncName.BulletList, FuncName.OrderedList, FuncName.AlignLeft,
                                           FuncName.AlignCenter, FuncName.AlignRight].map(val => {
                                           return (
                                               getTiptapButtonComponent(val, editor)
                                           )
                                       })
                                   ]}
                    />
                }
                {
                    [FuncName.Seperator, FuncName.Link, FuncName.HorizontalRule, FuncName.Blockquote,
                        FuncName.Seperator,FuncName.Table, FuncName.Image, FuncName.Video, FuncName.CodeBlock,
                        FuncName.Seperator, FuncName.Html, FuncName.ClearFormatting].map(val => {
                        return (
                            getTiptapButtonComponent(val, editor)
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Toolbar