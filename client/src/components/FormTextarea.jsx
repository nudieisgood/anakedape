const FormTextarea = ({
  name,
  des,
  rows = 5,
  labelText,
  defaultValue,
  required = true,
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-lg capitalize">
        {labelText || name}
      </label>
      <p className="text-sm text-gray-400">{des}</p>
      <textarea
        className={"tracking-wider font-extralight border-gray-300"}
        required={required}
        defaultValue={defaultValue}
        name={name}
        id={name}
        rows={rows}
      ></textarea>
    </div>
  );
};
export default FormTextarea;
