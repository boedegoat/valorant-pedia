export const globalState = {
  section: 'lineups',
}

export function globalReducer(globalState, action) {
  switch (action.type) {
    case 'UPDATE_SECTION':
      return {
        ...globalState,
        section: action.section,
      }
  }
}
