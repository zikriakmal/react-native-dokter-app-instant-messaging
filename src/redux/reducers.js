import { MMKV } from "react-native-mmkv";
import { combineReducers } from 'redux';

const initialState = {
    isLogin:MMKV.getBoolean('isLogin'),
    token:MMKV.getString('access_token')
}

const initialStateChat = {
    title:'dokteralisubandono'
}

const initialStateModal = {
    modalVisible : true
}

const initialStateUser = {
    userType:1,
    username:MMKV.getString('username'),
    photoPath:MMKV.getString('photo_path')
}

const reducers =(state=initialState,action)=>{
    if(action.type == "SET_LOGIN"){
        return {...state,isLogin:!state.isLogin,token:action.token}    
    }
    return state
}

const chatReducers = (state=initialStateChat,action)=>{
    if(action.type == "CHANGE_TITLE"){
       return {...state,title:action.name}
    }
    return state;
}

const userReducers = (state = initialStateUser,action)=>{
    if(action.type == "SET_USER"){
        return {...state,username:action.name}
    }
    return state;
}

const modalReducers = (state = initialStateModal,action)=>{
    if(action.type == "SET_MODAL_VISIBLE"){
        return {...state,modalVisible:!state.modalVisible} 
    }
    return state
}



export default combineReducers({
    reducers,
    chatReducers,
    userReducers,
    modalReducers
  })