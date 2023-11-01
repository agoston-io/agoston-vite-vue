drop function tweet_add;
drop view if exists v_tweets;
drop table if exists tweets;

-- A simple tweet table
create table tweets (
	id serial primary key,
	created_ts timestamp not null default CURRENT_TIMESTAMP,
	user_id int not null default (session()->>'user_id')::int,
	tweet varchar(250) not null,
	constraint fk_01 foreign key (user_id)
        references agoston_public.users (id)
        on delete cascade
);
-- Don't expose the table directly in GraphQL (use the view v_tweets instead).
comment on table tweets IS '@omit';

-- Enable RLS from Postgres to enable permission per row.
alter table tweets enable row level security;

-- Everyone can read tweets
grant select on tweets to anonymous, authenticated;
create policy all_select on tweets
	for select
	to anonymous, authenticated
	using (true);

-- Only authenticated user can add tweets with their own ID.
grant insert on tweets to authenticated;
grant usage, select on tweets_id_seq to authenticated;
create policy all_insert on tweets
	for insert
	to authenticated
	with check (user_id = (session()->>'user_id')::int);

---------------------------------------------------
-- GraphQL exposure for queries
---------------------------------------------------

-- Expose the tweets throught the v_tweets view.
create view v_tweets
with(security_invoker=true) as
select 	t.id,
       	to_char(t.created_ts, 'Day DD Month - HH24:MI:SS') as "created_ts",
	   	u.username,
	   	t.tweet
from	tweets t
join	users u on u.id = t.user_id
order by 1 asc;
grant select on v_tweets to anonymous, authenticated;

---------------------------------------------------
-- GraphQL exposure for mutations
---------------------------------------------------
/**
	Mutations are best handled through functions.
	That allows to addition easily extra logic in the endpoint.
*/

create function tweet_add (p_tweet varchar(250))
returns v_tweets
language plpgsql
as
$$
declare
	d_id int;
	d_v_tweets v_tweets;
begin
	insert into tweets (tweet) values (p_tweet) returning id into d_id;

	select * into d_v_tweets from v_tweets where id = d_id;

	return d_v_tweets;
end;
$$

/**
There function above can then be used as a mutation in the GraphQL endpoint:

	mutation tweetAdd($pTweet: String = "Hi there, that's my first tweet!") {
		tweetAdd(input: {pTweet: $pTweet}) {
			vTweet {
				id
				createdTs
				username
				tweet
			}
		}
	}

Above GraphQL mutation will returns the following JSON:

	{
	"data": {
		"tweetAdd": {
		"vTweet": {
			"id": 1,
			"createdTs": "Wednesday 01 November  - 13:58:54",
			"username": "google-oauth2|110397203064878889081",
			"tweet": "Hi there, that's my first tweet!"
		}
		}
	}
	}

*/

