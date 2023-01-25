const spinnerOnLoadButton = ({ id, onClickFunction, text }) => {
  const runFunctionUpdateButton = async () => {
    document.getElementById(id).textContent = "Loading...";
    document.getElementById(id).classList.add("loading");
    onClickFunction().then(() => {
        // hide the download button
        document.getElementById(id).style.display = "none";
      })
      .catch((error) => {
        console.log(error)
        document.getElementById(id).style.display = "block";
        document.getElementById(id).innerHTML = "Error";
      });

  };

  return (
    <button
      id={id}
      className="btn btn-active btn-primary p-2"
      onClick={runFunctionUpdateButton}
    >
      <span className="font-bold">{text}</span>
    </button>
  );
};

export default spinnerOnLoadButton;
