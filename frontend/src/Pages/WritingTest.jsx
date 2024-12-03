import React, { useState } from "react";
import WritingCanvas_MadhyaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara1";
import WritingCanvas_MadhyaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara2";
import WritingCanvas_AarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara1";
import WritingCanvas_AarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara2";
import WritingCanvas_AvarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara1";
import WritingCanvas_AvarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara2";
import VowelSymbolQ1 from "../Components/VowelSymbolTest/VowelSymbolQ1";
import VowelSymbolQ2 from "../Components/VowelSymbolTest/VowelSymbolQ2";
import VowelSymbolQ3 from "../Components/VowelSymbolTest/VowelSymbolQ3";
import VowelSymbolQ4 from "../Components/VowelSymbolTest/VowelSymbolQ4";
import VowelSymbolQ5 from "../Components/VowelSymbolTest/VowelSymbolQ5";
import VowelSymbolQ6 from "../Components/VowelSymbolTest/VowelSymbolQ6";
import VowelSymbolQ7 from "../Components/VowelSymbolTest/VowelSymbolQ7";
import VowelSymbolQ8 from "../Components/VowelSymbolTest/VowelSymbolQ8";
import VowelSymbolQ9 from "../Components/VowelSymbolTest/VowelSymbolQ9";
import VowelSymbolQ10 from "../Components/VowelSymbolTest/VowelSymbolQ10";
import PunctuationsTestQ1 from "../Components/PunctuationsTest/PunctuationsTestQ1";
import PunctuationsTestQ2 from "../Components/PunctuationsTest/PunctuationsTestQ2";
import PunctuationsTestQ3 from "../Components/PunctuationsTest/PunctuationsTestQ3";
import PunctuationsTestQ4 from "../Components/PunctuationsTest/PunctuationsTestQ4";
import PunctuationsTestQ5 from "../Components/PunctuationsTest/PunctuationsTestQ5";
import PunctuationsTestQ6 from "../Components/PunctuationsTest/PunctuationsTestQ6";

const WritingTest = () => {
  const [currentComponent, setCurrentComponent] = useState(1);

  const loadNextComponent = () => {
    setCurrentComponent((prev) => prev + 1); // Increment component state
    console.log("Switched to Component:", currentComponent + 1); // Debugging
  };

  const loadPreviousComponent = () => {
    setCurrentComponent((prev) => (prev > 1 ? prev - 1 : prev)); // Decrement component state
    console.log("Switched to Component:", currentComponent - 1); // Debugging
  };

  return (
    <div>
      {currentComponent === 1 && (
        <WritingCanvas_MadhyaAkshara1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 2 && (
        <WritingCanvas_MadhyaAkshara2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 3 && (
        <WritingCanvas_AarohanaAkshara1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 4 && (
        <WritingCanvas_AarohanaAkshara2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 5 && (
        <WritingCanvas_AvarohanaAkshara1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 6 && (
        <WritingCanvas_AvarohanaAkshara2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 7 && (
        <VowelSymbolQ1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 8 && (
        <VowelSymbolQ2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 9 && (
        <VowelSymbolQ3
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 10 && (
        <VowelSymbolQ4
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 11 && (
        <VowelSymbolQ5
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 12 && (
        <VowelSymbolQ6
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 13 && (
        <VowelSymbolQ7
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 14 && (
        <VowelSymbolQ8
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 15 && (
        <VowelSymbolQ9
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 16 && (
        <VowelSymbolQ10
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 17 && (
        <PunctuationsTestQ1
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 18 && (
        <PunctuationsTestQ2
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 19 && (
        <PunctuationsTestQ3
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 20 && (
        <PunctuationsTestQ4
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 21 && (
        <PunctuationsTestQ5
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 22 && (
        <PunctuationsTestQ6
          onNext={loadNextComponent}
          onBack={loadPreviousComponent}
        />
      )}
    </div>
  );
};

export default WritingTest;
