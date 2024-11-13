import React, {ReactNode, useRef, useState} from "react";
import {Editor} from "@tiptap/react";

interface PopoverButtonProps {
    editor: Editor;
    classStr: string;
    buttonList: ReactNode[]
}

const PopoverButton = ({ editor, classStr, buttonList }:PopoverButtonProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null); // 버튼 참조
    const popoverRef = useRef<HTMLDivElement | null>(null); // 팝오버 참조

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPopoverVisible((prev) => !prev); // 팝오버 토글
    };

    const getClassName = (className: string) => {
        let actStr = isPopoverVisible ? ' is-active' : '';
        return `${className}${actStr}`;
    };

    return (
        <div className="popover-container"
             ref={popoverRef}>
            <button
                type="button"
                className={getClassName(classStr)}
                onClick={handleButtonClick}
                ref={buttonRef}
            >
            </button>

            {isPopoverVisible && buttonList.length > 0 && (
                <div
                    className="popover"
                    style={{
                        left: buttonRef.current ? buttonRef.current.offsetLeft : 0,
                    }}
                >
                    {
                        buttonList.map((node, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {node}
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            )}
        </div>
    );
};

export default PopoverButton;
