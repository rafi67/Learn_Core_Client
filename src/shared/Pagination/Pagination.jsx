

const Pagination = ({pageCount}) => {
  return (
    <div className="join mx-auto">
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        checked="checked"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="2"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="3"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="4"
      />
    </div>
  );
};

export default Pagination;
