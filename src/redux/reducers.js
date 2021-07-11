import { MMKV } from "react-native-mmkv";

const initialState = {
    isLogin:MMKV.getBoolean('isLogin')
}

const reducers =(state=initialState,action)=>{
    if(action.type == "SET_LOGIN"){
        return {...state,isLogin:!state.isLogin}
    }
    return state
}

export default reducers;