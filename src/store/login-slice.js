import { createSlice } from "@reduxjs/toolkit";

const loginState = {isLoginOpen:false,user:false,userId:false,userAddress:[],pageLoadError:false}
export const loginSlice = createSlice({
  name:'Login',
  initialState:loginState,
  reducers:{
    setLoginState(state,action){
      if(action.payload.type === 'TRUE'){
        state.isLoginOpen = true
      }else if(action.payload.type === 'FALSE'){
        state.isLoginOpen=false
        state.user = action.payload.user
      }
    },
    setUserId(state,action){
        state.userId = action.payload
    },
    setUserAddress(state,action){
        const dummyArray=state.userAddress
        if(action.payload.type === 'EDIT'){
            const editItem =dummyArray.filter(item=>item.id !== action.payload.updatedAddress.id)
            state.userAddress = [...editItem,action.payload.updatedAddress]
            return
        }
        state.userAddress = action.payload.addresses ||  action.payload.updatedAddress || []
    },
    addNewAddress(state,action){
        state.userAddress=state.userAddress.concat(action.payload.updatedAddress)
    },
    signOut(state){
        state.user=false;
        state.userId=false;
    },
    setLoadError(state){
      state.pageLoadError=true
    }
  }
})