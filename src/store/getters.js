//暴露给store.js
const getters = {
	visitTages : state => state.visitTagsList.visitedTags
}

export default getters