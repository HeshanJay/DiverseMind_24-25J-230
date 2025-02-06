// import React, { useState, useEffect } from "react";
// import { useScores } from "../../context/Score_context";
// import Memory_Test from "../../Components/MemoryComponents/Memory_Test";
// import VisualTest from "../../Components/MemoryComponents/visual_test"; 
// import VisualTestActivity from "../../Components/MemoryComponents/visual_test_activity"; 
// import MemoryMeasurementTest from "../../Components/MemoryComponents/memory_measurement_test"; 
// import MemoryTestActivity from "../../Components/MemoryComponents/memory_test_activity"; 
// import SpeedMeasurementTest from "../../Components/MemoryComponents/Speed_Measurement_Test"; 
// import SpeedMeasurementActivity from "../../Components/MemoryComponents/Speed_Measurement_Activity"; 
// import AudioTest from "../../Components/MemoryComponents/Audio_test"; 
// import AudioMeasurementActivity from "../../Components/MemoryComponents/Audio_measurement_activity"; 
// import LanguageVocabTest from "../../Components/MemoryComponents/Language_vocab_test"; 
// import LanguageVocabActivity from "../../Components/MemoryComponents/Language_vocab_activity"; 
// import MemoryFinal_Feedback from "../../Components/MemoryComponents/MemoryFinal_Feedback";       

// // The parent that manages the entire flow
// const WorkingMemory = () => {
//   const [currentStep, setCurrentStep] = useState(1);

//   // We'll store the backend's prediction result ("Normal", "Medium", or "Low") here
//   const [predictionResult, setPredictionResult] = useState(null);

//   // Pull final scores from your context, e.g.:
//   const {
//     visualDiscriminationScore,
//     memoryScore,
//     languageVocabScore,
//     audioDiscriminationScore,
//     speedScore,
//   } = useScores();

//   // Move forward/back among steps
//   const onNext = () => setCurrentStep((prev) => prev + 1);
//   const onBack = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));

//   /**
//    * This function calls the backend with the final scores.
//    * We'll call this from "handleAllFinished" after the last test.
//    */
//   const sendDataToBackend = async (data) => {
//     console.log("Sending data to backend:", data);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/working_memory_prediction/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error(`Server Error: ${response.status}`);
//       }
//       const result = await response.json();
//       console.log("Backend Prediction: ", result.prediction);

//       // Save the prediction ("Normal", "Medium", or "Low") in local state
//       setPredictionResult(result.prediction);

//       // Move to the final feedback screen (step 12)
//       setCurrentStep(12);

//     } catch (error) {
//       console.error("Error sending data to backend:", error);
//       alert(`Error sending data to backend: ${error.message}`);
//     }
//   };

//   /**
//    * Called by the final test component (LanguageVocabActivity) once it finishes.
//    * This gathers up the final scores and sends them to the backend.
//    */
//   const handleAllFinished = () => {
//     // Gather scores from context
//     const data = {
//       Language_vocab: languageVocabScore,
//       Memory: memoryScore,
//       Speed: speedScore,
//       Visual_discrimination: visualDiscriminationScore,
//       Audio_Discrimination: audioDiscriminationScore,
//     };

//     // Now do the POST request
//     sendDataToBackend(data);
//   };

//   // Decide which component to show, based on currentStep
//   return (
//     <>
//       {/* Step 1: Memory Test Intro */}
//       {currentStep === 1 && <Memory_Test onNext={onNext} />}

//       {/* Step 2: Visual Test Intro */}
//       {currentStep === 2 && <VisualTest onNext={onNext} onBack={onBack} />}

//       {/* Step 3: Visual Test Activity */}
//       {currentStep === 3 && <VisualTestActivity onNext={onNext} onBack={onBack} />}

//       {/* Step 4: Memory Measurement Intro */}
//       {currentStep === 4 && <MemoryMeasurementTest onNext={onNext} onBack={onBack} />}

//       {/* Step 5: Memory Measurement Activity */}
//       {currentStep === 5 && <MemoryTestActivity onNext={onNext} onBack={onBack} />}

//       {/* Step 6: Speed Measurement Intro */}
//       {currentStep === 6 && <SpeedMeasurementTest onNext={onNext} onBack={onBack} />}

//       {/* Step 7: Speed Measurement Activity */}
//       {currentStep === 7 && <SpeedMeasurementActivity onNext={onNext} onBack={onBack} />}

//       {/* Step 8: Audio Test Intro */}
//       {currentStep === 8 && <AudioTest onNext={onNext} onBack={onBack} />}

//       {/* Step 9: Audio Measurement Activity */}
//       {currentStep === 9 && <AudioMeasurementActivity onNext={onNext} onBack={onBack} />}

//       {/* Step 10: Language Vocab Intro */}
//       {currentStep === 10 && <LanguageVocabTest onNext={onNext} onBack={onBack} />}

