const attributes = `accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`;

const eventsName = `onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`;

const propList: string[] = `${attributes} ${eventsName}`.split(/[\s\n]+/);

const ariaPrefix: string = 'aria-';
const dataPrefix: string = 'data-';

const match = (key: string, prefix: string): boolean => {
    return key.indexOf(prefix) === 0;
};

export interface PickConfig {
    aria?: boolean;
    data?: boolean;
    attr?: boolean;
}

/**
 * Pick specific props from existing props
 * @param props Passed props
 * @param ariaOnly boolean | { aria?: boolean; data?: boolean; attr?: boolean; } filter config
 */
export const pickAttrs = (
    props: object,
    ariaOnly: boolean | PickConfig = false
) => {
    let mergedConfig: PickConfig;
    if (ariaOnly === false) {
        mergedConfig = {
            aria: true,
            data: true,
            attr: true,
        };
    } else if (ariaOnly === true) {
        mergedConfig = {
            aria: true,
        };
    } else {
        mergedConfig = {
            ...ariaOnly,
        };
    }

    const attrs = {};
    Object.keys(props).forEach((key) => {
        if (
            // Aria
            (mergedConfig.aria && (key === 'role' || match(key, ariaPrefix))) ||
            // Data
            (mergedConfig.data && match(key, dataPrefix)) ||
            // Attr
            (mergedConfig.attr && propList.includes(key))
        ) {
            (<any>attrs)[key] = (<any>props)[key];
        }
    });
    return attrs;
};
