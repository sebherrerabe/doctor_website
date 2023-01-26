import { ILayout } from "../types";
import { createContext } from "react";

const LayoutContext = createContext<ILayout | null>(null);

export default LayoutContext;
