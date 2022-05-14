`create table notifications
(
    email             varchar
        constraint notifications_users_email_fk
            references users,
    message           varchar,
    notification_time timestamp,
    type              varchar,
    heading           varchar
);

alter table notifications
    owner to postgres;

INSERT INTO public.notifications (email, message, notification_time, type, heading) VALUES ('2019csb1121@iitrpr.ac.in', 'SPS-101 with purchase ID 33 was submitted on', '2021-08-14 22:46:19.000000', 'success', 'Submitted a new form.');
`