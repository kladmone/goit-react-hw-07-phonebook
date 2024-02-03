import { contactsReducer } from './contacts/contactsSlicer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: contactsReducer,
});
