const Loader = {};

(function () {
    Loader.config = {
        path: '',
        memo: {},
    }

    Loader.parser = new DOMParser();

    Loader.setup = function (newConfig) {
        //TODO: Ensure only valid configurations can be set up.
        const { config } = Loader;

        Object.assign(config, newConfig)
        return config;
    }

    Loader.load = async function (name, options) {
        /**
         * Returns XML from a filename or path. 
         * Up to you to decide what you do with it.
         * It's synchronous baby!
         * @param name
         * @param options
         * @returns {{}}
        */

        const loadFile = filePath =>
            fetch(filePath, {
                mode: 'no-cors',
                referrer: "no-referrer",
            }).then(response => {
                debugger;
                return response.text()
            });

        const prepName = ((options && options.path) || '') + name;
        const svgFileText = await loadFile(prepName);
        if (svgFileText.length === 0) {
            throw new Error('SVGEngine | File could not be loaded');
        }
        debugger;
        const svgFileXML = Loader.parser.parseFromString(svgFileText, "image/svg+xml");
        const svgEl = document.importNode(svgFileXML.documentElement, true)

        return svgEl;
    }

    Loader.place = function (containerElement, name, options) {
        const svgEl = Loader.load(name, options);
        svgEl.then(element => {
            if (options && options.classes) {
                options.classes.forEach(className => element.classList.add(className))
            }
            containerElement.appendChild(element)
        });
        return containerElement;
    }
})();

export default Loader;
