// Proxy for jest tests to convert css moodule class names.
// Based on https://medium.com/trabe/testing-css-modules-in-react-components-with-jest-enzyme-and-a-custom-modulenamemapper-8ff86c7d18a2

module.exports = new Proxy(
    {},
    {
        get: function getter(target, key) {
            if (key === '__esModule') {
                return false;
            }

            // Convert camelCase to kebab-case for class selectors in unit tests.
            return key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
        },
    }
);
