const FormRow = ({
  type,
  name,
  labelText,
  value,
  onChange,
  disabled,
  required = false,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        value={value || ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
export default FormRow
