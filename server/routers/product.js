import  express  from "express";
import{
    searchProduct,
    infProduct,
    addCart,
    postOrder,

} from "../controllers/product.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

/** READ Product| Find */

router.get('/search',searchProduct)
/** Get product  */
router.get('/:idP',infProduct)

/**Update product to cart  */

router.patch('/:id/:idP/cart',verifyToken,addCart)

/** POST Order id: idUser, idS: idSeller, idP: id Product */
router.post('/:id/:idS/:idP/order',verifyToken,postOrder)

export default router;
