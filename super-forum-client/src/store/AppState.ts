import { combineReducers } from "redux";
import { UserProfileReducer } from "./user/Reducer";

export const rootReducer = combineReducers({
    user : UserProfileReducer,
});

export type Appstate = ReturnType<typeof rootReducer>;