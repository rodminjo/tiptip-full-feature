import {Extension} from '@tiptap/react';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (fontSize:string) => ReturnType,
            unsetFontSize: () => ReturnType,
        };
    }
}

const Fontsize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],  // 적용할 요소 유형 설정
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) =>
                            element.style.fontSize.replace(/['"]+/g, ''),
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize:
                (fontSize) => ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize }).run();
                },
            unsetFontSize:
                () => ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
                },
        };
    },
});

export default Fontsize;