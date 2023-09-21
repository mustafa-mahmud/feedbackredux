const Ratings = ({ index, selected, handleChange }) => {
  index = index + 1;

  //////////////////////////////////////////////////////
  return (
    <li>
      <input
        type="radio"
        name="rating"
        id={`num${index}`}
        value={`${index}`}
        checked={selected === index}
        onChange={handleChange}
      />
      <label htmlFor={`num${index}`}>{index}</label>
    </li>
  );
};

export default Ratings;
