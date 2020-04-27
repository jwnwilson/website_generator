import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';

configure({ adapter: new Adapter() });

global.___loader = {
    enqueue: jest.fn(),
}