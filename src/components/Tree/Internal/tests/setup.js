global.requestAnimationFrame =
    global.requestAnimationFrame ||
    function requestAnimationFrame(cb) {
        return setTimeout(cb, 0);
    };

const Enzyme = require('enzyme');

let Adapter;

if (process.env.REACT === '15') {
    Adapter = require('enzyme-adapter-react-15');
} else if (process.env.REACT === '16') {
    Adapter = require('enzyme-adapter-react-16');
} else {
    Adapter = require('enzyme-adapter-react-17');
}

Enzyme.configure({ adapter: new Adapter() });
