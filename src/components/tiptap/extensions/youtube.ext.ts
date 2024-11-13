import { Youtube as BaseYoutube } from '@tiptap/extension-youtube';


export const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?!channel\/)(?!@)(.+)?$/

export const isValidYoutubeUrl = (url: string) => {
    return url.match(YOUTUBE_REGEX)
}

type CustomSetYoutubeVideoOptions = { src: string, width?: number | string, height?: number | string, start?: number }

export const YoutubeExt = BaseYoutube.extend({
    addCommands() {
        return {
            setYoutubeVideo: (options: CustomSetYoutubeVideoOptions) => ({ commands }) => {
                if (!isValidYoutubeUrl(options.src)) {
                    return false
                }

                if (options.width === 0){
                    options.width = "100%"
                }

                if (options.height === 0){
                    options.height = "auto"
                }
                
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },
});