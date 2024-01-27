import orderRepository from "../../../../application/repositories/subscriptions/OrderRepository.js";
import orderController from "../../../../controllers/subscriptions/OrderController.js";
import logger from "../../../../infrastructure/loggers/logger.js";
import orderDbRepository from "../../../databases/postgres/repositories/subscriptions/orderDbRepository.js";
export default function orderRouter(express) {
  const router = express.Router();
  const controller = orderController(
    orderRepository,
    orderDbRepository,
    logger
  );
  router.route("/").post(controller.addNewOrder).get(controller.findAllOrders);
  router
    .route("/:id")
    .get(controller.findOrder)
    .put(controller.updateOrder)
    .delete(controller.removeOrder);

  return router;
}
