import axios from "axios";
import { FC, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bankActions } from "../store/bank/bank-slice";
import { RootState } from "../store/store";
import BM from "../assets/photos/business.jpg";
import Seoul from "../assets/photos/Seoul.jpg";
import BankInfo from "../components/Locations/BankInfo";
import BankSearch from "../components/Locations/BankSearch";
import Banner from "../components/Locations/Banner";
import classes from "../styles/Location/LocationsStyles.module.css";
import { NavigateFunction } from "react-router-dom";

const Locations: FC<{
  isMobile: boolean;
  nav: NavigateFunction;
  param: URLSearchParams;
  API_VERSION: string | undefined;
}> = ({ isMobile, API_VERSION, nav, param }) => {
  const LEGACY: {
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
  } = useSelector((state: RootState) => state.bank);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const fetchBankData: () => void = async () => {
      await axios
        .get(`http://localhost:8080/${API_VERSION}/bank/info`)
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
        });
    };
    fetchBankData();
  }, [dispatch, API_VERSION, LEGACY.name]);

  return (
    <>
      <Banner classes={classes} isMobile={isMobile} />
      <BankInfo
        photoOne={BM}
        photoTwo={Seoul}
        classes={classes}
        isMobile={isMobile}
      />
      <BankSearch classes={classes} bank={LEGACY} nav={nav} param={param} />
    </>
  );
};

export default Locations;
