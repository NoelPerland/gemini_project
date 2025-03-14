export default function ModalComponent({ showModal, history, recoverHistory }) {
  return (
    <div className="flex flex-col rounded-lg bg-white shadow-lg text-gray-800 w-2/4 text-center p-10">
      <h3 className="font-title text-7xl mb-16">History:</h3>
      <ul className="flex font-title text-gray-500 flex-col text-4xl text-center gap-5 ">
        {(() => {
          const items = [];
          if (history.length > 1) {
            for (let i = 1; i < 6; i++) {
              if (history[i]) {
                items.push(
                  <li
                    className="hover:text-purple-500 hover:cursor-pointer"
                    onClick={() => {
                      recoverHistory(history.length - i);
                    }}
                    key={i}
                  >
                    {history[history.length - i]}
                  </li>
                );
              }
            }
          } else if (history.length == 1) {
            items.push(<li>Nothing here! make a search...</li>);
          }

          return items;
        })()}
      </ul>
      <div className="modal-action">
        {/* if there is a button in form, it will close the modal */}
        <button
          onClick={showModal}
          className="btn-lg rounded-lg font-title h-20 bg-gray-800 text-xl text-white border-none hover:bg-gray-900"
        >
          close
        </button>
      </div>
    </div>
  );
}
