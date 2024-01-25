import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contacts/contactsSlicer';
import css from './Filter.module.css';

const Filter = ({ filter }) => {
  const dispatch = useDispatch();
  const handleChangeFilter = event => {
    const value = event.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  return (
    <div className={css.filter}>
      <p>Find contacts by name</p>
      <input
        value={filter}
        onChange={handleChangeFilter}
        type="text"
        name="filter"
        placeholder="Kate..."
      />
    </div>
  );
};

export { Filter };
