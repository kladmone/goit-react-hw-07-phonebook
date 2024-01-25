import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contacts/contactsSlicer';
import css from './AddContactForm.module.css';
import { useDispatch } from 'react-redux';

export const AddContactForm = ({ contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleAddContact = formData => {
    const hasDuplicates = contacts.some(
      contact => contact.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicates) {
      alert(`${formData.name} is already in contacts!`);
      return;
    }

    const finalContact = { ...formData, id: nanoid() };

    const action = addContact(finalContact);
    dispatch(action);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const formData = {
      name,
      number,
    };
    handleAddContact(formData);
    setName('');
    setNumber('');
  };

  return (
    <div className={css.phonebookContainer}>
      <h1>Phonebook</h1>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <label className={css.formLabel}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label className={css.formLabel}>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            required
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};
