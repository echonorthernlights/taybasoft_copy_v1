import OrderEntity from "../../../entities/subscriptions/OrderEntity.js";
import newError from "../../../utils/newError.js";

export default function orderUseCase(orderRepository, logger) {
  const addNewOrder = async (modelData) => {
    logger.info("____Start create new order use case____");
    logger.info("start extracting order model data");
    const { subscription, paymentDate, totalOrder } = modelData;
    logger.info("end extracting order model data");
    logger.info("start creating order entity");
    const newOrder = new OrderEntity(subscription, paymentDate, totalOrder);
    logger.info("end creating order entity");
    const createdOrder = await orderRepository.create(newOrder);
    logger.info(`Order created with id : ${createdOrder.id}`);
    logger.info("____ End create new order use case____");
    return createdOrder;
  };
  const findAllOrders = async () => {
    logger.info("____Start get all orders use case____");
    const result = await orderRepository.findAll();
    logger.info("____End get all orders use case____");
    return result;
  };

  const getOrder = async (orderId) => {
    logger.info("____Start get order by id use case____");
    const result = await orderRepository.findById(orderId);
    logger.info("____End get order by id use case____");
    return result;
  };

  const updateOrder = async (orderId, modelData) => {
    logger.info("____Start updating order use case____");
    const foundOrder = await orderRepository.findById(orderId);
    if (!foundOrder || foundOrder === null) {
      throw newError(`No order found with id: ${orderId}`, 500);
    }
    const { subscription, paymentDate, totalOrder } = modelData;
    const updatedOrder = new OrderEntity(subscription, paymentDate, totalOrder);
    await orderRepository.update(orderId, updatedOrder);
    const result = await orderRepository.findById(orderId);
    logger.info("____End updating order use case____");
    return result;
  };

  const removeOrder = async (orderId) => {
    logger.info("____Start removing order use case____");
    const findOrder = await orderRepository.findById(orderId);
    if (!findOrder || findOrder === null) {
      throw newError(`No order found with id: ${orderId}`, 500);
    }
    const result = await orderRepository.remove(orderId);
    logger.info("____End removing order use case____");
    return result;
  };

  return { addNewOrder, findAllOrders, getOrder, updateOrder, removeOrder };
}
