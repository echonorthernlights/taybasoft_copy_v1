import React from "react"
import { Link, useRouteError } from "react-router-dom"
import img from "../assets/images/not-found.svg"
import Wrapper from "../assets/wrappers/ErrorPage"

const Error = ({ notFound }) => {
  const error = useRouteError()

  if (error.status == 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Taybasoft 404" />
          <h3>Oops !! page not found</h3>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/">Back to Home</Link>
        </div>
      </Wrapper>
    )
  }
  if (notFound)
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Taybasoft 404" />
          <h3>Oops !! page not found</h3>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/">Back to Home</Link>
        </div>
      </Wrapper>
    )

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong !!</h3>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
