// source : https://blog.logrocket.com/4-ways-to-render-large-lists-in-react/

import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'

export default function LazyList({ data, loader, onLoadMore, item, onLoadFinish = null, ...rest }) {
  const [hasMore, setHasMore] = useState(true)
  const [currentData, setCurrentData] = useState(data)

  const loadMoreData = () => {
    onLoadMore(setCurrentData, setHasMore)
    if (onLoadFinish) onLoadFinish()
  }

  return (
    <InfiniteScroll
      dataLength={currentData.length}
      next={loadMoreData}
      hasMore={hasMore}
      loader={loader}
    >
      <div {...rest}>{currentData && currentData.map(item)}</div>
    </InfiniteScroll>
  )
}
