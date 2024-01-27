import React, { useEffect, useState } from "react"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import FormRow from "../../../components/FormRow"
import Loader from "../../../components/Loader"
import SubmitBtn from "../../../components/SubmitBtn"
import {
  useGetSubscriberDetailsQuery,
  useUpdateSubscriberMutation,
} from "../../../slices/subscribers/subscribersApiSlice"
import { toastHandler } from "../../../utils/toastHandler"

const EditSubscriber = () => {
  const { subscriberId } = useParams()
  const navigate = useNavigate()
  const {
    data: subscriberData,
    isLoading: subscriberLoading,
    refetch: refetchSubscriber,
    error,
  } = useGetSubscriberDetailsQuery(subscriberId)
  const [updatedSubscriberFormData, setUpdatedSubscriberFormData] = useState({})

  const [updateSubscriber, { isLoading: loadingSubscriber }] =
    useUpdateSubscriberMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await updateSubscriber(updatedSubscriberFormData).unwrap()
      toastHandler(result, "success")
      await refetchSubscriber()
      navigate(`/admin/subscribers/${subscriberData.id}`)
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  const handleChange = (e) => {
    setUpdatedSubscriberFormData({
      ...updatedSubscriberFormData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (subscriberData) {
      setUpdatedSubscriberFormData(subscriberData)
    }
  }, [subscriberData])

  if (error) {
    throw error
  }

  return (
    <Wrapper>
      <h2 className="form-title">Modifier Abonnee :</h2>
      <Form method="POST" onSubmit={handleSubmit} className="form">
        {subscriberLoading ? (
          <Loader />
        ) : (
          <>
            <FormRow
              type={"text"}
              name={"companyName"}
              labelText={"Raison Sociale"}
              onChange={handleChange}
              value={updatedSubscriberFormData.companyName || ""}
              required
            />
            <FormRow
              type={"email"}
              name={"email"}
              labelText={"Email"}
              onChange={handleChange}
              value={updatedSubscriberFormData.email || ""}
              required
            />
            <FormRow
              type={"text"}
              name={"address"}
              labelText={"Adresse"}
              onChange={handleChange}
              value={updatedSubscriberFormData.address || ""}
              required
            />
            <FormRow
              type={"text"}
              name={"phoneNumber"}
              labelText={"Telephone"}
              onChange={handleChange}
              value={updatedSubscriberFormData.phoneNumber || ""}
              required
            />

            <div className="buttons-container">
              <SubmitBtn formBtn isLoading={loadingSubscriber} />
              <Link
                className="btn btn-secondary"
                to={`/admin/subscribers/${subscriberId}`}
              >
                retour
              </Link>
            </div>
          </>
        )}
      </Form>
    </Wrapper>
  )
}

export default EditSubscriber
