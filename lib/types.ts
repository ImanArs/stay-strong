export interface Exercise {
  id: string
  name: string
  description: string
  imageUrl?: string
  jacobTime?: number
  jacobReps?: number
}

export interface UserRecord {
  exerciseId: string
  reps: number
  time: number
  date: string
}

export interface HistoryItem {
  id: string
  exerciseId: string
  exerciseName: string
  jacobTime: number
  jacobReps: number
  userTime: number
  userReps: number
  date: string
  won: boolean
}

