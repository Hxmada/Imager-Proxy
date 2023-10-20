const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');


const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function secure(input) {
    if (typeof input !== 'string') {
        return String(input);
    }
    return DOMPurify.sanitize(input);
}

module.exports = secure;