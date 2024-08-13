
import express, {
    Application,
    NextFunction,
    Request,
    RequestHandler,
    Response,
  } from "express";
  import jwt, { Secret } from "jsonwebtoken";
  import dotenv from "dotenv";
  dotenv.config();
  import cors from "cors";
import { userRouter } from "./modules/user/userRouter";
import { variantRouter } from "./modules/Variants/variantRouter";
import { productRouter } from "./modules/products/productRouter";
import { shippingAddressRouter } from "./modules/shipping/shippingAddressRouter";
import { orderRouter } from "./modules/orders/orderRouter";
import { categoryRouter } from "./modules/category/categoryRouter";

  const app: Application = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
 
app.use("/api/v1/", userRouter);
app.use("/api/v1/", categoryRouter);
app.use("/api/v1/", variantRouter);
app.use("/api/v1/", productRouter);
app.use("/api/v1/", shippingAddressRouter);
app.use("/api/v1/", orderRouter);
  
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  // app.use(globalErrorHandler);
  
  export default app;
  module.exports = app;
  