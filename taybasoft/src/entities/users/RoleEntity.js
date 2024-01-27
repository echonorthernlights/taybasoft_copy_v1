export default class Role {
  constructor(role, description) {
    this._role = role;
    this._description = description;
  }

  set role(newRole) {
    this._role = newRole;
  }

  get role() {
    return this._role;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  get description() {
    return this._description;
  }
}
