const FormSelect = ({ name, labelText, list, defaultValue = "" }) => {
  return (
    <div className="flex flex-col">
      <label className={"text-lg mb-1"} htmlFor={name}>
        {labelText || name}
      </label>
      <select
        // onChange={(e) => {
        //   handleChange(e.target.value);
        // }}
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="ml-1 border py-2 px-4 rounded-sm tracking-wider font-extralight border-gray-300"
      >
        {list.map((item) => {
          if (Object.entries(item)[0][0] === "fe")
            return (
              <option value={item.be} key={item.fe}>
                {item.fe}
              </option>
            );

          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
