import React, {useRef, useState} from "react";
import {Editor} from "@tiptap/react";


interface ImageSelectorProps {
    editor : Editor
}

const ImageSelector = ({editor}:ImageSelectorProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("")
    const buttonRef = useRef<HTMLButtonElement | null>(null); // 버튼 참조
    const popoverRef = useRef<HTMLDivElement | null>(null); // 팝오버 참조
    const inputRef = useRef<HTMLInputElement>(null);

    const buttonClick = () => {
        setIsPopoverVisible(prev=>!prev)
    }

    const handleUrlPhoto = () => {
        editor.chain().focus().setImage({ src: imageUrl }).run();
        setImageUrl("")
        setIsPopoverVisible(false)
    }

    const handleUploadPhoto = async (files: FileList | null) => {
        if (files === null) return;

        const file = files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result as string;
            editor.chain().focus().setImage({ src: base64String }).run();
            if (inputRef.current) {
                inputRef.current.value = '';
            }
            setIsPopoverVisible(false)
        };

        if (file) {
            // 파일 -> base64 변환
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="popover-container"
             ref={popoverRef}>
            <button
                ref={buttonRef}
                className={`button-image ${isPopoverVisible ? "is-active" : ""}`}
                onClick={e => {
                    e.preventDefault();
                    buttonClick()
                }}
            >
            </button>
            {isPopoverVisible && (
                <div className="popover selector image-selector"
                     style={{
                         flexDirection: "column",
                         left: buttonRef.current ? buttonRef.current.offsetLeft : 0
                     }}
                >
                    <div className="row">
                        <label>URL 입력: </label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="이미지 URL 입력"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleUrlPhoto();
                            }}
                            className="url-button"
                        >
                            추가
                        </button>
                    </div>
                    <hr className="separator"/>
                    <div className="row">
                        <label>파일 선택:</label>
                        <button
                            onClick={() => inputRef.current && inputRef.current.click()}
                            className="upload-button"
                        >
                            파일 업로드
                        </button>
                        <input
                            type="file"
                            ref={inputRef}
                            accept="image/*"
                            onChange={(e) => handleUploadPhoto(e.target.files)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageSelector;