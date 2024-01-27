import React from "react"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import SubmitBtn from "../../../components/SubmitBtn"
import {
  useDeleteSubscriptionMutation,
  useGetSubscriptionsQuery,
} from "../../../slices/subscriptions/subscriptionsApiSlice"
import { toastHandler } from "../../../utils/toastHandler"
const RemoveSubscription = () => {
  const { subscriptionId, subscriberId } = useParams()
  const navigate = useNavigate()
  const [deleteSubscription, { isLoading: loadingSubscription }] =
    useDeleteSubscriptionMutation()
  const { refetch } = useGetSubscriptionsQuery()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await deleteSubscription(subscriptionId).unwrap()
      toastHandler(result, "success")
      await refetch()
      navigate(`/admin/subscribers/${subscriberId}`)
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Confirmation de suppression</h2>
        <p className="remove-confirmation">
          Etes vous sur de vouloir supprimer l'abonnement avec ID :
          {subscriptionId} ?
        </p>
        <div className="buttons-container">
          <SubmitBtn formBtn isLoading={loadingSubscription} deleteBtn />
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

export default RemoveSubscription
