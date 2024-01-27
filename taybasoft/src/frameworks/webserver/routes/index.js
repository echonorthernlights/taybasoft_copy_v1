import authRouter from "./auth/auth.js"
import orderRouter from "./subscriptions/order.js"
import packRouter from "./subscriptions/pack.js"
import subscriberRouter from "./subscriptions/subscriber.js"
import subscriptionRouter from "./subscriptions/subscription.js"
import roleRouter from "./users/role.js"
import userRouter from "./users/user.js"
export default function routes(app, express) {
  app.use("/", authRouter(express))
  app.use("/packs", packRouter(express))
  app.use("/subscribers", subscriberRouter(express))
  app.use("/subscriptions", subscriptionRouter(express))
  app.use("/orders", orderRouter(express))

  app.use("/roles", roleRouter(express))
  app.use("/users", userRouter(express))
}
