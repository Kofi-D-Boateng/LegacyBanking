import { MonthsMap } from "../../../types/Maps";

// BACKEND URL
const API_VERSION: string | undefined =
  process.env.REACT_APP_API_VERSION || "api/v2";
const BUFFERTIME: number =
  parseInt(process.env.REACT_APP_BUFFERTIME!) || 10000 * 6 * 5;

// HASH
const HASHTYPE = process.env.REACT_APP_HASH || "sha256";

// BUTTON VALUES
const FORWARD: string = "forward";
const BACKWARD: string = "backward";
const LOCKEDCARD: string = "Lock Card";
const LOCKEDACCOUNT: string = "Lock Account";

// MISC
const ReactLeafLetTitleLayer: { att: string; url: string } = {
  att: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const MonthMap: MonthsMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export {
  ReactLeafLetTitleLayer,
  BACKWARD,
  FORWARD,
  LOCKEDACCOUNT,
  LOCKEDCARD,
  BUFFERTIME,
  API_VERSION,
  MonthMap,
  HASHTYPE,
};
