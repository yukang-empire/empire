

const add_address = {
	path: '/add_address',
	name: '新增地址',
	component: () => import('../../views/address/add_address.vue'),
	meta: {
		title: '新增地址',
		grade: 5
	}
};

export default add_address;