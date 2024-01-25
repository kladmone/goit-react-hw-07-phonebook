import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contactsSlicer';
import css from './ContactList.module.css';
const ContactList = ({ contacts, filter }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    const action = deleteContact(contactId);
    dispatch(action);
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
