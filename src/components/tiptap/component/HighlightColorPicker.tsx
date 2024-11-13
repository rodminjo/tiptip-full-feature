import React, {useRef, useState} from 'react';
import {Editor} from "@tiptap/react";
import {ReactComponent as ColorText} from "../asset/icons/editor_highlight.svg"
import {FuncName} from "../TiptapButtonMaker";

interface HighlightColorPickerProps {
    editor : Editor
}

const HighlightColorPicker = ({ editor }:HighlightColorPickerProps) => {
    const colorInputRef = useRef<HTMLInputElement>(null);
    const [currentColor, setCurrentColor] = useState<string>("")
    const handleChange = (color:string) => {
        setCurrentColor(color)
        editor.chain().focus().toggleHighlight({color: color}).run();
    };

    return (
        <>
            <button
                className={FuncName.Highlight}
                onClick={(e) => {
                    e.preventDefault()
                    setCurrentColor("")
                    editor.chain().focus().unsetHighlight().run()
                }}
                style={{ ...{backgroundImage: `var(--editor-highlight-reset)`}}}
                data-testid="unsetColor"
            />
            <button
                onClick={e=> {
                    e.preventDefault()
                    handleChange(currentColor)
                }}
            >
                <ColorText fill={currentColor}/>
            </button>
            <input
                type="color"
                ref={colorInputRef}
                style={{width:"30px", height:"30px"}}
                onChange={e => setCurrentColor(e.target.value)}
                value={currentColor}
            />
        </>
    )
};

export default HighlightColorPicker;