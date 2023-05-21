import express from 'express';
import {
    postProduct,
    getProduct,
    cmtProduct
} from "../controllers/user.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

/** POST */

router.post("/:id/postP", verifyToken, postProduct);

router.post("/:id/cmtP",verifyToken, cmtProduct);

/** READ */

router.get("/:id/getP",verifyToken, getProduct);

export default router;