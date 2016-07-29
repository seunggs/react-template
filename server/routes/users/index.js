import express from 'express'
import R from 'ramda'
import {getUserFromDB$$, createUserInDB$$} from './observables'

const router = express.Router()

router.route('/')

  .get((req, res) => {
    const userEmail = decodeURIComponent(req.query.userEmail)
    console.log('userEmail in GET /users', userEmail)
    getUserFromDB$$(userEmail).subscribe(
      userObj => res.send(userObj),
      err => res.send(err)
    )
  })

  // Create user in Users table
  .post((req, res) => {
    const userObj = req.body
    console.log('userObj in POST /users', userObj)
    createUserInDB$$(userObj).subscribe(
      originalUserObj => res.send(originalUserObj),
      err => res.send(err)
    )
  })

export default router
