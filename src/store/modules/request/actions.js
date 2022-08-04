import {
  END_REQUEST,
  SUCCESS_REQUEST,
  FAILED_REQUEST,
  START_REQUEST
} from './contants'
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export default {
  async startRequest ({ commit }) {
    commit(START_REQUEST)
  },
  async successRequest ({ commit, dispatch }) {
    commit(SUCCESS_REQUEST)
    await timeout(2400)
    dispatch('endRequest')
  },
  async failedRequest ({ commit }, error) {
    commit(FAILED_REQUEST, error)
  },
  async endRequest ({ commit }) {
    commit(END_REQUEST)
  }
}
