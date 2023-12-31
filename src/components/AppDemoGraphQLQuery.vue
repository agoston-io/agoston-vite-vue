<template>
    <div class="row" v-if="$apollo.queries.vTweets.loading">
        <div class="col-12">
            Loading tweets...
        </div>
    </div>
    <div class="row" v-else>
        <div class="col-12">
            <ul class="list-group">
                <li class="list-group-item" v-for="item in vTweets.nodes" :key="item.id">
                    <p class="col my-0 text-muted">{{ item.createdTs }} | {{ item.username }}</p>
                    <p class="col my-0 fs-5">{{ item.tweet }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>

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