const FormInput = ({
  type,
  name,
  labelText,
  placeHolder,
  des,
  classValue,
  defaultValue,
  value,
  onChange,
  noTitle,
  inputError,
  required = true,
  readOnly = false,
}) => {
  return (
    <div className="grow">
      {!noTitle && (
        <label
          className={`capitalize ${classValue ? classValue : "text-lg"} mb-2`}
          htmlFor={name}
        >
          {labelText}
        </label>
      )}

      <p className="text-sm text-gray-400 mb-1">{des}</p>
      <input
        readOnly={readOnly}
        required={required}
        className={
          inputError
            ? "tracking-wider font-extralight border-red-500"
            : "tracking-wider font-extralight border-gray-300"
        }
        type={type}
        name={name}
        id={name}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
