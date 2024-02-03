import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGetContacts,
  deleteContact,
} from '../../redux/contacts/contactsSlicer';
import css from './ContactList.module.css';
import { selectContacts, selectFilter } from '../../redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className={css.contactsList}>
      <h2>Contacts</h2>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={css.delBtn}
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ContactList };
