import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/* Product */

// get all
router.get("/product", getProducts);

// get one
router.get("/product/:id", getOneProduct);

// update one
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

// create one
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

// delete one
router.delete("/product/:id", deleteProduct);

/* Update */

// get all
router.get("/update", getUpdates);

// get one
router.get("/update/:id", getOneUpdate);

// update
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status")
    .isIn([body("IN_PROGRESS"), body("SHIPPED"), body("DEPRECATED")])
    .optional(),
  body("version").optional(),
  updateUpdate
);

// create
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);

// delete
router.delete("/update/:id", deleteUpdate);


/* Update Point */

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updatedId").exists().isString(),
  (req, res) => {}
);
router.delete("/updatepoint/:id", () => {});

router.use((err, req, res, next)=>{
    console.log(err)
    res.json({message: "in router handler"})
})

export default router;
