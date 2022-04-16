import axios from "axios";
import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GEOLOCATION } from "../assets/data/Geolocation";
import BankInfo from "../components/Locations/BankInfo";
import BankSearch from "../components/Locations/BankSearch";
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
      area: string;
      zipcode: string;
      totalHoldings: number;
    }[];
  } = useSelector((state: RootState) => state.bank);
  const [param, setParam] = useState<{
    state: string | undefined;
    zipcode: string | undefined;
    country: string | undefined;
  }>({ country: undefined, state: undefined, zipcode: undefined });
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

  const locationHandler: (e: React.MouseEvent<HTMLImageElement>) => void = ({
    clientX,
    clientY,
  }) => {
    console.log("X: " + clientX);
    console.log("Y: " + clientY);
  };

  return (
    <>
      <Banner />
      <BankInfo />
      <BankSearch
        Geolocation={GEOLOCATION}
        bank={LEGACY}
        param={param}
        onParam={setParam}
        location={locationHandler}
      />
    </>
  );
};

export default Locations;
