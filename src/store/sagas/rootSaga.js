import { takeLatest } from 'redux-saga/effects'
import { handleGetUser} from './handlers/user'
// import { GET_USER } from '../ducks/user'
import { getUser } from '../ducks/userSlice'

export function* watcherSaga() {
  //yield takeLatest(GET_USER, handleGetUser)
  yield takeLatest(getUser.type, handleGetUser)
}
