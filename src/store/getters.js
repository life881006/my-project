// 暴露给store.js
const getters = {
  visitTags: state => state.visitTagsList.visitedTags,
  pagination: state => state.pagination.paginationList,
  currentPagination: state => state.pagination.currentPagination,
  search: state => state.search.searchList,
  currentSearch: state => state.search.currentSearch,
  textarea: state => state.textarea.contentList
}

export default getters
