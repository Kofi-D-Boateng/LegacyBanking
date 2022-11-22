import { AxiosStatic } from "axios";
import { FC, useEffect, useState } from "react";
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

const VerifyAccount: FC<{
  isMobile: boolean;
  axios: AxiosStatic;
  API_VERSION: string | undefined;
  LoadingSpinner: FC<{}>;
}> = ({ axios, API_VERSION, LoadingSpinner, isMobile }) => {
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const searchParams = useSearchParams()[0];
  useEffect(() => {
    const fetchVerification: (token: string | null) => void = async (token) => {
      await axios
        .get(`${API_VERSION}/authentication/confirm-account`, {
          params: { token: token },
        })
        .then((repsonse) => {
          setLoading(false);
          setVerified(repsonse.data);
          setTimeout(() => {
            navigate(AppRoute.LOGIN, { replace: true });
          }, 5000);
        })
        .catch(() => {
          setLoading(false);
          setVerified(false);
          setTimeout(() => {
            navigate(AppRoute.LOGIN, { replace: true });
          }, 5000);
        });
    };
    fetchVerification(searchParams.get("token"));
  });
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : verified ? (
        <True isMobile={isMobile} Grid={Grid} Box={Box} PASSED={Check} />
      ) : (
        <False isMobile={isMobile} Grid={Grid} Box={Box} FAILED={Cancel} />
      )}
    </>
  );
};

export default VerifyAccount;
