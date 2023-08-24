import {selector} from "recoil";
import {userState} from "../atoms/users.js";

export const usernameState = selector({
    key: 'usernameState',
    get: ({get}) => {
        const state = get(userState);
        return state.username;
    },
    set: ({set}) => {

    }
});