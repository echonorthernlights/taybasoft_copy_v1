class OrderEntity {
	constructor(
		subscription,
		paymentDate,
		totalOrder
	) {
		this._subscription = subscription
		this._paymentDate = paymentDate
		this._totalOrder = totalOrder
	}

	get subscription() {
		return this._subscription
	}

	set subscription(newSubscription) {
		this._subscription = newSubscription
	}

	get paymentDate() {
		return this._paymentDate
	}

	set paymentDate(newPaymentDate) {
		this._paymentDate = newPaymentDate
	}

	get totalOrder() {
		return this._totalOrder
	}

	set totalOrder(newTotalOrder) {
		this._totalOrder = newTotalOrder
	}
}

export default OrderEntity
