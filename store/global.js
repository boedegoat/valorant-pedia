export const globalState = {
  tab: 'lineups',
}

export function globalReducer(globalState, action) {
  switch (action.type) {
    case 'UPDATE_TAB':
      return {
        ...globalState,
        tab: action.tab,
      }
  }
}
