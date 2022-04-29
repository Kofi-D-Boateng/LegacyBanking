import {
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Container,
} from "@mui/material";
import { AxiosStatic } from "axios";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import BM from "../assets/photos/business_man.jpg";
import ContactEmail from "../components/UI/Modals/ContactEmail/ContactEmail";
import classes from "../styles/ContactStyles.module.css";

const Contact: FC<{ isMobile: boolean; URL: string; axios: AxiosStatic }> = ({
  isMobile,
  URL,
  axios,
}) => {
  const [limit, setLimit] = useState<number>(500);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>();
  const textRef = useRef<HTMLInputElement>();
  const Exit: () => void = () => {
    setView(false);
  };

  useEffect(() => {
    const fetchContact: (
      email: string | undefined,
      text: string | undefined
    ) => void = async (email, text) => {
      await axios
        .post(`${URL}/authentication/customer-service`, {
          email: email,
          text: text,
        })
        .then(() => {
          setView(false);
          setReady(false);
        });
    };
    if (!ready) {
      return;
    }
    fetchContact(emailRef.current?.value, textRef.current?.value);
  }, [ready, URL, axios]);

  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    if (!invalid || limit < 0) {
      setReady(false);
      return;
    }
    setReady(true);
  };

  return (
    <>
      {view && (
        <Container>
          <ContactEmail
            isMobile={isMobile}
            invalid={invalid}
            setLimit={setLimit}
            setView={setView}
            setInvalid={setInvalid}
            Submit={submitHandler}
            Exit={Exit}
            TextField={TextField}
            Card={Card}
            CardContent={CardContent}
            Button={Button}
            Grid={Grid}
            email={emailRef}
            text={textRef}
            limit={limit}
          />
        </Container>
      )}
      <Grid className={classes.container} container>
        <Grid sx={{ margin: "auto" }} md={6} item>
          <Typography className={classes.contactTitle} variant="h5">
            Get in contact with our representitve
          </Typography>
          <Grid className={classes.contactSocials} container>
            <Grid xs={12} md={12} item>
              <Typography variant="h6">
                Reach out to us on our social media platforms.
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.contactEmail} container>
            <Grid xs={12} md={12} item>
              <Typography variant="h6">Send us an email!</Typography>
            </Grid>
            <Grid xs={12} md={12} item>
              <Button
                variant="outlined"
                sx={{
                  width: "60%",
                  margin: "30px 0",
                  borderColor: "red",
                  color: "red",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                    borderColor: "red",
                  },
                }}
                onClick={() => setView(true)}
                fullWidth
              >
                Send Email
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid md={6} item>
          <img className={classes.img} src={BM} alt="lady.jpg" />
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
