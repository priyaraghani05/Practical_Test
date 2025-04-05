import { actionType } from "../constant";

export const getLoginDetails = (state = { data: {} }, action) => {
    switch (action.type) {
        case  actionType.LOGINDETAILS:
            return {
                ...state,
                data: {...state.data, ...action.data},
            };
   default:
            return state
    }

}