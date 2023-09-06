import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CommonState {
  rates: CurrencyDTO[];
}

const initialState: CommonState = {
  rates: [],
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setRates: (state, action: PayloadAction<CurrencyDTO[]>) => {
      state.rates = action.payload;
    },
  },
});

export const {setRates} = commonSlice.actions;

export default commonSlice.reducer;
