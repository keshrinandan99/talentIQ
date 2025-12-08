import express from 'express'
import {protectRoute} from '../middleware/protectRoute.js'
import getStreamToken from '../controllers/getStreamToken.controller.js'
const router=express.Router()

router.get('/token',protectRoute,getStreamToken)

export default router