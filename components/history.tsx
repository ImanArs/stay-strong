"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import type { HistoryItem } from "@/lib/types"
import { formatTime, formatDate } from "@/lib/utils"

interface HistoryProps {
  history: HistoryItem[]
}

export default function History({ history }: HistoryProps) {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)

  return (
    <div className="flex flex-col p-4">
      <AnimatePresence mode="wait">
        {selectedItem ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSelectedItem(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold">Challenge Details</h2>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <h3 className="font-medium mb-3">{selectedItem.exerciseName}</h3>
              <div className="text-sm text-gray-400 mb-4">{formatDate(selectedItem.date)}</div>

              <div className="flex items-center justify-center mb-6">
                {selectedItem.won ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    <span className="text-lg font-medium">Victory</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <XCircle className="h-6 w-6 mr-2" />
                    <span className="text-lg font-medium">Defeat</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-sm text-gray-400 mb-1">Jacob</h4>
                  <div className="text-xl font-bold">{selectedItem.jacobReps} reps</div>
                  <div className="text-sm text-gray-400">{formatTime(selectedItem.jacobTime)}</div>
                </div>

                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-sm text-gray-400 mb-1">You</h4>
                  <div className="text-xl font-bold">{selectedItem.userReps} reps</div>
                  <div className="text-sm text-gray-400">{formatTime(selectedItem.userTime)}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header className="mb-6">
              <h1 className="text-2xl font-bold">History</h1>
              <p className="text-gray-400">Your challenges against Jacob</p>
            </header>

            {history.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <p className="text-gray-400">No challenges completed yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-gray-800 rounded-xl p-4 flex items-center"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className={`w-2 h-12 rounded-full ${item.won ? "bg-green-500" : "bg-red-500"} mr-3`} />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.exerciseName}</h3>
                      <div className="flex space-x-4 text-sm text-gray-400">
                        <span>{item.userReps} reps</span>
                        <span>{formatTime(item.userTime)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{formatDate(item.date)}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

