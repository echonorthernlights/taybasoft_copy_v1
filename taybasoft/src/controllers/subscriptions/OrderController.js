import OrderUseCase from "../../application/use_cases/subscriptions/orderUseCase.js";
import catchAsync from "../../utils/catchAsync.js";
import newError from "../../utils/newError.js";
import valideUuid from "../../utils/valideUuid.js";

export default function orderController(
  orderRepository,
  orderDbRepository,
  logger
) {
  const repository = orderRepository(orderDbRepository(), logger);
  const orderUseCase = OrderUseCase(repository, logger);

  const addNewOrder = catchAsync(async (req, res, next) => {
    logger.info("____Start create new order controller____");
    const modelData = { ...req.body };
    const result = await orderUseCase.addNewOrder(modelData);
    logger.info("____End create new order controller____");
    return res.json({
      msg: "order added successfully",
      order: result,
    });
  });

  const findAllOrders = catchAsync(async (req, res, next) => {
    logger.info("____Start get all orders controller____");
    const result = await orderUseCase.findAllOrders();
    logger.info("____End get all orders controller____");
    return res.json(result);
  });

  const findOrder = catchAsync(async (req, res, next) => {
    logger.info("____Start get order controller____");
    const { id } = req.params;
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid order with id: ${id}`, 400);
    }
    const result = await orderUseCase.findOrder(id);
    if (result === null) {
      throw newError(`No order found with id: ${id}`, 500);
    }
    logger.info("____End get order controller____");
    return res.json(result);
  });

  const updateOrder = catchAsync(async (req, res, next) => {
    logger.info("____Start update order controller____");
    const { id } = req.params;
    const modelData = req.body;
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid order id: ${id}`, 400);
    }
    const result = await orderUseCase.updateOrder(id, modelData);
    logger.info("____End update order controller____");
    return res.json({ status: "Order updated successfully", data: result });
  });

  const removeOrder = catchAsync(async (req, res, next) => {
    logger.info("____Start remove order controller____");
    const { id } = req.params;
    if (!valideUuid(id.toString())) {
      throw newError(`Invalid order id: ${id}`, 400);
    }
    await orderUseCase.removeOrder(id);
    logger.info("____End remove order controller____");
    return res.json({ msg: "Order removed successfully" });
  });

  return {
    addNewOrder,
    findAllOrders,
    findOrder,
    updateOrder,
    removeOrder,
  };
}
