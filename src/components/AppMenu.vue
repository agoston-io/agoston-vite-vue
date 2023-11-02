<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-white fixed-top bg-white">
            <div class="container">

                <!-- The branding part on the left side of the menu -->
                <router-link class="navbar-brand" :to="{ name: 'AppLandingPage' }">
                    <span>Amazing App</span>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- The menu -->
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'AppUserProfile' }">
                                <span>Profile (Session Data)</span>
                            </router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Backend Data (GraphQL examples)
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <router-link class="nav-link" :to="{ name: 'AppDemoGraphQLQuery' }">
                                        <span>List tweets (GraphQL Query)</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link" :to="{ name: 'AppDemoGraphQLMutation' }">
                                        <span>Add tweets (GraphQL Mutation)</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link" :to="{ name: 'AppDemoGraphQLSubscription' }">
                                        <span>Real time tweets (GraphQL subscription)</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <!-- Authentication part on the right side of the menu -->
                    <div v-if="!$agostonClient.isAuthenticated()">
                        <router-link class="fw-bold nav-item" :to="{ name: 'AppLogin' }">Log in <span
                                aria-hidden="true">&rarr;</span></router-link>
                    </div>
                    <div v-else>
                        <router-link class="fw-bold nav-item fw-bold me-1" :to="{ name: 'AppUserProfile' }">
                            <img v-if="$session.auth_data.picture !== undefined" v-bind:src="$session.auth_data.picture"
                                class="me-2 rounded-circle" style="width: 35px;" />
                            <span v-if="$session.auth_data.email !== undefined">{{ $session.auth_data.email }}</span>
                            <span v-else>{{ $session.auth_subject }}</span>
                        </router-link>
                        | <a class="fw-bold" nav-item href="#"
                            @click="$agostonClient.logout({ options: { redirectLogout: '/' } })">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
