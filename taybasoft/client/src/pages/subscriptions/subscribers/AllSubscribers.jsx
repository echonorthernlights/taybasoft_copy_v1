import React from "react"
import Wrapper from "../../../assets/wrappers/CardsPageContainer"
import AddLink from "../../../components/AddLink"
import Card from "../../../components/Card"
import Loader from "../../../components/Loader"
import { useGetSubscribersQuery } from "../../../slices/subscribers/subscribersApiSlice"

const AllSubscribers = () => {
  const { data, isLoading, error } = useGetSubscribersQuery()
  return (
    <Wrapper>
      <h2 className="title">Liste des abonnés</h2>
      <div className="operations">
        <AddLink
          path="/admin/subscribers/new"
          text="Ajouter un nouveau abonné"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cards-container">
          {data.map((subscriber) => (
            <Card subscriber={subscriber} key={subscriber.id} />
          ))}
        </div>
      )}
    </Wrapper>
  )
}

export default AllSubscribers
