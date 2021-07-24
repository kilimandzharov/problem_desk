import {createStore} from 'redux';
let initialState='nothing';
let reducer=function(state=initialState,action){
    switch (action.type){
        case 'todos/Added':{
            return 'added'
        }
        case 'todos/Deleted':{
            return 'deleted'
        }
        default:{
            return state
        }
    }
}

const store=createStore(reducer);

export default store;