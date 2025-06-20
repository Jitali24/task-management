export interface ITask {
  id: string // auto-generated or set from Firestore
  title: string
  description: string
  createdAt: Date
  completed: boolean // ✅ optional bonus
  userId: string // user.uid
}
