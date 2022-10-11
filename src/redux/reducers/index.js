import { combineReducers } from 'redux';

import player from './player';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({ player, timerReducer });

export default rootReducer;
