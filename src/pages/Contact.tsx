import {
  Grid,
  TextField,
  Card,
  CardContent,
  Button,
  Container,
} from "@mui/material";
import { AxiosStatic } from "axios";
import {
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import BM from "../assets/photos/business_man.jpg";
import Banner from "../components/Contact/Banner";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactEmail from "../components/UI/Modals/ContactEmail/ContactEmail";
import classes from "../styles/Contact/ContactStyles.module.css";

const Contact: FC<{
  isMobile: boolean;
  axios: AxiosStatic;

  API_VERSION: string | undefined;
}> = ({ isMobile, axios, API_VERSION }) => {
  const [limit, setLimit] = useState<number>(500);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>();
  const textRef = useRef<HTMLInputElement>();
  const topicRef = useRef<HTMLInputElement>();
  const Exit: () => void = () => {
    setView(false);
  };

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
          setView(false);
          setReady(false);
        });
    };
    if (!ready) {
      return;
    }
    fetchContact(
      emailRef.current?.value,
      textRef.current?.value,
      topicRef.current?.value
    );
  }, [ready, axios, API_VERSION]);

  const submitHandler: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    if (!invalid || limit < 0) {
      setReady(false);
      return;
    }
    setReady(true);
  };

  const contactMethod: {
    key: number;
    title: string;
    img: string;
    btn: ReactElement;
    classes: string;
    imgCss: string;
  }[] = [
    {
      key: 1,
      title: "Call us by email",
      img: BM,
      btn: (
        <Button
          variant="outlined"
          sx={{
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
      ),
      classes: classes.contactEmail,
      imgCss: classes.img,
    },
    {
      key: 2,
      title: "Call us by phone",
      img: BM,
      btn: (
        <Button
          variant="outlined"
          sx={{
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
      ),
      classes: classes.contactEmail,
      imgCss: classes.img,
    },
    {
      key: 3,
      title: "Chat with us",
      img: BM,
      btn: (
        <Button
          variant="outlined"
          sx={{
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
      ),
      classes: classes.contactEmail,
      imgCss: classes.img,
    },
  ];

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
            topic={topicRef}
            limit={limit}
          />
        </Container>
      )}
      <Banner />
      <ContactInfo
        CM={contactMethod}
        Grid={Grid}
        classes={classes}
        isMobile={isMobile}
      />
    </>
  );
};

export default Contact;
