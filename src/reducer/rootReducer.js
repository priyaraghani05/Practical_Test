import { combineReducers } from 'redux';
import { getLoginDetails } from "./getLoginDetails";
import { getEventDetails } from './getEventDetails';

export const rootReducer = combineReducers(
    {
        loginDetails: getLoginDetails,
        eventDetails: getEventDetails,
    }
);