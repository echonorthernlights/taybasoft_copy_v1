class SubscriberEntity {
  constructor(companyName, email, address, phoneNumber, subscriptionStatus) {
    this._companyName = companyName;
    this._email = email;
    this._address = address;
    this._phoneNumber = phoneNumber;
    this._subscriptionStatus = subscriptionStatus;
  }

  get companyName() {
    return this._companyName;
  }

  set companyName(newCompanyName) {
    this._companyName = newCompanyName;
  }

  get email() {
    return this._email;
  }

  set email(newEmail) {
    this._email = newEmail;
  }

  get address() {
    return this._address;
  }

  set address(newAddress) {
    this._address = newAddress;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(newPhoneNumber) {
    this._phoneNumber = newPhoneNumber;
  }

  get subscriptionStatus() {
    return this._subscriptionStatus;
  }

  set subscriptionStatus(newSubscriptionStatus) {
    this._subscriptionStatus = newSubscriptionStatus;
  }
}

export default SubscriberEntity;
