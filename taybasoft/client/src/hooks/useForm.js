import { useEffect, useState } from "react"

const useForm = (initialState, callback) => {
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    callback(values)
  }

  // useEffect(() => {
  //   setValues(initialState)
  // }, [initialState])

  return {
    values,
    handleChange,
    handleSubmit,
    setValues,
  }
}

export default useForm
