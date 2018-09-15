import { createAction } from 'redux-actions'

// EPIC CONTENT
export const setEpicTitle = createAction('SET_EPIC_TITLE')
export const setEpicProblem = createAction('SET_EPIC_PROBLEM')
export const setEpicGoodBetterBest = createAction('SET_EPIC_GBB_CONTENT')

export * from './epics'
export * from './globalUi'
export * from './phases'
export * from './references'
export * from './system'
