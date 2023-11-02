<template>
    <div class="row">
        <div class="col-6">
            <AppDemoGraphQLMutation />
        </div>
        <div class="col-6">
            <AppDemoGraphQLQuery />
        </div>
    </div>
</template>

<script>
import AppDemoGraphQLQuery from './AppDemoGraphQLQuery.vue';
import AppDemoGraphQLMutation from './AppDemoGraphQLMutation.vue';

export default {
    name: "App",
    components: {
        AppDemoGraphQLQuery: AppDemoGraphQLQuery,
        AppDemoGraphQLMutation: AppDemoGraphQLMutation
    },
};
</script>