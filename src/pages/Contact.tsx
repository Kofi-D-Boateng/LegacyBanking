import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Banner from "../components/Contact/Banner";
import ContactForm from "../components/Forms/ContactForm/ContactForm";
import { API_VERSION } from "../components/UI/Constants/Constants";
import classes from "../styles/Contact/ContactStyles.module.css";

const Contact: FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const [limit, setLimit] = useState<number>(500);
  const params = useSearchParams()[0];
  const urlParamAction = params.get("action");
  const urlParamStatus = params.get("status");
  const nav = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const textRef = useRef<HTMLInputElement>();
  const topicRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const fetchContact: (
      email: string | undefined,
      text: string | undefined,
      topic: string | undefined
    ) => void = async (email, text, topic) => {
      await axios
        .put(`${API_VERSION}/customer-service/email-customer-service`, {
          email: email,
          text: text,
          topic: topic,
        })
        .then(() => {
          nav("?status=success", { replace: true });
        })
        .catch(() => {
          nav("?status=fail");
        });
    };
    if (!urlParamAction?.includes("send-request")) return;
    fetchContact(
      emailRef.current?.value,
      textRef.current?.value,
      topicRef.current?.value
    );
  }, [nav, urlParamAction]);

  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    if (
      !emailRef.current?.value ||
      !textRef.current?.value ||
      !topicRef.current?.value
    ) {
      return;
    }
    nav("?action=send-request", { replace: true });
  };

  return (
    <>
      <Banner classes={classes} isMobile={isMobile} />
      <Grid className={classes.container} container>
        <Grid sx={{ justifyContent: "space-evenly" }} container>
          <Typography variant="h4">Contact us by phone</Typography>
        </Grid>
        <Grid sx={{ justifyContent: "space-evenly" }} container>
          <Typography variant="body1">888-055-0000</Typography>
        </Grid>
        <Grid sx={{ justifyContent: "space-evenly", color: "red" }} container>
          <Typography variant="body1">
            * Please do not call this number. This is a fake/stub account *
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.container} container>
        <Grid sx={{ justifyContent: "space-evenly" }} container>
          <Typography variant="h4">Send us an email</Typography>
        </Grid>
        {urlParamStatus?.includes("failed") && (
          <Grid sx={{ justifyContent: "space-evenly" }} container>
            <Typography sx={{ color: "red" }} variant="h4">
              There was an issue on our end receiving the email. We apologize
              for the inconvience.
            </Typography>
          </Grid>
        )}
        <Grid sx={{ justifyContent: "space-evenly" }} container>
          <ContactForm
            Submit={submitHandler}
            limit={limit}
            setLimit={setLimit}
            classes={classes}
            email={emailRef}
            text={textRef}
            topic={topicRef}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
