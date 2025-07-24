import express from 'express';
import { userRegister } from '../routerControllers/userroutercontroller.js';


const router = express.Router();

router.post('/register',userRegister);

export default router;