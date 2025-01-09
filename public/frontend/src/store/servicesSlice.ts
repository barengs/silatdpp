import { createSlice } from '@reduxjs/toolkit';
import { GUEST_BOOK_DEFAULT_DATA, INSTITUTION_DEFAULT_DATA } from '@/utils/constans';

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
      institutions: [INSTITUTION_DEFAULT_DATA],
      guestBook: [GUEST_BOOK_DEFAULT_DATA]
    },
    reducers: {
      setInstitution: (state, action) => {
        state.institutions = action.payload.data
      },
      setGuestBook: (state, action) => {
        state.guestBook = action.payload.data
      }
    },
  });


export const { setInstitution, setGuestBook } = servicesSlice.actions
export default servicesSlice.reducer

