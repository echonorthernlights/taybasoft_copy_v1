import React from "react"
import { Form, Link, useNavigate } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import FormRow from "../../../components/FormRow"
import SubmitBtn from "../../../components/SubmitBtn"
import useForm from "../../../hooks/useForm"
import { useCreateSubscriberMutation } from "../../../slices/subscribers/subscribersApiSlice"
import { generatePassword } from "../../../utils/generatePassword"
import { toastHandler } from "../../../utils/toastHandler"
const AddNewSubscriber = () => {
  const navigate = useNavigate()
  const [createSubscriber, { isLoading: loadingPack }] =
    useCreateSubscriberMutation()

  const addNewSubscriber = async (subscriberData) => {
    try {
      const result = await createSubscriber(subscriberData).unwrap()
      toastHandler(result, "success")
      navigate("/admin/subscribers")
    } catch (err) {
      toastHandler(err, "error")
    }
  }
  const handleGeneratePassword = (e) => {
    e.preventDefault()
    const suggestedPassword = generatePassword(12)
    setValues({ ...values, password: suggestedPassword })
  }

  const { values, handleChange, handleSubmit, setValues } = useForm(
    {
      companyName: "",
      email: "",
      address: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      adminEmail: "",
      password: "",
    },
    addNewSubscriber
  )

  return (
    <Wrapper>
      <h2 className="form-title">Ajouter Nouveau Abonnee</h2>
      <Form method="POST" onSubmit={handleSubmit} className="form">
        <FormRow
          type={"text"}
          name={"companyName"}
          labelText={"Raison Sociale"}
          onChange={handleChange}
          value={values.companyName}
          required
        />
        <FormRow
          type={"email"}
          name={"email"}
          labelText={"Email"}
          onChange={handleChange}
          value={values.email}
          required
        />
        <FormRow
          type={"text"}
          name={"address"}
          labelText={"Adresse"}
          onChange={handleChange}
          value={values.address}
          required
        />
        <FormRow
          type={"text"}
          name={"phoneNumber"}
          labelText={"Telephone"}
          onChange={handleChange}
          value={values.phoneNumber}
          required
        />
        <h3 style={{ marginBlock: "1rem" }}>Compte Administrateur </h3>
        <FormRow
          type={"text"}
          name={"lastName"}
          labelText={"Nom"}
          onChange={handleChange}
          value={values.lastName}
          required
        />
        <FormRow
          type={"text"}
          name={"firstName"}
          labelText={"Prénom"}
          onChange={handleChange}
          value={values.firstName}
          required
        />

        <FormRow
          type={"email"}
          name={"adminEmail"}
          labelText={"Email"}
          onChange={handleChange}
          value={values.adminEmail}
          required
        />

        <FormRow
          type={"text"}
          name={"adminPhoneNumber"}
          labelText={"Telephone"}
          onChange={handleChange}
          value={values.adminPhoneNumber}
          required
        />

        <FormRow
          type={"text"}
          name={"password"}
          labelText={"Mot de passe"}
          onChange={handleChange}
          value={values.password}
          required
        />
        <button className="btn btn-secondary" onClick={handleGeneratePassword}>
          generer mot de passe
        </button>
        <div className="buttons-container">
          <SubmitBtn formBtn isLoading={loadingPack} />
          <Link className="btn btn-secondary" to="/admin/subscribers">
            retour
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddNewSubscriber
