import express from 'express'
import usersApi from './users/'
import productsApi from './products/'
import shippingApi from './shipping/'
import cartApi from './cart/'
import stripeApi from './stripe/'
import couponsApi from './coupons/'
import instagramApi from './instagram/'
import mailchimpApi from './mailchimp/'

const router = express.Router()

// API routes
router.use('/users', usersApi)
router.use('/products', productsApi)
router.use('/shipping', shippingApi)
router.use('/cart', cartApi)
router.use('/stripe',  stripeApi)
router.use('/coupons',  couponsApi)
router.use('/instagram',  instagramApi)
router.use('/mailchimp',  mailchimpApi)

export default router
