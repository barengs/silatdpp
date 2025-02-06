import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_BUDGET_DATA, DEFAULT_DIVISION_DATA, DEFAULT_PARTNERS_DATA, DEFAULT_TRANSPORTATION, DEFAULT_USER_DATA, GUEST_BOOK_DEFAULT_DATA, INSTITUTION_DEFAULT_DATA } from '@/utils/constans';

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
      institutions: [INSTITUTION_DEFAULT_DATA],
      guestBook: [GUEST_BOOK_DEFAULT_DATA],
      transportation: [DEFAULT_TRANSPORTATION],
      divisions: [DEFAULT_DIVISION_DATA],
      partners: [DEFAULT_PARTNERS_DATA],
      budgets: [DEFAULT_BUDGET_DATA],
      users: [DEFAULT_USER_DATA],
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
      setBudget: (state, action) => {
        state.budgets = action.payload
      },
      setUsers: (state, action) => {
        state.users = action.payload
      },
    },
  });


export const { setInstitution, setGuestBook, setTransportation, setDivision, setPartners, setBudget, setUsers } = servicesSlice.actions
export default servicesSlice.reducer

