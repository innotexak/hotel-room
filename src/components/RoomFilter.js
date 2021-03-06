import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};
export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);
  const { handleChange, type, price, maxPrice, minPrice, capacity, minSize, maxSize, pets, breakfast } = context;

  // Types search rendered
  let types = getUnique(rooms, 'type');
  types = ['all', ...types];
  types = types.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  // Quests search rendered
  let people = getUnique(rooms, 'capacity');
  people = people.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
            {types}
          </select>
        </div>
        {/* end of select type  */}
        {/* quests */}
        <div className="form-group">
          <label htmlFor="capacity">Quests</label>
          <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
            {people}
          </select>
        </div>
        {/* end of quests  */}
        {/* price  */}
        <div className="form-group">
          <label htmlFor="price">
            room price <del>N</del>
            {price * 50}
          </label>
          <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} className="form-control" onChange={handleChange} />
        </div>
        {/* end of price  */}

        {/* room size   */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input type="number" name="minSize" id="size" value={minSize} className="size-input" onChange={handleChange} />
            <input type="number" name="maxSize" id="size" value={maxSize} className="size-input" onChange={handleChange} />
          </div>
        </div>
        {/* end of room size   */}

        <div className="form-group">
          <div className="single-extra">
            <input type="checkbox" name="breakfast" checked={breakfast} id="breakfast" onChange={handleChange} />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input type="checkbox" name="pets" checked={pets} id="pets" onChange={handleChange} />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  );
}
