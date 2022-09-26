export interface News {
  id: string
  content: string
  created_at: string
}

export interface EditedNews {
  id: string
  content: string
}

export interface Task {
  id: string
  title: string
  created_at: string
  user_id: string
}

export interface EditedTask {
  id: string
  title: string
}
