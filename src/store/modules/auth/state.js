
import { getToken } from '@/storage/token.storage.js'
import { getUser } from '@/storage/user.storage.js'
export default {
  isLogin: !!getToken(),
  user: getUser(),
  token: getToken(),
  loading: false
}
