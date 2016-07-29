let __ENV__
if (typeof(__NODE_ENV__) !== 'undefined') {
  if (__NODE_ENV__ === 'production' && process.env.HEROKU_APP_NAME === 'zensa') {
    __ENV__ = 'production'
  } else if (__NODE_ENV__ === 'production' && process.env.HEROKU_APP_NAME === 'zensa-staging') {
    __ENV__ = 'staging'
  }
} else {
  __ENV__ = 'development'
}
console.log('HEROKU_APP_NAME: ', process.env.HEROKU_APP_NAME)
console.log('Current ENV: ', __ENV__)
export {__ENV__}

export const DB_NAME = 'zensa'
export const AUTH0_URL = 'zensa.auth0.com'

export const IMG_BASE_URL = (__ENV__ === 'production' || __ENV__ === 'staging') ? 'https://zensa.imgix.net' : 'http://127.0.0.1:3000/assets/images'
export const BREAKPOINT_SM = '40em'
export const BREAKPOINT_MD = '52em'
export const BREAKPOINT_LG = '64em'
export const MUI_FONT_FAMILY = 'roboto'
