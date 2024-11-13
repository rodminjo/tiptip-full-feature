import React, {useEffect} from "react";
import {Editor} from "@tiptap/react";

interface FontSelectorProps {
    editor: Editor;
}

const FontSizeSelector = ({editor}: FontSelectorProps) => {
    const fontSizeArr = ['14px', '16px', '18px', '24px', '28px', '30px', '34px', '38px'];

    const fontSizeChange = (fontSize:string) =>{
        editor.chain().focus().setFontSize(fontSize).run();
    }

    useEffect(() => {
        fontSizeChange("16px")

    }, []);

    return (
        <select
            value={fontSizeArr.find(value => editor.isActive('textStyle', {fontSize: value})) || ''}
            onChange={e => fontSizeChange(e.target.value)}
        >
            {
                fontSizeArr.map(value => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))
            }
        </select>
    )
}

export default FontSizeSelector