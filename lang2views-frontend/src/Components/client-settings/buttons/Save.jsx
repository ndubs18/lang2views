import "./save.css";

function Save(props) {
  if (props === null) throw new Error("Props for save button cannot be null");

  return (
    <button
      id="save"
      className={props.component + " btn btn-primary mt-3 fs-3 ms-5"}
    >
      Save
    </button>
  );
}

export default Save;
