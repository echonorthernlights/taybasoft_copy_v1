import PropTypes from "prop-types"
import React, { useState } from "react"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa"
import { IoFilter } from "react-icons/io5"
import { Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/Table"

const Table = ({ data, columns, filterCols }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" })
  const [filters, setFilters] = useState({})
  const [showFilters, setShowFilters] = useState(false)

  const sortedData = () => {
    let sorted = [...data].map((obj) => {
      const { createdAt, updatedAt, ...newObject } = obj
      return newObject
    })

    if (sortConfig.key) {
      sorted = sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    if (Object.keys(filters).length > 0) {
      sorted = sorted.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
          const cellValue = String(item[key])
          return cellValue.toLowerCase().includes(value.toLowerCase())
        })
      )
    }

    return sorted.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  }

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }
  return (
    <Wrapper>
      {data.length > 0 ? (
        <React.Fragment>
          <div className="table-addons">
            <div className="filter-container">
              <button
                className="btn show-filters-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                {<IoFilter />} filtres{" "}
              </button>

              {showFilters &&
                filterCols.map((f) => (
                  <div key={f.header} className="filter-row">
                    <label>{f.header}:</label>
                    <input
                      type="text"
                      value={filters[f.accessor] || ""}
                      onChange={(e) =>
                        handleFilterChange(f.accessor, e.target.value)
                      }
                    />
                  </div>
                ))}
            </div>
            <div className="pagination-container">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[5, 10].map((size) => (
                  <option key={size} value={size}>
                    Afficher {size}
                  </option>
                ))}
              </select>
              <select
                value={pageIndex}
                onChange={(e) => setPageIndex(Number(e.target.value))}
              >
                {[...Array(Math.ceil(data.length / pageSize))].map((val, i) => (
                  <option key={i} value={i}>
                    page {i + 1}
                  </option>
                ))}
              </select>
              <span>sur {Math.ceil(data.length / pageSize)}</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    onClick={() => handleSort(col.accessor)}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData().map((row) => (
                <tr key={row.id} {...row.trProps}>
                  {columns.map((col, index) => {
                    const key = col.accessor
                    if (key === "operations" && row.hasOwnProperty(key)) {
                      return (
                        <td key={key}>
                          <div className="operations-col">
                            {row[key].updatePath && (
                              <Link
                                className="edit-btn"
                                to={row[key].updatePath}
                              >
                                <FaRegEdit />
                              </Link>
                            )}
                            {row[key].deletePath && (
                              <Link
                                className="delete-btn"
                                to={row[key].deletePath}
                              >
                                <FaRegTrashAlt />
                              </Link>
                            )}
                          </div>
                        </td>
                      )
                    }
                    if (key !== "id") {
                      return <td key={key}>{row[key]}</td>
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        <span className="not-found-msg">Aucun record trouvé...</span>
      )}
    </Wrapper>
  )
}

Table.prototype = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
}

export default Table
