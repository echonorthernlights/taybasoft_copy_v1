import React from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { FaAddressBook } from "react-icons/fa6"
import { ImCheckboxChecked } from "react-icons/im"
import { Link } from "react-router-dom"
import subscriberImage from "../assets/images/subscriber_image.svg"
import Wrapper from "../assets/wrappers/Card"

const Card = ({ subscriber }) => {
  //const { subscriberId } = useParams()
  const {
    id: subscriberId,
    companyName,
    address,
    phoneNumber,
    subscriptionStatus,
  } = subscriber
  return (
    <Wrapper>
      <img src={subscriberImage} alt="Card Image" />
      <div className="card-content">
        <h5>{companyName}</h5>
        <p>
          <FaAddressBook />
          <span>: {address}</span>
        </p>
        <p>
          <FaPhoneAlt />
          <span>: {phoneNumber}</span>
        </p>
      </div>
      <div className="card-footer">
        <Link
          className="btn btn-prmary"
          to={`/admin/subscribers/${subscriberId}`}
        >
          Details
        </Link>
        {!subscriptionStatus ? (
          <Link
            className="btn btn-primary"
            to={`/admin/subscribers/${subscriberId}/subscriptions/new`}
          >
            Activate
          </Link>
        ) : (
          <ImCheckboxChecked className="sub-status-active" />
        )}
      </div>
    </Wrapper>
  )
}

export default Card
