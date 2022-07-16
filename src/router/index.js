import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Main from '@/components/layouts/Main.vue';
import Dashboard from '../views/Dashboard.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue')
		},
		{
			path: '/main',
			name: 'main',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: Main,
			children: [
				{
					path: 'dashboard',
					name: 'dashboard',
					component: () => import('../views/Dashboard.vue')
				},
				{
					path: 'sales/invoices',
					name: 'sales.invoices',
					component: () => import('../views/Invoices.vue')
				},
				{
					path: 'sales/customers',
					name: 'sales.customers',
					component: () => import('../views/Customers.vue')
				},
				{
					path: 'warehouse/inventory',
					name: 'warehouse.inventory',
					component: () => import('../views/Inventory.vue')
				}
			]
		}
	]
});

export default router;
