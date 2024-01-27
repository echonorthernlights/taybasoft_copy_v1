import OrderModel from "../../models/subscriptions/OrderModel.js";

export default function orderDbRepository() {
  const create = async (packEntity) => {
    const newOrder = new OrderModel({
      subscription: packEntity.subscription,
      paymentDate: packEntity.paymentDate,
      totalOrder: packEntity.totalOrder,
    });

    return await newOrder.save();
  };

  const findAll = async () => {
    return await OrderModel.findAll();
  };

  const findById = async (orderId) => {
    return await OrderModel.findByPk(orderId);
  };

  const update = async (orderId, orderEntity) => {
    const updatedOrder = {
      subscription: orderEntity.subscription,
      paymentDate: orderEntity.paymentDate,
      totalOrder: orderEntity.totalOrder,
    };
    return await OrderModel.update(updatedOrder, { where: { id: orderId } });
  };

  const remove = async (orderId) => {
    return await OrderModel.destroy({ where: { id: orderId } });
  };
  return { create, findAll, findById, update, remove };
}
