
import React from 'react'

// Loadable components is tied to webpack, seems most people use webpack in their tests.
// Rather than that, we mock the loadable function to load the module eagarly and expose a load() function to be able to await the load
function loadable(load) {
    let Component;
    // Capture the component from the module load function
    const loadPromise = load.requireAsync().then(val => (Component = val.default));
    // Create a react component which renders the loaded component
    const Loadable = (props) => {
        if (!Component) {
            throw new Error(
                'Bundle split module not loaded yet, ensure you beforeAll(() => MyLazyComponent.load()) in your test, import statement: ' +
                    load.toString()
            )
        }
        return <Component {...props} />
    }
    Loadable.load = () => {
        return loadPromise
    }
    return Loadable
}

export default loadable