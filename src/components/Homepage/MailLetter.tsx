import { Grid, Typography } from "@mui/material";
import { AxiosStatic } from "axios";
import React, { useRef, useState } from "react";
import Form from "../Forms/MailLetterForm/MailLetterForm";

const MailLetter: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  axios: AxiosStatic;
  DOMAIN: string | undefined;
  API_VERSION: string | undefined;
}> = ({ classes, isMobile, API_VERSION, DOMAIN, axios }) => {
  const [show, setShow] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>();

  const submitHandler: (e: React.FormEvent) => void = async (e) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      setReady(true);
    }

    if (ready) {
      await axios.put(`http://localhost:5500/api/v1/mail-list/add-to-list`, {
        email: emailRef.current?.value,
      });
    }
  };

  return (
    <Grid className={classes.mail} container>
      <Grid xs={12} md={12} item>
        <Typography variant="h4">Join our mail letters!</Typography>
        <Typography variant="body1">
          Stay up to date with the latest news from our business and global
          finances around the world!
        </Typography>
      </Grid>
      <Grid xs={12} md={12} item>
        <Form
          isMobile={isMobile}
          classes={classes}
          show={show}
          setShow={setShow}
          emailRef={emailRef}
          submit={submitHandler}
        />
      </Grid>
    </Grid>
  );
};

export default MailLetter;
