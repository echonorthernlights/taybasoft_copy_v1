import React from "react"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import SubmitBtn from "../../../components/SubmitBtn"
import {
  useDeletePackMutation,
  useGetPacksQuery,
} from "../../../slices/subscriptions/packsApiSlice"
import { toastHandler } from "../../../utils/toastHandler"
const RemovePack = () => {
  const { packId } = useParams()
  const navigate = useNavigate()
  const [deletePack, { isLoading: loadingPack }] = useDeletePackMutation()
  const { refetch } = useGetPacksQuery()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await deletePack(packId).unwrap()
      toastHandler(result, "success")
      await refetch()
      navigate("/admin/packs")
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Confirmation de suppression</h2>
        <p className="remove-confirmation">
          Etes vous sur de vouloir supprimer le pack avec ID : {packId} ?
        </p>
        <div className="buttons-container">
          <SubmitBtn formBtn isLoading={loadingPack} deleteBtn />
          <Link className="btn btn-secondary" to="/admin/packs">
            retour
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default RemovePack
