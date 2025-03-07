"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Onboarding from "@/components/onboarding";
import BottomNavigation from "@/components/bottom-navigation";
import HomeScreen from "@/components/home-screen";
import CreateRecord from "@/components/create-record";
import History from "@/components/history";
import Settings from "@/components/settings";
import FightMode from "@/components/fight-mode";
import type { Exercise, UserRecord, HistoryItem } from "@/lib/types";
import { initialExercises, jacobChallenges } from "@/lib/data";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [userRecords, setUserRecords] = useState<UserRecord[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Exercise | null>(
    null
  );
  const [showFightMode, setShowFightMode] = useState(false);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (onboardingCompleted === "true") {
      setShowOnboarding(false);
    }

    // Load user records from localStorage
    const savedRecords = localStorage.getItem("userRecords");
    if (savedRecords) {
      setUserRecords(JSON.parse(savedRecords));
    }

    // Load history from localStorage
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Set random challenge
    setCurrentChallenge(
      jacobChallenges[Math.floor(Math.random() * jacobChallenges.length)]
    );
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  const saveUserRecord = (record: UserRecord) => {
    const updatedRecords = [...userRecords];
    const existingIndex = updatedRecords.findIndex(
      (r) => r.exerciseId === record.exerciseId
    );

    if (existingIndex >= 0) {
      updatedRecords[existingIndex] = record;
    } else {
      updatedRecords.push(record);
    }

    setUserRecords(updatedRecords);
    localStorage.setItem("userRecords", JSON.stringify(updatedRecords));
  };

  const addHistoryItem = (item: HistoryItem) => {
    const updatedHistory = [item, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const acceptChallenge = () => {
    setShowFightMode(true);
  };

  const completeFight = (won: boolean) => {
    if (currentChallenge) {
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        exerciseId: currentChallenge.id,
        exerciseName: currentChallenge.name,
        jacobTime: currentChallenge.jacobTime,
        jacobReps: currentChallenge.jacobReps,
        userTime: won
          ? currentChallenge.jacobTime - 5
          : currentChallenge.jacobTime + 10,
        userReps: currentChallenge.jacobReps,
        date: new Date().toISOString(),
        won,
      };

      addHistoryItem(historyItem);
      setShowFightMode(false);

      // Set new random challenge
      setCurrentChallenge(
        jacobChallenges[Math.floor(Math.random() * jacobChallenges.length)]
      );
    }
  };

  const handleChange = (tab: string) => {
    setActiveTab(tab);
    setShowFightMode(false);
    window?.scrollTo(0, 0);
  };

  if (showOnboarding) {
    return (
      <Onboarding onComplete={completeOnboarding} onSkip={completeOnboarding} />
    );
  }

  return (
    <div className="flex flex-col h-screen pb-[15vh] bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <AnimatePresence mode="wait">
        {showFightMode ? (
          <FightMode
            exercise={currentChallenge!}
            onComplete={completeFight}
            onCancel={() => setShowFightMode(false)}
          />
        ) : (
          <main className="flex-1 overflow-y-auto pb-16">
            {activeTab === "home" && (
              <HomeScreen
                history={history}
                currentChallenge={currentChallenge!}
                onAcceptChallenge={acceptChallenge}
              />
            )}
            {activeTab === "record" && (
              <CreateRecord
                exercises={exercises}
                userRecords={userRecords}
                onSaveRecord={saveUserRecord}
              />
            )}
            {activeTab === "history" && <History history={history} />}
            {activeTab === "settings" && <Settings />}
          </main>
        )}
      </AnimatePresence>

      <BottomNavigation activeTab={activeTab} onChange={handleChange} />
    </div>
  );
}
