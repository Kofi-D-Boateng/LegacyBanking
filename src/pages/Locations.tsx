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
import { BankDetails } from "../types/Bank";
import { API_VERSION } from "../components/UI/Constants/Constants";

const Locations: FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const LEGACY: BankDetails = useSelector((state: RootState) => state.bank);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const fetchBankData: () => void = async () => {
      await axios.get(`${API_VERSION}/bank/info`).then((response) => {
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
  }, [dispatch, LEGACY.name]);

  return (
    <>
      <Banner classes={classes} isMobile={isMobile} />
      <BankInfo
        photoOne={BM}
        photoTwo={Seoul}
        classes={classes}
        isMobile={isMobile}
      />
      <BankSearch classes={classes} bank={LEGACY} />
    </>
  );
};

export default Locations;
