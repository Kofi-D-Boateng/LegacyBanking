import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initialState(): {
  name: string;
  country: string;
  area: string;
  zipcode: string;
  totalHoldings: number;
  branches: {
    name: string;
    country: string;
    zipcode: string;
    totalHoldings: number;
  }[];
} {
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
          zipcode: string;
          totalHoldings: number;
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
