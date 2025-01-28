export default function ModalComponent({ showModal, history }) {
  return (
    <div className="flex flex-col bg-white shadow-lg text-gray-800 w-2/4 text-center p-10">
      <h3 className="font-title text-7xl mb-10">History:</h3>
      <ul className="flex font-title text-gray-500 flex-col text-4xl text-center gap-5">
        {history &&
          (() => {
            const items = [];
            if (history.length > 0) {
              for (let i = 0; i < history.length; i++) {
                items.push(<li key={i}>{history[i]}</li>);
              }
              return items;
            } else {
              <li>Nothing Here! Male a search</li>;
            }
          })()}

        <li>Nothing Here! Make a search...</li>
      </ul>

      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={showModal} className="btn">
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
