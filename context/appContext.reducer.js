export default function reducer(state, action) {
  switch (action.type) {
    case 'FILTER_LINEUPS': {
      const { type, site, map, search } = action.pay

      const currentFilter = state.lineupsState.filter
      let newFilter = {}
      if (type) {
        newFilter.type = type !== currentFilter.type ? type : ''
      }
      if (site) {
        newFilter.site = site !== currentFilter.site ? site : ''
      }
      if (map) {
        newFilter.map = map !== currentFilter.map ? map : ''
      }
      // if (search) {
      //   newFilter.search = search
      // }

      return {
        ...state,
        lineupsState: {
          ...state.lineupsState,
          filter: {
            ...state.lineupsState.filter,
            ...newFilter,
          },
        },
      }
    }

    case 'UPDATE_FILTER_LINEUPS_QUERY': {
      const { query: initQuery } = action.pay
      const { type, site, map } = state.lineupsState.filter

      let newQuery = initQuery
      if (type) {
        newQuery = newQuery.where('type', '==', type)
      }
      if (site) {
        newQuery = newQuery.where('site', '==', site)
      }
      if (map) {
        newQuery = newQuery.where('map', '==', map)
      }

      return {
        ...state,
        lineupsState: {
          ...state.lineupsState,
          filter: {
            ...state.lineupsState.filter,
            query: newQuery,
          },
        },
      }
    }

    case 'RESET_FILTER_LINEUPS':
      return {
        ...state,
        lineupsState: {
          ...state.lineupsState,
          filter: {
            ...state.lineupsState.filter,
            type: '',
            site: '',
            map: '',
            search: '',
          },
        },
      }
  }
}
