import { actionType } from "../constant";

export const saveLoginDetails = (value) => {
    return {
        type: actionType.LOGINDETAILS,
        data: value
    }
}