class PackEntity {
  constructor(
    designation,
    duration,
    price,
    promotion,
    nbrProjects,
    nbrClients,
    isActive
  ) {
    this._designation = designation
    this._duration = duration
    this._price = price
    this._promotion = promotion
    this._nbrProjects = nbrProjects
    this._nbrClients = nbrClients
    this._isActive = isActive
  }

  get designation() {
    return this._designation
  }

  set designation(newDesignation) {
    this._designation = newDesignation
  }

  get duration() {
    return this._duration
  }

  set duration(newDuration) {
    this._duration = newDuration
  }

  get price() {
    return this._price
  }

  set price(newPrice) {
    this._price = newPrice
  }

  get promotion() {
    return this._promotion
  }

  set promotion(newPromotion) {
    this._promotion = newPromotion
  }

  get nbrProjects() {
    return this._nbrProjects
  }

  set nbrProjects(newNbrProjects) {
    this._nbrProjects = newNbrProjects
  }

  get nbrClients() {
    return this._nbrClients
  }

  set nbrClients(newNbrClients) {
    this._nbrClients = newNbrClients
  }
  get isActive() {
    return this._isActive
  }

  set isActive(newIsActive) {
    this._isActive = newIsActive
  }
}

export default PackEntity
