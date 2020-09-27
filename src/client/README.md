# Website Generator Client

Uses code spliting to dynamically load in javascript and css to render the modules defined by the data provided to Gatsby.

# Testing

We pre-load our dynamically loaded components to test the app is rendering correctly, a caveat React-Model is using Portals which is not compatible with our testing library enzyme, this means we will have to unit test the Portfolio component.