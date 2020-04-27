import { 
  LOADED,
} from '../actions/actionTypes';
import utils from './utils';

const initialState = {
  loaded: false
};

const anything = utils.createReducer(initialState, {
  [LOADED]: (state, action) => { 
    return Object.assign({}, state, {loaded: true});
  },
})

export default anything;
