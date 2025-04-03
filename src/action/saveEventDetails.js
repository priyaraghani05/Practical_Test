import { actionType } from "../constant";

const addeEvent = (value) => {
    return {
        type: actionType.ADDEVENT,
        data: value
    }
}
const updateEvent = (value) => {
    return {
        type: actionType.UPDATEEVENT,
        data: value
    }
}

const deleteEvent = (value) => {
    return {
        type: actionType.DELETEEVENT,
        data: value
    }
}

export  {addeEvent,updateEvent,deleteEvent}