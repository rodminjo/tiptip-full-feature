import React, {useEffect} from "react";
import {Editor} from "@tiptap/react";

interface FontSelectorProps {
    editor: Editor;
}

const FontFamilySelector = ({editor}: FontSelectorProps) => {
    const fontListArr = ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Impact'];

    const fontFamilyChange = (fontFamily:string) =>{
        if (fontFamily === ""){
            editor.chain().focus().unsetFontFamily().run()
        } else {
            editor.chain().focus().setFontFamily(fontFamily).run();
        }
    }

    useEffect(() => {
        fontFamilyChange("")

    }, []);

    return (
        <select
            value={fontListArr.find(value => editor.isActive('textStyle', {fontFamily: value})) || ''}
            onChange={e => fontFamilyChange(e.target.value)}
        >
            <option value={""}>default</option>
            {
                fontListArr.map(value => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))
            }
        </select>
    )
}

export default FontFamilySelector