import express from 'express';
import {
    postProduct,
    getProduct,
    cmtProduct,
    getCart,        
    removeProduct,
    updateUser,
    getOrder
} from "../controllers/user.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

/** POST  id:/ _idUser*/

router.post("/:id/postP", verifyToken, postProduct);

router.post("/:id/:idP/cmtP",verifyToken, cmtProduct);

/** READ  id: _idUser*/

router.get("/:id/getP",verifyToken, getProduct);
router.get("/:id/getCart",verifyToken,getCart);
router.get("/id/getOrder",verifyToken,getOrder);

/** Update  */

router.patch("/:id/update",verifyToken,updateUser)

router.patch("/:id/:idP",verifyToken,removeProduct);


export default router;