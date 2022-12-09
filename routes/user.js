import { Router } from "express";
import { userDelete, userGet, userPost, userPut } from "../controllers/users.js";
import { check } from "express-validator";

import { validateCamps } from "../middlewares/campsValidations.js";
import {isRoleValid, isMailValid, isValidUserId} from "../helpers/db-validators.js";


export const router = Router();

router.get('/', userGet);

router.put('/:id',[
    check('id', 'Its not a valid ID').isMongoId(),
    check('id').custom(isValidUserId),
    check('role').custom(isRoleValid),
    validateCamps
], userPut);

router.post('/', [
    check('mail').custom(isMailValid), 
    check('name', 'Name is mandatory').notEmpty(), //This line is enough to get a validation for name
    check('password', 'Password need to be 6 letter').isLength({min: 6}),
    // check('role', 'That\'s not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validateCamps
] , userPost);

router.delete('/:id', [
    check('id', 'Its not a valid ID').isMongoId(),
    check('id').custom(isValidUserId),
    validateCamps
], userDelete);

export {
    Router
}