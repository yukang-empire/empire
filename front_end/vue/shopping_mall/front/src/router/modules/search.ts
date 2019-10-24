
const search = {
	path: '/search',
	name: '搜索商品',
	component: () => import('../../views/search/search.vue'),
	meta: {
		title: '搜索商品',
		grade: 1
	}
};

export default search;