import { configure } from 'enzyme'
import React from "react" 
import Adapter from 'enzyme-adapter-react-16'

React.useLayoutEffect = React.useEffect 
configure({ adapter: new Adapter() })