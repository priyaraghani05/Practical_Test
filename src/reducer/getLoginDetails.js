
export const getLoginDetails = (state = { data: {} }, action) => {
    switch (action.type) {
        case 'LOGINDETAILS':
            return {
                ...state,
                data: {...state.data, ...action.data},
            };
   default:
            return state
    }

}