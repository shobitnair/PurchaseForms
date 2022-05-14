create table activity
(
    email         varchar
        constraint activity_users_email_fk
            references users,
    message       varchar,
    activity_time timestamp,
    type          varchar,
    heading       varchar
);

alter table activity
    owner to postgres;

INSERT INTO public.activity (email, message, activity_time, type, heading) VALUES ('shobitnair10@gmail.com', 'SPS-101 with purchase ID 33 was submitted on', '2021-08-14 22:46:19.000000', 'info', 'Submitted a new form.');
INSERT INTO public.activity (email, message, activity_time, type, heading) VALUES ('shobitnair10@gmail.com', 'SPS-101 with purchase ID 33 was submitted on', '2021-08-14 22:48:19.000000', 'error', 'Submitted a new form.');
INSERT INTO public.activity (email, message, activity_time, type, heading) VALUES ('shobitnair10@gmail.com', 'SPS-101 with purchase ID 33 was submitted on', '2021-08-14 22:46:19.000000', 'success', 'Submitted a new form.');
