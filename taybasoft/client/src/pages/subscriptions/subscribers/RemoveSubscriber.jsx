import React from "react"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import SubmitBtn from "../../../components/SubmitBtn"
import {
  useDeleteSubscriberMutation,
  useGetSubscribersQuery,
} from "../../../slices/subscribers/subscribersApiSlice"
import { toastHandler } from "../../../utils/toastHandler"

const RemoveSubscriber = () => {
  const { subscriberId } = useParams()
  const navigate = useNavigate()
  const [deleteSubscriber, { isLoading: loadingSubscriber }] =
    useDeleteSubscriberMutation()
  const { refetch } = useGetSubscribersQuery()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await deleteSubscriber(subscriberId).unwrap()
      toastHandler(result, "success")
      await refetch()
      navigate(`/admin/subscribers`)
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Confirmation de suppression</h2>
        <p className="remove-confirmation">
          Etes vous sur de vouloir supprimer l'abonné avec ID : {subscriberId}{" "}
          et son administrateur ?
        </p>
        <div className="buttons-container">
          <SubmitBtn formBtn isLoading={loadingSubscriber} deleteBtn />
          <Link
            className="btn btn-secondary"
            to={`/admin/subscribers/${subscriberId}`}
          >
            retour
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default RemoveSubscriber
