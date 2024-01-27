import React, { useEffect, useState } from "react"
import Wrapper from "../../../assets/wrappers/ListPage"
import AddLink from "../../../components/AddLink"
import Loader from "../../../components/Loader"
import Table from "../../../components/Table"
import { useGetPacksQuery } from "../../../slices/subscriptions/packsApiSlice"

const AllPacks = () => {
  const { data, isLoading, error } = useGetPacksQuery()
  const [formatedPacks, setFormatedPacks] = useState([])
  const columns = [
    { accessor: "designation", header: "Désignation" },
    { accessor: "duration", header: "Durée" },
    { accessor: "price", header: "Prix" },
    { accessor: "promotion", header: "Promotion %" },
    { accessor: "nbrProjects", header: "Nombre de projets" },
    { accessor: "nbrClients", header: "Nombre de clients" },
    { accessor: "operations", header: "Operation(s)" },
  ]

  const filterCols = [
    { accessor: "designation", header: "Désignation" },
    { accessor: "duration", header: "Durée" },
  ]

  useEffect(() => {
    if (data) {
      setFormatedPacks(
        data.map((row) => ({
          ...row,
          operations: {
            updatePath: `/admin/packs/edit/${row.id}`,
            deletePath: `/admin/packs/delete/${row.id}`,
          },
        }))
      )
    }
  }, [data])

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <>
      {isLoading ? (
        <Loader center />
      ) : (
        <Wrapper>
          <h2 className="title">Packs</h2>
          <div className="object-content">
            <div className="operations">
              <AddLink path="/admin/packs/new" text="Ajouter un nouveau pack" />
            </div>
            <Table
              data={formatedPacks}
              columns={columns}
              filterCols={filterCols}
            />
          </div>
        </Wrapper>
      )}
    </>
  )
}

export default AllPacks
