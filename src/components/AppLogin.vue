<template>
    <div class="container mt-5 py-5">
        <div class="row d-flex align-items-center justify-content-center mt-5">
            <div class="col-md-8 col-lg-7 col-xl-6 mb-5 mb-md-0">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    class="img-fluid" alt="Phone image">
            </div>

            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">

                <!-- Error message -->
                <div class="alert alert-danger text-center" role="alert" v-if="loginErrorMessage">
                    {{ loginErrorMessage }}
                </div>

                <!-- Login with external auth -->
                <div class="d-grid">
                    <a class="btn btn-primary btn-lg" href="#"
                        @click="$agostonClient.loginOrSignUpFromProvider({ strategyName: 'default-auth0-oidc', options: { redirectSuccess: '/profile', redirectError: '/login' } })">
                        <i class="bi bi-google me-2"></i>
                        Sign Up with Google
                    </a>
                </div>

                <div class="divider d-flex align-items-center my-4">
                    <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" id="form1Example13" class="form-control form-control-lg" v-on:keyup.enter="login()"
                        v-model="username" />
                    <label class="form-label" for="form1Example13">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" id="form1Example23" class="form-control form-control-lg"
                        v-on:keyup.enter="login()" v-model="password" />
                    <label class="form-label" for="form1Example23">Password</label>
                </div>

                <div class="d-flex justify-content-around align-items-center mb-4">
                    <!-- Checkbox -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                        <label class="form-check-label" for="form1Example3"> Remember me </label>
                    </div>
                    <a href="#!">Forgot password?</a>
                </div>

                <!-- Submit button -->
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg" @click="login()">Sign in</button>
                </div>


                <!-- Legal stuff -->
                <p class="mt-3 text-muted text-center">
                    I agree to abide by Amazing App's
                    <a href="#" class="text-muted">
                        Terms of Service
                    </a>
                    and its
                    <a href="#" class="text-muted">
                        Privacy Policy
                    </a>
                </p>

            </div>
        </div>
    </div>
</template>

<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}
</style>

<script>

export default {
    data() {
        return {
            username: null,
            password: null,
            loginErrorMessage: this.$route.query.message || null,
        };
    },
    methods: {
        async login() {
            this.loginErrorMessage = null;
            var err = await this.$agostonClient.loginOrSignUpWithUserPassword({
                username: this.username,
                password: this.password,
            });
            if (err) {
                this.loginErrorMessage = err;
            } else {
                window.location.href = '/profile';
            }
        }
    }
};
</script>


