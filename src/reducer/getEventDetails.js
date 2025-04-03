import { actionType } from "../constant"


export const getEventDetails = (state = { data: [] }, action) => {
    switch (action.type) {
        case actionType.ADDEVENT:
            return {
                ...state,
                data: [...state.data, action.data],
            };
        case actionType.UPDATEEVENT:
            return {
                ...state,
                data: state.data.map((task) =>
                    task.id === action.data.id
                        ? action.data
                        : task

                ),
            };

        case actionType.DELETEEVENT:
            return {
                ...state,
                data: state.data.filter((task) => task.id !== action.data),
            };
        default:
            return state
    }

}