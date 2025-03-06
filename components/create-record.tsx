"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Timer } from "lucide-react";
import type { Exercise, UserRecord } from "@/lib/types";
import { formatTime } from "@/lib/utils";

interface CreateRecordProps {
  exercises: Exercise[];
  userRecords: UserRecord[];
  onSaveRecord: (record: UserRecord) => void;
}

export default function CreateRecord({
  exercises,
  userRecords,
  onSaveRecord,
}: CreateRecordProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [reps, setReps] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setTimeLeft(120);
    setIsRunning(false);
    setReps("");
    setShowResults(false);
  };

  const handleStartTimer = () => {
    setIsRunning(true);

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const handleFinish = () => {
    setIsRunning(false);
  };

  const handleSaveRecord = () => {
    if (selectedExercise && reps) {
      const existingRecord = userRecords.find(
        (r) => r.exerciseId === selectedExercise.id
      );

      const newRecord: UserRecord = {
        exerciseId: selectedExercise.id,
        reps: Number.parseInt(reps),
        time: 120 - timeLeft, // Time spent
        date: new Date().toISOString(),
      };

      onSaveRecord(newRecord);
      setSelectedExercise(null);
      setReps("");
      setTimeLeft(120);
      location.reload();
    }
  };

  const handleCompareResults = () => {
    setShowResults(true);
  };

  const existingRecord = selectedExercise
    ? userRecords.find((r) => r.exerciseId === selectedExercise.id)
    : null;

  const records = JSON.parse(localStorage.getItem("userRecords") || "") ?? [];
  const filteredRecords = records.filter(
    (record: UserRecord) => record.exerciseId === selectedExercise?.id
  );
  return (
    <div className="flex flex-col p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Create Your Record</h1>
        <p className="text-gray-400">
          Set your personal best in these exercises
        </p>
      </header>

      <AnimatePresence mode="wait">
        {!selectedExercise ? (
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                className="bg-gray-800 rounded-xl p-3 flex flex-col items-center"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectExercise(exercise)}
              >
                <div className="h-[120px] bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                  <img
                    src={
                      exercise.imageUrl || "/placeholder.svg?height=64&width=64"
                    }
                    alt={exercise.name}
                    className="w-full h-full object-cover rounded-[12px]"
                  />
                </div>
                <h3 className="text-sm font-medium text-center">
                  {exercise.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        ) : showResults ? (
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setShowResults(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold">Compare Results</h2>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <h3 className="font-medium mb-3">{selectedExercise.name}</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-sm text-gray-400 mb-1">
                    Previous Record
                  </h4>
                  {existingRecord ? (
                    <>
                      <div className="text-xl font-bold">
                        {existingRecord.reps} reps
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatTime(existingRecord.time)}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm">No previous record</div>
                  )}
                </div>

                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-sm text-gray-400 mb-1">New Record</h4>
                  <div className="text-xl font-bold">{reps} reps</div>
                  <div className="text-sm text-gray-400">
                    {formatTime(120 - timeLeft)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                className="flex-1 bg-gray-700 hover:bg-gray-600"
                onClick={() => setSelectedExercise(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-700 hover:bg-green-600"
                onClick={handleSaveRecord}
              >
                Save New Record
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setSelectedExercise(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold">{selectedExercise.name}</h2>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <div className="w-full h-40 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <img
                  src={
                    selectedExercise.imageUrl ||
                    "/placeholder.svg?height=160&width=160"
                  }
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover rounded-[12px]"
                />
              </div>
              <p className="text-gray-400">{selectedExercise.description}</p>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="text-4xl font-bold mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-400 flex items-center">
                <Timer className="h-4 w-4 mr-1" />2 minute challenge
              </div>
            </div>

            {!isRunning && timeLeft === 120 ? (
              <Button
                className="w-full bg-green-700 hover:bg-green-600 mb-4"
                onClick={handleStartTimer}
              >
                Start Timer
              </Button>
            ) : isRunning ? (
              <Button
                className="w-full bg-red-700 hover:bg-red-600 mb-4"
                onClick={handleFinish}
              >
                Finish
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    How many reps did you complete?
                  </label>
                  <Input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter number of reps"
                  />
                </div>

                <Button
                  className="w-full bg-green-700 hover:bg-green-600"
                  onClick={handleCompareResults}
                  disabled={!reps}
                >
                  Continue
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {filteredRecords.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-gray-800 rounded-lg mb-2"
          >
            <p>{item.exerciseId}</p>
            <p>reps {item.reps}</p>
            <p>{item.time} sec</p>
            <p>{new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
