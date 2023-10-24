import { createRouter, createWebHistory } from "vue-router";
import AppLandingPage from "./components/AppLandingPage.vue";
import AppLogin from "./components/AppLogin.vue";
import AppUserProfile from "./components/AppUserProfile.vue";
import AppNotFound from "./components/AppNotFound.vue";

export default function getRouter(routingState) {

    const routes = [
        {
            path: "/",
            name: "AppLandingPage",
            component: AppLandingPage,
        },
        {
            path: "/login",
            name: "AppLogin",
            component: AppLogin,
        },
        {
            path: "/profile",
            name: "AppUserProfile",
            component: AppUserProfile,
            requiresAuth: true,
        },
        {
            path: "/:catchAll(.*)",
            name: 'AppNotFound',
            component: AppNotFound,
        },
    ];

    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    router.beforeEach(async (to) => {

        if (routingState.isSessionAuthenticated && to.name === 'AppLogin') {
            return { name: 'profile' }
        }
        if (to.requiresAuth || false && !routingState.isSessionAuthenticated) {
            return { name: 'AppUserProfile' }
        }

    });

    return router;
}