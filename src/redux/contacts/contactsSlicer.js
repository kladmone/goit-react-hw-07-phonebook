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
      .addCase(fetchContacts.pending, statusPending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addNewContact.pending, statusPending)
      .addCase(addNewContact.rejected, statusRejected)
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteContacts.pending, statusPending)
      .addCase(deleteContacts.rejected, statusRejected)
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

export const { setFilter } = contactsSlicer.actions;

export const contactsReducer = contactsSlicer.reducer;
