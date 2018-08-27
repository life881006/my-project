//暴露给store.js
const getters = {
	visitTages : state => state.visitTagsList.visitedTags,
	pagination : state => state.pagination.paginationList,
	search : state => state.search.searchList,
	textarea : state => state.textareaHtml.contentList,
}

export default getters