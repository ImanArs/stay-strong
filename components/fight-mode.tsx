"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import type { Exercise } from "@/lib/types";
import { formatTime } from "@/lib/utils";

interface FightModeProps {
  exercise: Exercise;
  onComplete: (won: boolean) => void;
  onCancel: () => void;
}

export default function FightMode({
  exercise,
  onComplete,
  onCancel,
}: FightModeProps) {
  const [timeLeft, setTimeLeft] = useState(exercise.jacobTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  return (
    <motion.div
      className="flex flex-col h-full p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2" onClick={onCancel}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Challenge</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="h-32 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
          <img
            src={exercise.imageUrl || "/placeholder.svg?height=128&width=128"}
            alt={exercise.name}
            className="w-full h-full object-cover rounded-[12px]"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">{exercise.name}</h2>
        <p className="text-gray-400 text-center mb-6">{exercise.description}</p>

        <div className="bg-gray-800 rounded-xl p-4 w-full max-w-xs mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Goal:</span>
            <span>{exercise.jacobReps} reps</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Jacob's time:</span>
            <span>{formatTime(exercise.jacobTime)}</span>
          </div>
        </div>

        <div className="text-5xl font-bold mb-8">{formatTime(timeLeft)}</div>

        {!isRunning ? (
          <Button
            className="w-full max-w-xs bg-green-700 hover:bg-green-600 mb-4"
            onClick={startTimer}
          >
            Start Challenge
          </Button>
        ) : (
          <div className="flex space-x-4 w-full max-w-xs">
            <Button
              className="flex-1 bg-green-700 hover:bg-green-600"
              onClick={() => onComplete(true)}
            >
              <CheckCircle className="mr-2 h-5 w-5" />I Won
            </Button>
            <Button
              className="flex-1 bg-red-700 hover:bg-red-600"
              onClick={() => onComplete(false)}
            >
              <XCircle className="mr-2 h-5 w-5" />I Lost
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
