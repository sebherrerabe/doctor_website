import { createContext } from "react";
import { INewsContext } from "../types";

const NewsContext = createContext<INewsContext | null>(null);

export default NewsContext;
