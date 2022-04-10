import axios from "axios";
import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BankInfo from "../components/Locations/BankInfo";
import Banner from "../components/Locations/Banner";
import { bankActions } from "../store/bank/bank-slice";
import { RootState } from "../store/store";

const Locations: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const LEGACY: {
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
  } = useSelector((state: RootState) => state.bank);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    const fetchBankData: () => void = async () => {
      await axios
        .get("http://localhost:8081/api/v1/bank/info")
        .then((response) => {
          const { name, country, state, zipcode, totalHoldings, branches } =
            response.data;
          dispatch(
            bankActions.getBankInfo({
              name,
              country,
              area: state,
              zipcode: zipcode,
              totalHoldings,
              branches,
            })
          );
        })
        .catch((error) => {});
    };
    fetchBankData();
  }, [dispatch]);
  return (
    <>
      <Banner />
      <BankInfo bank={LEGACY} />
    </>
  );
};

export default Locations;
