import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewContact, deleteContacts, fetchContacts } from 'services/api';

export const apiGetContacts = createAsyncThunk(
  'posts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await fetchContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContactData, thunkApi) => {
    try {
      const contacts = await addNewContact(newContactData);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const contacts = await deleteContacts(contactId);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const statusPending = state => {
  state.isLoading = true;
};
const statusRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const contactsSlicer = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(apiGetContacts.pending, statusPending)
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(addContact.pending, statusPending)
      .addCase(addContact.rejected, statusRejected)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.pending, statusPending)
      .addCase(deleteContact.rejected, statusRejected)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(index, 1);
      });
  },
});

export const { setFilter } = contactsSlicer.actions;

export const contactsReducer = contactsSlicer.reducer;
