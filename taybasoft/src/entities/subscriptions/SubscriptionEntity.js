class subscriberEntity {
	constructor(
		subscriber,
		packId,
		startDate,
		endDate,
		paymentDate,
		paymentMethod,
		totalAmount,
		status,
		projectsList = [],
		nbrClients = 0
	) {
		this._subscriber = subscriber
		this._packId = packId
		this._projectsList = projectsList
		this._nbrClients = nbrClients
		this._startDate = startDate
		this._endDate = endDate

		this._paymentMethod = paymentMethod
		this._paymentDate = paymentDate
		this._totalAmount = totalAmount
		this._status = status
	}

	get subscriber() {
		return this._subscriber
	}

	set subscriber(newSubscriber) {
		this._subscriber = newSubscriber
	}

	get packId() {
		return this._packId
	}

	set packId(newpackId) {
		this._packId = newpackId
	}

	get projectsList() {
		return this._projectsList
	}

	set projectsList(newProjectsList) {
		this._projectsList = newProjectsList
	}

	get nbrClients() {
		return this._nbrClients
	}

	set nbrClients(newNbrClients) {
		this._nbrClients = newNbrClients
	}

	get startDate() {
		return this._startDate
	}

	set startDate(newStartDate) {
		this._startDate = newStartDate
	}

	get endDate() {
		return this._endDate
	}

	set endDate(newEndDate) {
		this._endDate = newEndDate
	}

	get paymentMethod() {
		return this._paymentMethod
	}
	set paymentMethod(newPaymentMethod) {
		this._paymentMethod = newPaymentMethod
	}

	get paymentDate() {
		return this._paymentDate
	}
	set paymentDate(newPaymentDate) {
		this._paymentDate = newPaymentDate
	}

	get totalAmount() {
		return this._totalAmount
	}
	set totalAmount(newTotalAmount) {
		this._totalAmount = newTotalAmount
	}

	get status() {
		return this._status
	}
	set status(newStatus) {
		this._status = newStatus
	}
}

export default subscriberEntity
