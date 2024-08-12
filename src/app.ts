
import express, {
    Application,
    NextFunction,
    Request,
    RequestHandler,
    Response,
  } from "express";
  // import { globalErrorHandler } from "./modules/shared/globalErrorHandler";
  // import { userRouter } from "./modules/user/user.router";
  // import globalErrorHandler from "./modules/shared/globalErrorHandler";
  // import cowRouter from "./modules/cow/cow.routes";
  import jwt, { Secret } from "jsonwebtoken";
  import dotenv from "dotenv";
  dotenv.config();
  import cors from "cors";
import { userRouter } from "./modules/user/userRouter";
// import { userRouter } from "./modules/auth/authRouter";
//   import { globalErrorHandler } from "./modules/shared/globalHandleError";
//   import { bookRouter } from "./modules/Book/book.routes";
//   import { reviewRouter } from "./modules/Review/review.route";
//   import { readingRouter } from "./modules/ReadingList/ReadingList.Route";
//   import { wishlistRouter } from "./modules/WishList/wishlist.route";
  
  // import orderRouter from "./modules/orders/order.router";
  const app: Application = express();
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
 
  app.use("/api/v1/", userRouter);
//   app.use("/api/v1/", bookRouter);
//   app.use("/api/v1/", reviewRouter);
//   app.use("/api/v1/", readingRouter);
//   app.use("/api/v1/", wishlistRouter);
  
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  // app.use(globalErrorHandler);
  
  export default app;
  module.exports = app;
  