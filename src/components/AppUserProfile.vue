<template>
    <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-4 place-content-center h-80">
            <div class="font-bold">User id</div>
            <div>{{ $session.user_id }}</div>
            <div class="font-bold">Username</div>
            <div>{{ $session.auth_subject }}</div>
            <div class="font-bold">Is authenticated</div>
            <div>{{ $session.is_authenticated }}</div>
        </div>
    </div>
</template>

