import "../clientSettings.css";

function TrelloListId(props) {
  return (
    <div className="text-input-container ms-5 mt-4">
      <h2>Trello list id</h2>
      <label htmlFor="trello-list-id-input"></label>
      <input
        className="form-control form-control-lg"
        id="trello-list-id-input"
        placeholder={props.trelloListId}
      ></input>
    </div>
  );
}

export default TrelloListId;
