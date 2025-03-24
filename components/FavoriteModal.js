export default function FavoriteModal({ favorites, setAnswer, show }) {
  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } left-1/4 w-2/4 flex-col text-center text-black p-5 bg-white rounded-lg`}
    >
      <p className="text-black">hello</p>
      {favorites.map((recipe) => {
        return (
          <div>
            <p
              onClick={() => {
                setAnswer(recipe);
              }}
            >
              {recipe.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
