<template>
    <div class="row">
        <div class="col-4 fw-bold">
            User id
        </div>
        <div class="col-8">
            {{ $session.user_id }}
        </div>
    </div>

    <div class="row">
        <div class="col-4 fw-bold">
            Username
        </div>
        <div class="col-8">
            {{ $session.auth_subject }}
        </div>
    </div>


    <div class="row">
        <div class="col-4 fw-bold">
            Is authenticated
        </div>
        <div class="col-8">
            {{ $session.is_authenticated }}
        </div>
    </div>


    <div class="row">
        <div class="col-4">
            <span class="fw-bold">Session data</span>
            <span> - coming from the authentication provider and usable in your frontend</span>
        </div>
        <div class="col-8">
            <code><pre id="json">{{ $session }}</pre></code>
        </div>
    </div>
</template>

