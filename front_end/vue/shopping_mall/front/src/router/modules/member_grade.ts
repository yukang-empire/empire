
const member_grade = {
	path: '/member_grade',
	name: '会员等级',
	component: () => import('../../views/my/member_grade.vue'),
	meta: {
		title: '会员等级',
		grade: 3
	}
};

export default member_grade;