import { MMKV } from "react-native-mmkv";
import { combineReducers } from 'redux';

const initialState = {
    isLogin:MMKV.getBoolean('isLogin')
}

const initialStateChat = {
    title:'dokteralisubandono'
}

const reducers =(state=initialState,action)=>{
    if(action.type == "SET_LOGIN"){
        return {...state,isLogin:!state.isLogin}    
    }
    return state
}

const chatReducers = (state=initialStateChat,action)=>{
    if(action.type == "CHANGE_TITLE"){
       return {...state,title:action.name}
    }
    return state;
}

export default combineReducers({
    reducers,
    chatReducers 
  })