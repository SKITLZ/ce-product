import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Products from './components/products/Products.vue';
import ProductList from './components/products/ProductList.vue';
import ProductForm from './components/products/ProductForm.vue';

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/products',
                name: 'ProductList',
                component: ProductList
            },
            {
                path: '/products/form',
                name: 'ProductForm',
                component: ProductForm
            },
        ],
    },
]