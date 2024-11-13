import React from 'react';
import {Editor} from "@tiptap/react";

interface TipTapButtonProps {
    editor: Editor;
    classStr: string;
    activeEvent : (editor:Editor) => boolean;
    onClickEvent: (editor:Editor) => void;
}

const TiptapButton = ({ editor, classStr, onClickEvent, activeEvent }:TipTapButtonProps) => {

    const getClassName = (className:string, isActive:boolean) => {
        let actStr = isActive ? ' is-active' : ''
        return `${className}${actStr}`
    }

    return (
        <button
            type="button"
            className={getClassName(classStr, activeEvent(editor))}
            onClick={e=>{
                e.preventDefault()
                onClickEvent(editor)
            }}
        />
    );
};

export default TiptapButton;