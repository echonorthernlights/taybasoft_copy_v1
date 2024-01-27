import React from "react"
import { Form, Link, useNavigate } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import FormRow from "../../../components/FormRow"
import SubmitBtn from "../../../components/SubmitBtn"
import useForm from "../../../hooks/useForm"
import {
  useCreatePackMutation,
  useGetPacksQuery,
} from "../../../slices/subscriptions/packsApiSlice"
import { toastHandler } from "../../../utils/toastHandler"

const AddNewPack = () => {
  const navigate = useNavigate()
  const [createPack, { isLoading: loadingPack }] = useCreatePackMutation()
  const { refetch } = useGetPacksQuery()

  const addNewPack = async (packData) => {
    try {
      if (packData.promotion === "") packData.promotion = 0
      const result = await createPack(packData).unwrap()
      toastHandler(result, "success")
      await refetch()
      navigate("/admin/packs")
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  const { values, handleChange, handleSubmit } = useForm(
    {
      designation: "",
      duration: "",
      price: "",
      promotion: "",
      nbrProjects: "",
      nbrClients: "",
    },
    addNewPack
  )

  return (
    <Wrapper>
      <h2 className="form-title">Ajouter un Nouveau Pack</h2>
      <Form onSubmit={handleSubmit} className="form form-center">
        <FormRow
          type={"text"}
          name={"designation"}
          labelText={"Désignation"}
          onChange={handleChange}
          value={values.designation}
          required
        />
        <FormRow
          type={"number"}
          name={"duration"}
          labelText={"Durée (j)"}
          onChange={handleChange}
          value={values.duration}
          required
        />
        <FormRow
          type={"number"}
          name={"price"}
          labelText={"Prix"}
          onChange={handleChange}
          value={values.price}
          required
        />
        <FormRow
          type={"number"}
          name={"nbrClients"}
          labelText={"Nombre de clients"}
          onChange={handleChange}
          value={values.nbrClients}
          required
        />
        <FormRow
          type={"number"}
          name={"nbrProjects"}
          labelText={"Nombre de projets"}
          onChange={handleChange}
          value={values.nbrProjects}
          required
        />
        <FormRow
          type={"number"}
          name={"promotion"}
          labelText={"Promotion %"}
          value={values.promotion}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <SubmitBtn formBtn />
          <Link className="btn btn-secondary" to="/admin/packs">
            retour
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddNewPack
