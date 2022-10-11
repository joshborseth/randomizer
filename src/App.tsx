import { ChangeEvent, useEffect, useState } from "react";
import Error from "./Error";
import Spinner from "./Spinner";

export interface inputDataType {
  id: number;
  value: string;
}

const App = () => {
  const [inputCount, setInputCount] = useState(2);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputData, setInputData] = useState<inputDataType[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const updateInputData = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const exist = inputData.find((input) => input.id === i + 1);
    if (exist) {
      setInputData(
        inputData.map((input) => {
          if (input.id === i + 1) {
            return { ...input, value: e.target.value };
          }
          return input;
        })
      );
    } else {
      setInputData([...inputData, { id: i + 1, value: e.target.value }]);
    }
  };
  useEffect(() => {
    if (inputCount > 1) {
      setIsError(false);
    }
  }, [inputCount]);

  const handleSubmit = () => {
    let error = false;
    inputData.map((input) => {
      if (!input.value) {
        error = true;
      }
    });
    if (inputData.length === 0) error = true;
    if (error) {
      setIsError(true);
      setErrorText("Please fill in all of the inputs.");
      return;
    }
    setIsSubmitted(true);
  };
  return (
    <div className="p-10 flex flex-col gap-10 justify-center items-center">
      <h1 className="text-3xl font-bold uppercase">Randomizer</h1>
      {!isSubmitted ? (
        <>
          <div>
            <button
              onClick={() => setInputCount(inputCount + 1)}
              className="p-2 m-2 bg-green-500 text-white"
            >
              Add Another Input
            </button>
            <button
              onClick={() => {
                if (inputCount > 2) {
                  setInputCount(inputCount - 1);
                }
              }}
              className="p-2 m-2 bg-red-500 text-white"
            >
              Remove An Input
            </button>
          </div>
          <form
            className="grid grid-cols-1 mx-auto gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {[...Array(inputCount)].map((_, i) => {
              return (
                <div key={i} className="flex flex-col">
                  <label className="text-xl font-bold uppercase">Item {i + 1}</label>
                  <input
                    className="p-2 border border-gray-300 rounded-md"
                    type="text"
                    placeholder="Item Name..."
                    onChange={(e) => updateInputData(e, i)}
                  />
                </div>
              );
            })}
            <button className="p-2 m-2 bg-blue-500 text-white" type="submit">
              Randomize!
            </button>
          </form>
          {isError && <Error errorText={errorText} />}
        </>
      ) : (
        <Spinner
          setIsSubmitted={setIsSubmitted}
          inputData={inputData}
          setInputData={setInputData}
          setInputCount={setInputCount}
        />
      )}
    </div>
  );
};

export default App;
