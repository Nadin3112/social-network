import {  applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import {thunk} from "redux-thunk";
import {reducer as formReducer} from "redux-form";

const thunkMiddleware = thunk;

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

let  store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;