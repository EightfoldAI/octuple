function requestAnimtionFrame(callback: Function) {
    return setTimeout(callback);
}

requestAnimtionFrame.cancel = (id: number) => {
    clearTimeout(id);
};

export default requestAnimtionFrame;
