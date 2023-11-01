drop view if exists v_tweets;
drop table if exists tweets;

-- A simple tweet table
create table tweets (
	id serial primary key,
	created_ts timestamp not null default CURRENT_TIMESTAMP,
	user_id int not null,
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
create policy all_insert on tweets
	for insert
	to authenticated
	with check (user_id = (session()->>'user_id')::int);

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


