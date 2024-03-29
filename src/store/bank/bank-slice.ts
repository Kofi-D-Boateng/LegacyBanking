import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankDetails } from "../../types/Bank";

function initialState(): BankDetails {
  return {
    name: "",
    branches: [],
    country: "",
    area: "",
    totalHoldings: 0,
    zipcode: "",
  };
}

const bankSlice = createSlice({
  name: "bank",
  initialState: initialState(),
  reducers: {
    getBankInfo(
      state,
      action: PayloadAction<{
        name: string;
        country: string;
        area: string;
        zipcode: string;
        totalHoldings: number;
        branches: {
          name: string;
          country: string;
          state: string;
          zipcode: string;
          totalHoldings: number;
          latitude: number;
          longitude: number;
        }[];
      }>
    ) {
      const { name, country, area, zipcode, totalHoldings, branches } =
        action.payload;
      state.name = name ? name : state.name;
      state.country = country ? country : state.country;
      state.area = area ? area : state.area;
      state.zipcode = zipcode ? zipcode : state.zipcode;
      state.totalHoldings = totalHoldings ? totalHoldings : state.totalHoldings;
      state.branches = branches.length > 0 ? branches : state.branches;
    },
  },
});

const bankActions = bankSlice.actions;

export { bankActions, bankSlice };
