import { createStore } from "redux";

const initialState = {
    people: {
        dni: '',
        name: '',
        email: ''
    },
};

const reducerFunctions = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {

            }

        case 'SET_PEOPLE_DATA':
            return {

            }

        default: return state
    }
}

export default createStore(reducerFunctions);