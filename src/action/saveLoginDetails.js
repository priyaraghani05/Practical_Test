import { actionType } from "../constant";

export const saveLoginDetails = (value) => {
    console.log("🚀 ~ addTask ~ value:", value)
    return {
        type: actionType.LOGINDETAILS,
        data: value
    }
}