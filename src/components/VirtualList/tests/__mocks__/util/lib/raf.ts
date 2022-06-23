function requestAnimationFrame(callback: Function) {
    return setTimeout(callback);
}

requestAnimationFrame.cancel = (id: number) => {
    clearTimeout(id);
};

export default requestAnimationFrame;
