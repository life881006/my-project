//暴露给store.js
const getters = {
	visitTages : state => state.visitTagsList.visitedTags,
	pagination : state => state.pagination.paginationList,
	currentPagination : state => state.pagination.currentPagination,
	search : state => state.search.searchList,
	textarea : state => state.textarea.contentList,
}

export default getters