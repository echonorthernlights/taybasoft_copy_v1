import React, { useEffect } from "react"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/FormPage"
import FormRow from "../../../components/FormRow"
import Loader from "../../../components/Loader"
import SubmitBtn from "../../../components/SubmitBtn"
import useForm from "../../../hooks/useForm"
import { useGetPacksQuery } from "../../../slices/subscriptions/packsApiSlice"
import { useCreateSubscriptionMutation } from "../../../slices/subscriptions/subscriptionsApiSlice"
import { toastHandler } from "../../../utils/toastHandler"
const AddNewSubscription = () => {
  const { subscriberId } = useParams()
  const navigate = useNavigate()
  const {
    data: packsData,
    isLoading: packsLoading,
    error: packsError,
  } = useGetPacksQuery()

  const [createSubscription, { isLoading: loadingSubscription }] =
    useCreateSubscriptionMutation()

  const addNewSubscription = async (subscriptionData) => {
    try {
      const result = await createSubscription(subscriptionData).unwrap()
      toastHandler(result, "success")
      navigate(`/admin/subscribers/${subscriberId}`)
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  const { values, handleChange, handleSubmit, setValues } = useForm(
    {
      subscriber: subscriberId,
      packId: "",
      paymentDate: "",
      paymentMethod: "",
      totalAmount: "",
      startDate: "",
      endDate: "",
    },
    addNewSubscription
  )

  const calculateEndDate = (startDate, packId) => {
    if (startDate && packId && packsData) {
      const selectedPack = packsData.find((pack) => pack.id === packId)
      if (selectedPack && selectedPack.duration) {
        const startDateObj = new Date(startDate)
        const durationInDays = Number(selectedPack.duration)
        const endDateObj = new Date(
          startDateObj.getTime() + durationInDays * 24 * 60 * 60 * 1000
        )
        return endDateObj.toISOString().split("T")[0]
      }
    }
    return ""
  }

  const handleStartDateChange = (e) => {
    const endDate = calculateEndDate(e.target.value, values.packId)
    setValues({ ...values, endDate, startDate: e.target.value })
  }

  useEffect(() => {
    if (values.startDate) {
      const endDate = calculateEndDate(values.startDate, values.packId)
      setValues({ ...values, endDate, startDate: values.startDate })
    }
  }, [values.packId])

  return (
    <Wrapper>
      <h2 className="form-title">Ajouter Nouveau Abonnement</h2>
      <Form method="POST" onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label className="form-label">Pack</label>

          {packsLoading ? (
            <Loader />
          ) : (
            <select
              name="packId"
              className="form-select"
              onChange={handleChange}
            >
              <option key={0}></option>
              {packsData.map((pack) => {
                return (
                  <option key={pack.id} value={pack.id}>
                    {pack.designation}
                  </option>
                )
              })}
            </select>
          )}
        </div>
        <FormRow
          type={"date"}
          name={"startDate"}
          labelText={"Date debut"}
          onChange={handleStartDateChange}
          value={values.startDate}
        />
        <FormRow
          type={"date"}
          name={"endDate"}
          labelText={"Date fin"}
          onChange={handleChange}
          value={values.endDate}
        />
        <FormRow
          type={"text"}
          name={"paymentMethod"}
          labelText={"Methode de paiement"}
          onChange={handleChange}
          value={values.paymentMethod}
        />
        <FormRow
          type={"date"}
          name={"paymentDate"}
          labelText={"Date de paiement"}
          onChange={handleChange}
          value={values.paymentDate}
        />
        <FormRow
          type={"number"}
          name={"totalAmount"}
          labelText={"Total"}
          onChange={handleChange}
          value={values.totalAmount}
        />
        <div className="buttons-container">
          <SubmitBtn formBtn isLoading={loadingSubscription} />
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

export default AddNewSubscription
