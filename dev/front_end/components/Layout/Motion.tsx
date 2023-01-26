import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const variants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Motion: FC<Props> = ({ children }) => {
  return (
    <motion.div
      variants={variants} 
      initial="hidden" 
      animate="enter" 
      exit="exit" 
      transition={{ type: "linear" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default Motion;
