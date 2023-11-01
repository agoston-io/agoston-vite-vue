<template>
    <div class="container mt-5 py-5">
        <div class="row justify-content-center mt-5">
            <div class="col-12">
                <h2>List tweets</h2>
            </div>
        </div>
    </div>
    <div class="container" v-if="$apollo.queries.vTweets.loading">
        Loading tweets...
    </div>
    <div class="container" v-else>
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12 mb-2" v-for="item in vTweets.nodes" :key="item.id">
                        <div class="row">
                            <div class="col text-muted">{{ item.createdTs }} | {{ item.username }}</div>
                        </div>
                        <div class="row">
                            <div class="col fs-5">{{ item.tweet }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import { getOperationName } from "@apollo/client/utilities";
import gql from 'graphql-tag';

// GraphQL Fragment to avoid repeating the query attributes
const tweetFragment = gql`
    fragment tweetFragment on VTweet {
        id
        createdTs
        username
        tweet
    }
  `

// GraphQL Query
const queryVTweets = gql`
    query vTweets {
        vTweets {
            nodes {
                ...tweetFragment
            }
        }
    }
    ${tweetFragment}
`

/**
 * GraphQL Subscription to listen to the database changes
 * and update the frontend cache with new tweets.
*/
const subscriptionVTweets = gql`
    subscription vTweets {
        listen(topic: "tweets") {
            query {
                vTweets {
                    nodes {
                        ...tweetFragment
                    }
                }
            }
        }
    }
    ${tweetFragment}
    `

export default {
    data: {
        queryVTweets: queryVTweets,
    },
    apollo: {
        vTweets: {
            query: queryVTweets,
            // More on cache policy here: https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
            fetchPolicy: 'cache-and-network',
            subscribeToMore: {
                document: subscriptionVTweets,
                updateQuery: (previousResult, { subscriptionData }) => {
                    return subscriptionData.data.listen.query;
                },
            },
        },
    },
};
</script>