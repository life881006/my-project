//暴露给store.js
const getters = {
	visitTages : state => state.visitTagsList.visitedTags,
	pagination : state => state.pagination.paginationList 
}

export default getters