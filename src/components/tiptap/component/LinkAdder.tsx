import React, {useRef, useState} from "react";
import {Editor} from "@tiptap/react";

interface LinkAdderProps {
    editor : Editor
    isToolbar : boolean
}

const LinkAdder = ({editor, isToolbar}:LinkAdderProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [linkUrl, setLinkUrl] = useState<string>("");
    const [linkContent, setLinkContent] = useState<string>("");

    const buttonRef = useRef<HTMLButtonElement | null>(null); // 버튼 참조

    const setLink = () => {
        const href = linkUrl;
        const text = linkContent;

        if (!href || (isToolbar && !text)) return;

        const { state } = editor;
        const { selection } = state;
        const { from, to } = selection;
        const { $from } = selection;

        const isTextSelected = from < to;
        const nodeAtSelection = $from.node();
        let tr;

        // 선택된 텍스트 가져오기
        const selectedText = state.doc.textBetween(from, to);

        // 드래그 한 후 텍스트 선택 시
        if (
            nodeAtSelection &&
            nodeAtSelection.type.name !== "codeBlock" &&
            isTextSelected
        ) {
            const insertText = text || selectedText; // 선택된 텍스트가 없으면 text로 대체
            tr = state.tr.deleteSelection();
            tr = tr.insertText(insertText);

            const linkMarkType = state.schema.marks.link;
            const linkMark = linkMarkType.create({ href });

            // 새로 넣은 텍스트 시작 위치(from)부터 끝 위치(to)를 링크로 변경
            tr = tr.addMark(from, from + insertText.length, linkMark);

            editor.view.dispatch(tr);
        } else if (nodeAtSelection.type.name !== "codeBlock") {
            editor
            .chain()
            .focus()
            .setLink({ href })
            .insertContent(text || selectedText) // 선택된 텍스트가 없으면 text로 대체
            .run();
        }

        setIsPopoverVisible(false);
        setLinkUrl("");
        setLinkContent("");
    }

    return (
        <div className="popover-container">
            <button
                ref={buttonRef}
                className={`button-link ${isPopoverVisible ? "is-active" : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    setIsPopoverVisible((prev) => !prev);
                }}
            >
            </button>
            {isPopoverVisible && (
                <div
                    className="popover selector link-selector"
                    style={{
                        flexDirection: "column",
                        left: buttonRef.current ? buttonRef.current.offsetLeft : 0,
                    }}
                >
                    <div className="row">
                        <label>URL 입력: </label>
                        <input
                            type="text"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Link URL"
                        />
                    </div>

                    <div className="row">
                        <label>내용 :</label>
                        <input
                            type="text"
                            value={linkContent}
                            onChange={(e) => setLinkContent(e.target.value)}
                            placeholder={"Link Content"}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setLink();
                            }}
                            className="url-button"
                        >
                            추가
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LinkAdder;