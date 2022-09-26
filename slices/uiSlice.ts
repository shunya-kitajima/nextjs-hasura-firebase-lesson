import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditNews, EditTask } from '../types/types'
import { RootState } from '../app/store'

export interface uiState {
  editedNews: EditNews
  editedTask: EditTask
}

const initialState: uiState = {
  editedNews: {
    id: '',
    content: '',
  },
  editedTask: {
    id: '',
    title: '',
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setEditedNews: (state, action: PayloadAction<EditNews>) => {
      state.editedNews = action.payload
    },
    resetEditedNews: (state) => {
      state.editedNews = initialState.editedNews
    },
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask
    },
  },
})

export const {
  setEditedNews,
  resetEditedNews,
  setEditedTask,
  resetEditedTask,
} = uiSlice.actions

export default uiSlice.reducer
