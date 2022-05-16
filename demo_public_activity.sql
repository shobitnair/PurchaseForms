create table activity
(
    email         varchar
        constraint activity_users_email_fk
            references users,
    message       varchar,
    activity_time timestamp,
    type          varchar,
    heading       varchar,
    id            integer
);

alter table activity
    owner to postgres;

INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1129@iitrpr.ac.in', 'You approved purchase form with ID : 54 on ', '2022-05-16 23:26:07.969000', 'success', 'Approved a purchase form', 54);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1121@iitrpr.ac.in', 'You filled budget and approved purchase form 54 on ', '2022-05-16 23:27:56.003000', 'info', 'Approved and Filled Budget', 54);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair@gmail.com', 'You approved a purchase form with ID : 54 on ', '2022-05-16 23:29:14.551000', 'success', 'Approved a purchase form', 54);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1085@iitrpr.ac.in', 'You approved a purchase form with ID : 54 on ', '2022-05-16 23:29:53.317000', 'success', 'Approved a purchase form', 54);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'You denied a purchase form with ID : 30 on ', '2022-05-16 00:27:11.724000', 'error', 'Denied a purchase form', 30);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 42 on ', '2022-05-16 18:30:09.539000', 'success', 'FORM SUBMITTED', 42);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 43 on ', '2022-05-16 18:39:22.360000', 'success', 'FORM SUBMITTED', 43);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 44 on ', '2022-05-16 18:49:02.049000', 'success', 'FORM SUBMITTED', 44);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 45 on ', '2022-05-16 19:31:21.446000', 'success', 'FORM SUBMITTED', 45);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1129@iitrpr.ac.in', 'You denied a purchase form with ID : 45 on ', '2022-05-16 19:33:30.663000', 'error', 'Denied a purchase form', 45);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 46 on ', '2022-05-16 19:39:47.668000', 'success', 'FORM SUBMITTED', 46);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1129@iitrpr.ac.in', 'You approved purchase form with ID : 46 on ', '2022-05-16 19:42:17.447000', 'success', 'Approved a purchase form', 46);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1121@iitrpr.ac.in', 'You filled budget and approved purchase form 46 on ', '2022-05-16 19:46:52.961000', 'info', 'Approved and Filled Budget', 46);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1121@iitrpr.ac.in', 'You filled budget and approved purchase form 27 on ', '2022-05-16 21:01:01.087000', 'info', 'Approved and Filled Budget', 27);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1121@iitrpr.ac.in', 'You filled budget and approved purchase form 23 on ', '2022-05-16 21:08:40.081000', 'info', 'Approved and Filled Budget', 23);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair@gmail.com', 'You denied a purchase form with ID : 46 on ', '2022-05-16 21:16:57.353000', 'error', 'Denied a purchase form', 46);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair@gmail.com', 'You denied a purchase form with ID : 27 on ', '2022-05-16 21:25:00.360000', 'error', 'Denied a purchase form', 27);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair@gmail.com', 'You approved a purchase form with ID : 23 on ', '2022-05-16 21:33:00.350000', 'success', 'Approved a purchase form', 23);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 47 on ', '2022-05-16 21:59:19.171000', 'success', 'Form Submitted', 47);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 48 on ', '2022-05-16 21:59:41.335000', 'success', 'Form Submitted', 48);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 49 on ', '2022-05-16 22:01:21.315000', 'success', 'Form Submitted', 49);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 50 on ', '2022-05-16 22:01:25.336000', 'success', 'Form Submitted', 50);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 51 on ', '2022-05-16 22:01:49.783000', 'success', 'Form Submitted', 51);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 52 on ', '2022-05-16 22:02:56.130000', 'success', 'Form Submitted', 52);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 53 on ', '2022-05-16 22:02:59.975000', 'success', 'Form Submitted', 53);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('2019csb1085@iitrpr.ac.in', 'You approved a purchase form with ID : 23 on ', '2022-05-16 22:42:24.259000', 'success', 'Approved a purchase form', 23);
INSERT INTO public.activity (email, message, activity_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form SPS-101 succesfully submitted with ID : 54 on ', '2022-05-16 23:23:13.700000', 'success', 'Form Submitted', 54);
