import React, {useEffect, useRef, useState} from "react";
import {Editor} from "@tiptap/react";

interface HtmlViewerProps {
    editor : Editor
}

const HtmlViewer = ({editor} : HtmlViewerProps) => {
    const getButtonStyle = (isActive: boolean) => {
        const buttonStyle = {
            width: '30px',
            height: '30px',
            backgroundSize: '26px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }
        const back = {backgroundImage: `var(--editor-html)`}
        const active = {backgroundColor: isActive ? `var(--gray-3)` : `var(--white)`}

        return {...buttonStyle, ...back, ...active}
    }
    const hasMounted = useRef(false);
    const [isHtmlMode, setIsHtmlMode] = useState<boolean>(false)

    useEffect(() => {
        if (hasMounted.current){
            isHtmlMode ? showSource() : showHTML()
        } else {
            hasMounted.current = true
        }

    }, [isHtmlMode]);

    const showSource = () => {
        editor && editor.commands.setContent(`<textarea>${editor.getHTML()}</textarea>`)
    }

    const showHTML = () => {
        // let html = editor.getHTML();
        // if (html.startsWith('<pre><code>') && html.endsWith('</code></pre>')){
        editor && editor.commands.setContent(editor.getText());
        // }
    }

    return (
        <button
            type="button"
            style={getButtonStyle(isHtmlMode)}
            onClick={() => {setIsHtmlMode(prev => !prev)}}
        />
    )
}

export default HtmlViewer