//       {/* Step 11: The final test (Language Vocab Activity).
//           We pass onFinishAll so it knows to call the parent afterward. */}
//       {currentStep === 11 && (
//         <LanguageVocabActivity
//           onNext={onNext}
//           onBack={onBack}
//           onFinishAll={handleAllFinished}
//         />
//       )}

//       {/* Step 12: The final feedback screen */}
//       {currentStep === 12 && (
//         <MemoryFinal_Feedback predictionResult={predictionResult} />
//       )}
//     </>
//   );
// };

// export default WorkingMemory;


import React, { useState, useEffect } from "react";
import { useScores } from "../../context/Score_context";

// Import child components (steps 1–11)
import Memory_Test from "../../Components/MemoryComponents/Memory_Test";
import VisualTest from "../../Components/MemoryComponents/visual_test"; 
import VisualTestActivity from "../../Components/MemoryComponents/visual_test_activity"; 
import MemoryMeasurementTest from "../../Components/MemoryComponents/memory_measurement_test"; 
import MemoryTestActivity from "../../Components/MemoryComponents/memory_test_activity"; 
import SpeedMeasurementTest from "../../Components/MemoryComponents/Speed_Measurement_Test"; 
import SpeedMeasurementActivity from "../../Components/MemoryComponents/Speed_Measurement_Activity"; 
import AudioTest from "../../Components/MemoryComponents/Audio_test"; 
import AudioMeasurementActivity from "../../Components/MemoryComponents/Audio_measurement_activity"; 
import LanguageVocabTest from "../../Components/MemoryComponents/Language_vocab_test"; 
import LanguageVocabActivity from "../../Components/MemoryComponents/Language_vocab_activity"; 

// Import the final feedback component (step 12)
import MemoryFinal_Feedback from "../../Components/MemoryComponents/MemoryFinal_Feedback";

const WorkingMemory = () => {
  // currentStep 1–11 represent test screens; 12 is the final feedback page.
  const [currentStep, setCurrentStep] = useState(1);
  // Stores the backend's prediction result ("Normal", "Medium", "Low")
  const [predictionResult, setPredictionResult] = useState(null);

  // Get final scores from your context
  const {
    visualDiscriminationScore,
    memoryScore,
    languageVocabScore,
    audioDiscriminationScore,
    speedScore,
  } = useScores();

  // Debug log to see the current step change
  useEffect(() => {
    console.log("Current step:", currentStep);
  }, [currentStep]);

  // Navigation functions
  const onNext = () => setCurrentStep((prev) => prev + 1);
  const onBack = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));

  // This function sends the final scores to the backend.
  const sendDataToBackend = async (data) => {
    console.log("Sending data to backend:", data);
    try {
      const response = await fetch("http://127.0.0.1:8000/working_memory_prediction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      const result = await response.json();
      console.log("Backend Prediction received:", result.prediction);

      // Save the prediction and then move to the final feedback page (step 12)
      setPredictionResult(result.prediction);
      console.log("Setting currentStep to 12 (final feedback).");
      setCurrentStep(12);
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert(`Error sending data to backend: ${error.message}`);
    }
  };

  // Called by the final test component when it finishes its questions.
  const handleAllFinished = () => {
    console.log("handleAllFinished called from final test component");
    const data = {
      Language_vocab: languageVocabScore,
      Memory: memoryScore,
      Speed: speedScore,
      Visual_discrimination: visualDiscriminationScore,
      Audio_Discrimination: audioDiscriminationScore,
    };
    sendDataToBackend(data);
  };

  return (
    <>
      {currentStep === 1 && <Memory_Test onNext={onNext} />}
      {currentStep === 2 && <VisualTest onNext={onNext} onBack={onBack} />}
      {currentStep === 3 && <VisualTestActivity onNext={onNext} onBack={onBack} />}
      {currentStep === 4 && <MemoryMeasurementTest onNext={onNext} onBack={onBack} />}
      {currentStep === 5 && <MemoryTestActivity onNext={onNext} onBack={onBack} />}
      {currentStep === 6 && <SpeedMeasurementTest onNext={onNext} onBack={onBack} />}
      {currentStep === 7 && <SpeedMeasurementActivity onNext={onNext} onBack={onBack} />}
      {currentStep === 8 && <AudioTest onNext={onNext} onBack={onBack} />}
      {currentStep === 9 && <AudioMeasurementActivity onNext={onNext} onBack={onBack} />}
      {currentStep === 10 && <LanguageVocabTest onNext={onNext} onBack={onBack} />}
      
      {/* Step 11: Final test */}
      {currentStep === 11 && (
        <LanguageVocabActivity
          onNext={onNext}
          onBack={onBack}
          onFinishAll={handleAllFinished}
        />
      )}

      {/* Step 12: Final feedback */}
      {currentStep === 12 && <MemoryFinal_Feedback predictionResult={predictionResult} />}
    </>
  );
};

export default WorkingMemory;