import React, {useRef} from 'react';
import {Editor} from "@tiptap/react";
import {ReactComponent as ColorText} from "../asset/icons/editor_color_text.svg"
import {FuncName} from "../TiptapButtonMaker";

interface ColorPickerProps {
    editor : Editor
}

const FontColorPicker = ({ editor }:ColorPickerProps) => {
    const colorInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (color:string) => {
        editor.chain().focus().setColor(color).run();
    };

    return (
        <>
            <button
                className={FuncName.FontColor + '-reset'}
                onClick={() => editor.chain().focus().unsetColor().run()}
                disabled={!editor.getAttributes('textStyle').color}
            />
            <button
                className={FuncName.FontColor}
                onClick={e=> {
                    e.preventDefault();
                    handleChange(e.currentTarget.value);
                    colorInputRef.current && colorInputRef.current.click();
                }}
            >
                <ColorText fill={editor.getAttributes('textStyle').color || "#000000"}/>
            </button>
            <input
                type="color"
                ref={colorInputRef}
                style={{width:"0", height:"0"}}
                onChange={e => handleChange(e.target.value)}
                value={editor.getAttributes('textStyle').color || "#000000"}
            />
        </>
    )
};

export default FontColorPicker;