import React, { useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import {isValidYoutubeUrl} from "../extensions/youtube.ext";

interface VideoAdderProps {
    editor: Editor;
}

const VideoAdder = ({ editor }: VideoAdderProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [videoWidth, setVideoWidth] = useState<number>(640);
    const [videoHeight, setVideoHeight] = useState<number>(480);
    const [isWidthAuto, setIsWidthAuto] = useState(false);
    const [isHeightAuto, setIsHeightAuto] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null); // 버튼 참조

    const addYoutubeVideo = () => {
        if (videoUrl) {

            if(isValidYoutubeUrl(videoUrl)){
                editor.commands.setYoutubeVideo({
                    src: videoUrl,
                    width: isWidthAuto ? 0 : Math.max(320, videoWidth),
                    height: isHeightAuto ? 0 : Math.max(180, videoHeight),
                });

            } else {
                editor.commands.setVideo({
                    src: videoUrl,
                    width: isWidthAuto ? "auto" : Math.max(320, videoWidth),
                    height: isHeightAuto ? "auto" : Math.max(180, videoHeight),
                })
            }
            setVideoUrl("");
            setIsPopoverVisible(false);
        }
    };

    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valueAsNumber = e.target.valueAsNumber;
        if (isNaN(valueAsNumber)) {
            valueAsNumber = 0;
        }
        return Math.max(valueAsNumber, 0);
    };


    return (
        <div className="popover-container">
            <button
                ref={buttonRef}
                className={`button-video ${isPopoverVisible ? "is-active" : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    setIsPopoverVisible((prev) => !prev);
                }}
            >
            </button>
            {isPopoverVisible && (
                <div
                    className="popover selector image-selector"
                    style={{
                        flexDirection: "column",
                        left: buttonRef.current ? buttonRef.current.offsetLeft : 0,
                    }}
                >
                    <div className="row">
                        <label>URL 입력: </label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Youtube, .mp4 형식"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addYoutubeVideo();
                            }}
                            className="url-button"
                        >
                            추가
                        </button>
                    </div>
                    <hr className="separator"/>
                    <div className="row">
                        <label>넓이 :</label>
                        <input
                            type="number"
                            value={videoWidth}
                            onChange={(e) => setVideoWidth(getValue(e))}
                            disabled={isWidthAuto}
                        />
                        <button
                            style={{backgroundColor:`${isWidthAuto ? "var(--gray-4)" : "var(--gray-3)"}`}}
                            onClick={() => setIsWidthAuto((prev) => !prev)}
                            className={`auto-button ${isWidthAuto ? "is-active" : ""}`}
                        >
                            Auto
                        </button>
                    </div>
                    <div className="row">
                        <label>높이 :</label>
                        <input
                            type="number"
                            value={videoHeight}
                            onChange={(e) => setVideoHeight(getValue(e))}
                            disabled={isHeightAuto}
                        />
                        <button
                            style={{backgroundColor:`${isHeightAuto ? "var(--gray-4)" : "var(--gray-3)"}`}}
                            onClick={() => setIsHeightAuto((prev) => !prev)}
                            className={`auto-button ${isHeightAuto ? "is-active" : ""}`}
                        >
                            Auto
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoAdder;
