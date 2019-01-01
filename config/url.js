import env from './env'

const DEV_URL = 'http://localhost:5001'
const PRO_URL = '/'

export default env === 'development' ? DEV_URL : PRO_URL
