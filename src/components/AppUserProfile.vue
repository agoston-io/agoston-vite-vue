<template>
    <div class="container mt-5 py-5">
        <div class="row justify-content-center mt-5">
            <div class="col-5">
                <h2 class="mt-5 mb-5">User profile</h2>

                <div class="row">
                    <div class="col-6 fw-bold">
                        User id
                    </div>
                    <div class="col-6">
                        {{ $session.user_id }}
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 fw-bold">
                        Username
                    </div>
                    <div class="col-6">
                        {{ $session.auth_subject }}
                    </div>
                </div>


                <div class="row">
                    <div class="col-6 fw-bold">
                        Is authenticated
                    </div>
                    <div class="col-6">
                        {{ $session.is_authenticated }}
                    </div>
                </div>


                <div class="row">
                    <div class="col-6 fw-bold">
                        Session data
                    </div>
                    <div class="col-6">
                        {{ $session }}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

