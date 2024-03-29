import axios from "axios";
import { FC, useEffect } from "react";
import False from "../components/VerifyAccount/False";
import True from "../components/VerifyAccount/True";
import { Box, Grid } from "@mui/material";
import {
  NavigateFunction,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Cancel, Check } from "@mui/icons-material";
import AppRoute from "../enums/Route";
import { API_VERSION } from "../components/UI/Constants/Constants";
import LoadingSpinner from "../components/UI/Modals/LoadingSpinner/LoadingSpinner";
import { Title } from "../enums/Title";

const VerifyAccount: FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  document.getElementById("title")!.innerText = Title.VERIFYACCOUNT;
  const navigate: NavigateFunction = useNavigate();
  const params = useSearchParams()[0];
  const tokenParam = params.get("token");
  const accountVerifiedParam = params.get("verified");
  useEffect(() => {
    const fetchVerification: (token: string | null) => void = async (token) => {
      await axios
        .get(`${API_VERSION}/verify/account`, {
          params: { token: token },
        })
        .then(() => {
          navigate(`?verified=successful`);
          setTimeout(() => {
            navigate(AppRoute.LOGIN, { replace: true });
          }, 5000);
        })
        .catch(() => {
          navigate(`?verified=unsuccessful`);
          setTimeout(() => {
            navigate(AppRoute.LOGIN, { replace: true });
          }, 5000);
        });
    };
    fetchVerification(tokenParam);
  });
  return (
    <>
      {!accountVerifiedParam && <LoadingSpinner />}
      {accountVerifiedParam && accountVerifiedParam === "successful" && (
        <True isMobile={isMobile} Grid={Grid} Box={Box} PASSED={Check} />
      )}
      {accountVerifiedParam && accountVerifiedParam === "unsuccessful" && (
        <False isMobile={isMobile} Grid={Grid} Box={Box} FAILED={Cancel} />
      )}
    </>
  );
};
export default VerifyAccount;
