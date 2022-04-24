import { Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Form from "../Forms/MailLetterForm/MailLetterForm";

const MailLetter: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ classes, isMobile }) => {
  const [show, setShow] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>();

  useEffect(() => {
    // WE WILL SEND THIS EMAIL TO BACK END TO BE ADDED TO THE NEWSLETTER
  }, [ready]);

  const submitHandler: (e: React.FormEvent) => void = (e) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      setReady(true);
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
