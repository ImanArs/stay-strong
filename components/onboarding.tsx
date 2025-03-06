"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, SkipForward, Dumbbell, Trophy, History, Settings } from "lucide-react"

const onboardingSteps = [
  {
    title: "Challenge Yourself",
    description: "Compete against Jacob in various exercises and track your progress",
    icon: Dumbbell,
  },
  {
    title: "Set Records",
    description: "Create your own personal records and try to beat them",
    icon: Trophy,
  },
  {
    title: "Track History",
    description: "View your history of wins and losses against Jacob",
    icon: History,
  },
  {
    title: "Customize",
    description: "Adjust settings to personalize your experience",
    icon: Settings,
  },
]

interface OnboardingProps {
  onComplete: () => void
  onSkip: () => void
}

export default function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="flex justify-end p-4">
        <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-gray-800" onClick={onSkip}>
          <SkipForward className="mr-2 h-4 w-4" />
          Skip
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-8">
              <motion.div
                className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {React.createElement(onboardingSteps[currentStep].icon, {
                  className: "h-12 w-12 text-green-500",
                })}
              </motion.div>

              {/* Bubble animation */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-green-500/20"
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
                  animate={{
                    x: (i % 2 === 0 ? 1 : -1) * (20 + i * 10),
                    y: -20 - i * 5,
                    scale: 0,
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-2">{onboardingSteps[currentStep].title}</h2>
            <p className="text-gray-400 mb-8">{onboardingSteps[currentStep].description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-xs">
          <Button className="w-full bg-green-700 hover:bg-green-600 text-white" onClick={handleNext}>
            {currentStep < onboardingSteps.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>

        <div className="flex mt-8 space-x-2">
          {onboardingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full ${index === currentStep ? "w-8 bg-green-500" : "w-2 bg-gray-700"}`}
              animate={{
                width: index === currentStep ? 32 : 8,
                backgroundColor: index === currentStep ? "#10b981" : "#374151",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

