export default class UserEntity {
  constructor(firstName, lastName, email, password, role, subscriber, status) {
    this._firstName = firstName
    this._lastName = lastName
    this._email = email
    this._password = password
    this._role = role
    this._subscriber = subscriber
    this._status = status
  }

  get firstName() {
    return this._firstName
  }

  set firstName(newFirstName) {
    this._firstName = newFirstName
  }

  get lastName() {
    return this._lastName
  }

  set lastName(newLastName) {
    this._lastName = newLastName
  }

  get email() {
    return this._email
  }

  set email(newEmail) {
    this._email = newEmail
  }

  get password() {
    return this._password
  }

  set password(newPassword) {
    this._password = newPassword
  }

  get role() {
    return this._role
  }

  set role(newRole) {
    this._role = newRole
  }

  get subscriber() {
    return this._subscriber
  }

  set subscriber(newSubscriber) {
    this._subscriber = newSubscriber
  }

  get status() {
    return this._status
  }

  set status(newStatus) {
    this._status = newStatus
  }
}
