import { createRouter, createWebHistory } from "vue-router";
import AppLandingPage from "./components/AppLandingPage.vue";
import AppLogin from "./components/AppLogin.vue";
import AppUserProfile from "./components/AppUserProfile.vue";
import AppNotFound from "./components/AppNotFound.vue";
// GraphQL demo components
import AppDemoGraphQLQuery from "./components/AppDemoGraphQLQuery.vue";
import AppDemoGraphQLMutation from "./components/AppDemoGraphQLMutation.vue";
import AppDemoGraphQLSubscription from "./components/AppDemoGraphQLSubscription.vue";

export default function router(session) {

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
            meta: { requiresAuth: true },
        },
        {
            path: "/graphql-demo",
            children: [
                {
                    path: "query",
                    name: "AppDemoGraphQLQuery",
                    component: AppDemoGraphQLQuery,
                },
                {
                    path: "mutation",
                    name: "AppDemoGraphQLMutation",
                    component: AppDemoGraphQLMutation,
                },
                {
                    path: "subscription",
                    name: "AppDemoGraphQLSubscription",
                    component: AppDemoGraphQLSubscription,
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
        if ((to.meta.requiresAuth || false) && (!session.is_authenticated || false)) {
            return { name: 'AppLogin' }
        }

    });

    return router;
}