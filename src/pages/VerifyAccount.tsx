import { AxiosStatic } from "axios";
import { FC, useEffect, useState } from "react";
import False from "../components/VerifyAccount/False";
import True from "../components/VerifyAccount/True";
import { Box, Grid } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LOGIN } from "../components/UI/Constants/Constants";
import { Cancel, Check } from "@mui/icons-material";

const VerifyAccount: FC<{
  isMobile: boolean;
  axios: AxiosStatic;
  searchParams: URLSearchParams;
  URL: string;
  LoadingSpinner: FC<{}>;
}> = ({ searchParams, axios, URL, LoadingSpinner, isMobile }) => {
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  useEffect(() => {
    const fetchVerification: (searchParams: URLSearchParams) => void = async (
      SP
    ) => {
      await axios
        .get(`${URL}/authentication/confirm-account`, {
          params: { token: SP.get("token") },
        })
        .then((repsonse) => {
          setLoading(false);
          setVerified(repsonse.data);
          setTimeout(() => {
            navigate(LOGIN, { replace: true });
          }, 5000);
        })
        .catch(() => {
          setLoading(false);
          setVerified(false);
          setTimeout(() => {
            navigate(LOGIN, { replace: true });
          }, 5000);
        });
    };
    fetchVerification(searchParams);
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
