import { call, put } from 'redux-saga/effects'
//import { setUser } from '../../ducks/user'
import { setUser } from '../../ducks/userSlice'
import {  requestGetUser } from '../requests/user'

export function* handleGetUser(action) {
  try{
    const response = yield call(requestGetUser)
    const { data } = response
    console.log(data)
    //yield put(setUser(data))
    yield put(setUser({...data}))
  }catch(e){
    console.log(e)
  }
}
