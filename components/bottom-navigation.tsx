"use client";

import { motion } from "framer-motion";
import { Home, Trophy, History, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function BottomNavigation({
  activeTab,
  onChange,
}: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "record", icon: Trophy, label: "Records" },
    { id: "history", icon: History, label: "History" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-around px-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            className="relative flex flex-col items-center justify-center w-full h-full"
            onClick={() => onChange(tab.id)}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 w-12 h-12 mx-auto rounded-full bg-green-900/30"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            <tab.icon
              className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`}
            />
            <span className={`text-[#0000] text-xs mt-1`}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
