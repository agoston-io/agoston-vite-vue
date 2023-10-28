<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-white fixed-top bg-white">
            <div class="container">
                <router-link class="navbar-brand" :to="{ name: 'AppLandingPage' }">
                    <span>Amazing App</span>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'AppLandingPage' }">
                                <span>Home</span>
                            </router-link>
                        </li>
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
                                <li><a class="dropdown-item" href="#">List/show data (GraphQL Query)</a></li>
                                <li><a class="dropdown-item" href="#">Modify data (GraphQL Mutation)</a></li>
                                <li><a class="dropdown-item" href="#">real time data (GraphQL subscription)</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div v-if="!$agostonClient.isAuthenticated()">
                        <router-link class="fw-bold nav-item" :to="{ name: 'AppLogin' }">Log in <span
                                aria-hidden="true">&rarr;</span></router-link>
                    </div>
                    <div v-else>
                        <router-link class="fw-bold nav-item" :to="{ name: 'AppUserProfile' }"><span class="fw-bold me-1">{{
                            $session.auth_subject
                        }}</span></router-link>
                        | <a class="fw-bold" nav-item href="#"
                            @click="$agostonClient.logout({ options: { redirectLogout: '/' } })">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
