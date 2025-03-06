"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import type { Exercise, HistoryItem } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import CircularProgress from "@/components/circular-progress";

interface HomeScreenProps {
  history: HistoryItem[];
  currentChallenge: Exercise;
  onAcceptChallenge: () => void;
}

export default function HomeScreen({
  history,
  currentChallenge,
  onAcceptChallenge,
}: HomeScreenProps) {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    // Calculate wins and losses
    const winCount = history.filter((item) => item.won).length;
    const lossCount = history.filter((item) => !item.won).length;

    setWins(winCount);
    setLosses(lossCount);
  }, [history]);

  return (
    <div className="flex flex-col p-4 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stay Strong</h1>
          <p className="text-gray-400">Welcome back, Challenger!</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center">
          <span className="text-xl font-bold">SS</span>
        </div>
      </header>

      <div className="flex justify-center py-4">
        <CircularProgress wins={wins} losses={losses} />
      </div>

      <motion.div
        className="bg-gray-800 rounded-xl p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            <User className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-medium">Jacob challenges you!</h3>
            <p className="text-xs text-gray-400">Can you beat his time?</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="h-24 bg-gray-700 rounded-lg flex items-center justify-center">
            <img
              src={
                currentChallenge?.imageUrl ||
                "/placeholder.svg?height=64&width=64"
              }
              alt={currentChallenge?.name}
              className="w-full h-full object-cover rounded-[12px]"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{currentChallenge?.name}</h3>
            <div className="flex space-x-4 text-sm text-gray-400">
              <span>{currentChallenge?.jacobReps} reps</span>
              <span>{formatTime(currentChallenge?.jacobTime || 0)}</span>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-green-700 hover:bg-green-600"
          onClick={onAcceptChallenge}
        >
          Accept Challenge
        </Button>
      </motion.div>

      <motion.div
        className="bg-gray-800 rounded-xl p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-medium mb-2">Create Your Record</h3>
        <p className="text-sm text-gray-400 mb-3">
          Set your own personal records and track your progress
        </p>
        <Button
          variant="outline"
          className="w-full border-green-700 text-green-500 hover:bg-green-900/20"
          onClick={() => {}}
        >
          Go to Records
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
