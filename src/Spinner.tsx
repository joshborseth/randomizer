import { motion, useTime, useTransform } from "framer-motion";
import { PieChart } from "react-minimal-pie-chart";
import { inputDataType } from "./App";
import { CSS_COLOR_NAMES } from "./colors";
type Props = {
  setIsSubmitted: (isSubmitted: boolean) => void;
  inputData: inputDataType[];
  setInputData: (inputData: inputDataType[]) => void;
  setInputCount: (inputCount: number) => void;
};

const Spinner = (props: Props) => {
  const time = useTime();
  const rand0to360: number = Math.floor(Math.random() * 360);
  //0 to 360 so that the spinner end in a random position
  const rotate = useTransform(time, [0, 10000], [0, 14400 + rand0to360], { clamp: true });
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <motion.div style={{ rotate }}>
        <PieChart
          className="h-80 w-80"
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={(index) => ({
            fill: "white",
            fontSize: "5px",
            fontFamily: "sans-serif",
          })}
          data={props.inputData.map((item, i) => {
            return {
              title: item.value,
              value: 1,
              //dont wanna do random because sometime it will be the same beside each other
              //dont know what this does but it makes it unique enough to work
              color: CSS_COLOR_NAMES[i % CSS_COLOR_NAMES.length],
            };
          })}
        />
      </motion.div>
      <span className="text-4xl font-extrabold">^</span>
      <button
        className="p-2 m-2 bg-red-500 text-white"
        onClick={() => {
          props.setIsSubmitted(false);
          props.setInputData([]);
          props.setInputCount(2);
        }}
      >
        Go Back
      </button>
      <div className="flex justify-center gap-10 flex-wrap">
        {props.inputData.map((item, i) => {
          return (
            <div className="flex justify-center items-center gap-2">
              <p className="text-2xl font-bold">{item.value}</p>
              <div
                key={i}
                style={{ backgroundColor: CSS_COLOR_NAMES[i % CSS_COLOR_NAMES.length] }}
                className="h-5 w-5 rounded-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spinner;
