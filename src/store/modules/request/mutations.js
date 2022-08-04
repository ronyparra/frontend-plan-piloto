import {
  START_REQUEST,
  SUCCESS_REQUEST,
  END_REQUEST,
  FAILED_REQUEST
} from './contants'
export default {
  [START_REQUEST]: (state) => {
    state.active = true
    state.loading = true
  },
  [SUCCESS_REQUEST]: (state, request) => {
    state.loading = false
    state.failed = false
    state.success = true
    state.message = request
  },
  [FAILED_REQUEST]: (state, request) => {
    state.loading = false
    state.success = false
    state.failed = true
    state.message = request
  },
  [END_REQUEST]: (state) => {
    state.loading = false
    state.success = false
    state.failed = false
    state.message = null
    state.active = false
  }
}
