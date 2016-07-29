import {global} from '../mocks/global'
import {BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG} from '../global/constants'

export const colXs = global.matchMedia(`(max-width: ${BREAKPOINT_SM})`).matches
export const colSm = global.matchMedia(`(min-width: ${BREAKPOINT_SM}) and (max-width: ${BREAKPOINT_MD})`).matches
export const colMd = global.matchMedia(`(min-width: ${BREAKPOINT_MD}) and (max-width: ${BREAKPOINT_LG})`).matches
export const colLg = global.matchMedia(`(min-width: ${BREAKPOINT_LG})`).matches
