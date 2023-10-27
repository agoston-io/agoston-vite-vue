<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-white fixed-top bg-white">
            <div class="container">
                <a class="navbar-brand" href="#">AmazingApp</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-disabled="true">Profile (Session Data)</a>
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
                        <router-link class="fw-bold" :to="{ name: 'AppLogin' }">Log in <span
                                aria-hidden="true">&rarr;</span></router-link>
                    </div>
                    <div v-else>
                        <router-link class="fw-bold" :to="{ name: 'AppLogin' }"><span class="fw-bold me-1">{{
                            $session.auth_subject
                        }}</span></router-link>
                        | <a class="fw-bold" href="#"
                            @click="$agostonClient.logout({ options: { redirectLogout: '/' } })">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
