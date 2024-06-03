import "../clientSettings.css";

function NumFormatInput({ format, value }) {
  return (
    <div className="text-input-container">
      <h2>Long format</h2>
      <label htmlFor={`num-${format}-format-input`}></label>
      <input
        className="form-control form-control-lg"
        id={`num-${format}-format-input`}
        defaultValue={value}
      />
    </div>
  );
}

export default NumFormatInput;
