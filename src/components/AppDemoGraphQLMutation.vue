<template>
    <div class="row" v-if="graphQLError">
        <div class="col-12">
            <div class="alert alert-danger" role="alert">
                {{ graphQLError }}
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 input-group">
            <input class="form-control form-control-lg" type="text" placeholder="Express yourself..." v-model="tweet"
                aria-label=".form-control-lg example">
            <button class="btn btn-primary fs-5 px-5" type="button" @click="save()">Send <i
                    class="bi bi-send ms-2"></i></button>
        </div>
    </div>
    <div class="row mt-5" v-if="tweetCreated">
        <div class="col-12">
            <h4>Tweet created and returned from Postgres:</h4>
            <code><pre>{{ tweetCreated }}</pre></code>
        </div>
    </div>
</template>


<script>
import gql from 'graphql-tag';

/**
 * GraphQL mutation that calls our Postgres
 * function tweet_add (p_tweet varchar(250))
 * and returns the created tweet.
*/
const mutationTweetAdd = gql`
    mutation tweetAdd($pTweet: String!) {
        tweetAdd(input: {pTweet: $pTweet}) {
            vTweet {
                id
                createdTs
                username
                tweet
            }
        }
    }
`

export default {
    data() {
        return {
            tweet: null,
            tweetCreated: null,
            graphQLError: null,
        };
    },
    methods: {
        save() {
            this.$apollo.mutate({
                mutation: mutationTweetAdd,
                variables: {
                    pTweet: String(this.tweet),
                },
            }).then((data) => {
                this.tweetCreated = data;
                this.tweet = null;
            }).catch((error) => {
                this.graphQLError = error;
            });
        },
    }
};
</script>
