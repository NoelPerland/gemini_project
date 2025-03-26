import { useEffect } from "react";

export default function ModalComponent({
  showModal,
  array,
  recover,
  title,
  fallback,
  modalType,
}) {
  console.log(modalType);
  return (
    <div className="flex flex-col rounded-lg bg-white shadow-lg text-gray-800 w-3/4 lg:w-2/4 text-center p-5 lg:p-10">
      <h3 className="font-title text-2xl lg:text-7xl mb-5 lg:mb-16">{title}</h3>
      <ul className="flex flex-wrap font-title text-gray-500 flex-col text-xl lg:text-4xl text-center gap-5 ">
        {modalType === "history" && (
          <HistoryComponent
            fallback={fallback}
            array={array}
            recover={recover}
          />
        )}
        {modalType === "favorites" && (
          <FavoriteComponent
            fallback={fallback}
            array={array}
            recover={recover}
          />
        )}
      </ul>
      <div className="modal-action">
        {/* if there is a button in form, it will close the modal */}
        <button
          onClick={showModal}
          className="btn-sm lg:btn-lg rounded-lg font-title lg:h-20 bg-gray-800 text-lg lg:text-xl text-white border-none hover:bg-gray-900"
        >
          close
        </button>
      </div>
    </div>
  );
}

export function HistoryComponent({ array, recover, fallback }) {
  const items = [];
  console.log("history", array);

  if (array.length > 1) {
    for (let i = 1; i < 6; i++) {
      if (array[i]) {
        items.push(
          <li
            className="w-full hover:text-purple-500 hover:cursor-pointer"
            onClick={() => {
              {
                recover(array.length - i);
              }
            }}
            key={i}
          >
            {array[array.length - i]}
          </li>
        );
      }
    }
  } else if (array.length == 1) {
    items.push(<li key="0">{fallback}</li>);
  }

  return items;
}

export function FavoriteComponent({ array, fallback, recover }) {
  const items = [];
  console.log("history", array);

  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      items.push(
        <li
          className="w-full hover:text-purple-500 hover:cursor-pointer"
          onClick={() => {
            {
              recover(i);
            }
          }}
        >
          {array[i].name}
        </li>
      );
    }
  } else {
    items.push(<li key="0">{fallback}</li>);
  }

  return items;
}
