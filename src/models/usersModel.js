import { getAllUser } from '../api/userRequest'

export default {
  state: {

  },

  effects: {
    *getAllUser({ payload }, { call, put }) {
      console.log('payload', payload)
      const res = yield call(getAllUser, payload)
      console.log(res);
      // yield put({
      //   type: "initUser",
      //   payload: res.data
      // })
    }
  },

  reducers: {
    initUser(state, action) {
      state.users = action.payload
    }
  }

}