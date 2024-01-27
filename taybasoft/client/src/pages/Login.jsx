import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Navigate, useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from "../components"
import SubmitBtn from "../components/SubmitBtn"
import useForm from "../hooks/useForm"
import { useLoginMutation } from "../slices/auth/authApiSlice"
import { fetchRole, setUserAuth } from "../slices/users/userAuthSlice"
import { toastHandler } from "../utils/toastHandler"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading: loadingLogin }] = useLoginMutation()
  const { user, isAuthenticated } = useSelector((state) => state.userAuth)

  // if user already authenticated redirect
  if (isAuthenticated) {
    if (user.userRole === "super admin") {
      return <Navigate to={"/admin"} />
    } else {
      return <Navigate to={"/app"} />
    }
  }

  const loginUser = async (userData) => {
    try {
      const result = await login(userData).unwrap()
      // set user data
      dispatch(setUserAuth(result.data))
      // fetch user role
      dispatch(fetchRole(result.data.role))
      // save user into localStorage
      localStorage.setItem("userInfo", JSON.stringify(result.data))
      navigate("/")
    } catch (err) {
      toastHandler(err, "error")
    }
  }

  const { values, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    loginUser
  )

  return (
    <Wrapper>
      <Form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <SubmitBtn formBtn isLoading={loadingLogin} />
      </Form>
    </Wrapper>
  )
}

export default Login
