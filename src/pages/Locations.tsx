import axios from "axios";
import { FC, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bankActions } from "../store/bank/bank-slice";
import { RootState } from "../store/store";
import BM from "../assets/photos/business_man.jpg";
import BankInfo from "../components/Locations/BankInfo";
import BankSearch from "../components/Locations/BankSearch";
import Banner from "../components/Locations/Banner";
import classes from "../styles/LocationsStyles.module.css";

const Locations: FC<{ isMobile: boolean; URL: string }> = ({
  isMobile,
  URL,
}) => {
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
      await axios.get(`${URL}/bank/info`).then((response) => {
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
  }, [dispatch, URL]);

  return (
    <>
      <Banner classes={classes} isMobile={isMobile} />
      <BankInfo photo={BM} classes={classes} isMobile={isMobile} />
      <BankSearch classes={classes} bank={LEGACY} />
    </>
  );
};

export default Locations;
