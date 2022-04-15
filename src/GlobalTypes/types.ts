import React from "react";
import { PathMatch } from "react-router-dom";

export type GlobalLayouts = {
  children?: React.ReactNode;
  mobile: boolean;
  login: PathMatch<string> | null;
  signup: PathMatch<string> | null;
  auth: boolean;
};
