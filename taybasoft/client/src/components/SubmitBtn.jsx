import { useNavigation } from "react-router-dom"
const SubmitBtn = ({ formBtn, isLoading, deleteBtn }) => {
  const navigation = useNavigation()
  return (
    <button
      type="submit"
      className={`btn ${formBtn && "form-btn"} ${deleteBtn && "danger-btn"}`}
      disabled={isLoading}
    >
      {isLoading ? (deleteBtn ? "suppression en cours" : "envois en cours") : deleteBtn ? "supprimer" : "envoyer"}
    </button>
  )
}
export default SubmitBtn
