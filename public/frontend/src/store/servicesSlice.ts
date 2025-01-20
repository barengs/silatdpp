import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_DIVISION_DATA, DEFAULT_PARTNERS_DATA, DEFAULT_TRANSPORTATION, GUEST_BOOK_DEFAULT_DATA, INSTITUTION_DEFAULT_DATA } from '@/utils/constans';

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
      institutions: [INSTITUTION_DEFAULT_DATA],
      guestBook: [GUEST_BOOK_DEFAULT_DATA],
      transportation: [DEFAULT_TRANSPORTATION],
      divisions: [DEFAULT_DIVISION_DATA],
      partners: [DEFAULT_PARTNERS_DATA]
    },
    reducers: {
      setInstitution: (state, action) => {
        state.institutions = action.payload
      },
      setGuestBook: (state, action) => {
        state.guestBook = action.payload
      },
      setTransportation: (state, action) => {
        state.transportation = action.payload
      },
      setDivision: (state, action) => {
        state.divisions = action.payload
      },
      setPartners: (state, action) => {
        state.partners = action.payload
      },
    },
  });


export const { setInstitution, setGuestBook, setTransportation, setDivision, setPartners } = servicesSlice.actions
export default servicesSlice.reducer

