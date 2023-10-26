import { createRouter, createWebHistory } from "vue-router";
import AppLandingPage from "./components/AppLandingPage.vue";
import AppLogin from "./components/AppLogin.vue";
import AppUserProfile from "./components/AppUserProfile.vue";
import AppNotFound from "./components/AppNotFound.vue";

export default function router(session) {

    const routes = [
        {
            path: "/",
            children: [
                {
                    path: "",
                    name: "AppLandingPage",
                    component: AppLandingPage,
                },
                {
                    path: "login",
                    name: "AppLogin",
                    component: AppLogin,
                },
                {
                    path: "profile",
                    name: "AppUserProfile",
                    component: AppUserProfile,
                    requiresAuth: true,
                }
            ]
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

        if ((session.is_authenticated || false) && to.name === 'AppLogin') {
            return { name: 'AppUserProfile' }
        }
        if ((to.requiresAuth || false) && !session.is_authenticated || false) {
            return { name: 'AppLogin' }
        }

    });

    return router;
}