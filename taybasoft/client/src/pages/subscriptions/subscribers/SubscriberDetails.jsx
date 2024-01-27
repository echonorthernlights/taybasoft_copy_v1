import React, { useEffect, useState } from "react"
import { ImBlocked, ImCheckboxChecked } from "react-icons/im"
import { Link, useParams } from "react-router-dom"
import Wrapper from "../../../assets/wrappers/DetailsWrapper"
import ListWrapper from "../../../assets/wrappers/ListPage"
import ObjectWrapper from "../../../assets/wrappers/ObjectDetails"
import AddLink from "../../../components/AddLink"
import Loader from "../../../components/Loader"
import Table from "../../../components/Table"
import { useGetSubscriberDetailsQuery } from "../../../slices/subscribers/subscribersApiSlice"
import { useGetSubscriptionsBySubscriberQuery } from "../../../slices/subscriptions/subscriptionsApiSlice"
import { useGetUserBySubscriberIdQuery } from "../../../slices/users/usersApiSlice"

const SubscriberDetails = () => {
  const { subscriberId } = useParams()
  const [formatedSubscriptions, setFormatedSubscriptions] = useState([])

  const [activeSubscription, setActiveSubscription] = useState()
  const {
    data: subscriber,
    isLoading: subscriberLoading,
    error: subsriberError,
  } = useGetSubscriberDetailsQuery(subscriberId)

  const {
    data: subscriberAdminAccountData,
    isLoading: subscriberAdminAccountLoading,
    error: subscriberAdminAccountError,
  } = useGetUserBySubscriberIdQuery(subscriberId)

  const {
    data: subscriptions,
    isLoading: subscriptionsLoading,
    error: subscriptionError,
  } = useGetSubscriptionsBySubscriberQuery(subscriberId)

  const columns = [
    { accessor: "packDesignation", header: "Pack" },
    { accessor: "startDate", header: "Date debut" },
    { accessor: "endDate", header: "Date fin" },
    { accessor: "nbrProjects", header: "Nombre de projets" },
    { accessor: "nbrClients", header: "Nombre de clients" },
    { accessor: "paymentMethod", header: "Methode de paiement" },
    { accessor: "paymentDate", header: "Date de paiement" },
    { accessor: "totalAmount", header: "Prix Total" },
    { accessor: "status", header: "Status" },
    { accessor: "operations", header: "Operation(s)" },
  ]

  useEffect(() => {
    if (subscriptions) {
      setFormatedSubscriptions(
        subscriptions.map((sub) => {
          if (sub.status === "pending") {
            return {
              ...sub,
              operations: {
                updatePath: `/admin/subscribers/${subscriberId}/subscriptions/${sub.id}/edit`,
                deletePath: `/admin/subscribers/${subscriberId}/subscriptions/${sub.id}/delete`,
              },
            }
          }
          return {
            ...sub,
            // trProps: { className: sub.isActive ? 'active-row' : '' },
          }
        })
      )

      // Get active subscription details
      setActiveSubscription(
        subscriptions.find((subscription) => {
          return subscription.status === "active"
        })
      )
    }
  }, [subscriptions])

  const filterCols = [
    {
      accessor: "startDate",
      header: "Date debut",
    },
  ]

  return (
    <Wrapper>
      {subscriberLoading ? (
        <Loader />
      ) : (
        <div className="details-container">
          <ObjectWrapper>
            <h3 className="details-title">Details abonné</h3>
            <div className="details-content">
              <p>
                <span>Raison Sociale :</span> {subscriber.companyName || ""}
              </p>
              <p>
                <span>Adresse :</span> {subscriber.address || ""}
              </p>
              <p>
                <span>Email :</span> {subscriber.email || ""}
              </p>
              <p>
                <span>Telephone :</span> {subscriber.phoneNumber || ""}
              </p>
              <p>
                <span>Status d'abonnement :</span>
                {subscriber.subscriptionStatus ? (
                  <ImCheckboxChecked className="sub-status-active" />
                ) : (
                  <ImBlocked className="sub-status-inactive" />
                )}
              </p>
              <div className="operations">
                <Link
                  className="btn"
                  to={`/admin/subscribers/${subscriber.id}/edit`}
                >
                  modifier
                </Link>
                {subscriptions &&
                  !subscriptions.find((sub) => sub.status != "pending") && (
                    <Link
                      className="btn danger-btn"
                      to={`/admin/subscribers/${subscriberId}/delete`}
                    >
                      supprimer
                    </Link>
                  )}
              </div>

              <h4 className="details-sub-title">Information Administrateur</h4>
              {!subscriberAdminAccountLoading && (
                <div className="details-content">
                  <p>
                    <span>Nom complet :</span>
                    {`${subscriberAdminAccountData.lastName} ${subscriberAdminAccountData.firstName}`}
                  </p>
                  <p>
                    <span>Email :</span> {subscriberAdminAccountData.email}
                  </p>
                </div>
              )}
            </div>
          </ObjectWrapper>

          {activeSubscription && (
            <ObjectWrapper>
              <h3 className="details-title">abonnement actif</h3>
              <div className="details-content">
                <p>
                  <span>Pack :</span> {activeSubscription.packDesignation || ""}
                </p>
                <p>
                  <span>Date début :</span> {activeSubscription.startDate || ""}
                </p>
                <p>
                  <span>Date fin :</span> {activeSubscription.endDate || ""}
                </p>
                <p>
                  <span>Nombre de projets:</span>
                  {activeSubscription.nbrProjects || ""}
                </p>
                <p>
                  <span>Nombre de clients :</span>
                  {activeSubscription.nbrClients || ""}
                </p>
                <p>
                  <span>Date de paiement :</span>
                  {activeSubscription.paymentDate || ""}
                </p>
                <p>
                  <span>Méthode de paiement :</span>
                  {activeSubscription.paymentMethod || ""}
                </p>
                <p>
                  <span>Total :</span>
                  {`${activeSubscription.totalAmount || ""} dh`}
                </p>
              </div>
            </ObjectWrapper>
          )}
        </div>
      )}
      {!subscriptionsLoading && (
        <ListWrapper>
          <div>
            <h3 className="list-title">Liste des abonnements</h3>
            <AddLink
              path={`subscriptions/new`}
              text="Ajouter un nouveau abonnement"
            />
            <Table
              data={formatedSubscriptions}
              columns={columns}
              filterCols={filterCols}
            />
          </div>
        </ListWrapper>
      )}
    </Wrapper>
  )
}

export default SubscriberDetails
