create table notifications
(
    email             varchar
        constraint notifications_users_email_fk
            references users,
    message           varchar,
    notification_time timestamp,
    type              varchar,
    heading           varchar,
    id                integer
);

alter table notifications
    owner to postgres;

INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 30 was denied by AO on ', '2022-05-16 00:13:39.088000', 'error', 'Your Purchase form was denied', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 30 was denied by AO on ', '2022-05-16 00:15:26.905000', 'error', 'Your Purchase form was denied', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Your Purchase form with ID : 23 has been approved by the AR and reached the Purchase Section on ', '2022-05-16 22:42:24.269000', 'success', 'Purchase form approved', 23);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('2019csb1129@iitrpr.ac.in', 'Take action on new form added with ID : 54', '2022-05-16 23:23:13.717000', 'warning', 'New Form Added', 54);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 30 was denied by AO on ', '2022-05-16 00:13:39.088000', 'error', 'Your Purchase form was denied', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 30 was denied by AO on ', '2022-05-16 00:15:26.905000', 'error', 'Your Purchase form was denied', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 30 was denied by AO on ', '2022-05-16 00:27:11.713000', 'error', 'Your Purchase form was denied', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 30 on ', '2022-05-15 19:46:39.341000', 'info', 'Status Update', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 30 on ', '2022-05-15 19:46:56.675000', 'info', 'Status Update', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 30 on ', '2022-05-15 19:46:56.675000', 'info', 'Status Update', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 30 was denied by AO on ', '2022-05-16 00:10:43.653000', 'error', 'Your Purchase form was denied', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 30 was denied by AO on ', '2022-05-16 00:10:43.653000', 'error', 'Your Purchase form was denied', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 30 on ', '2022-05-15 19:46:39.341000', 'info', 'Status Update', 30);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 45 was denied by HOD on ', '2022-05-16 19:33:30.654000', 'error', 'Your Purchase form was denied', 45);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Your Purchase form with ID : 46 has been approved by the HOD on ', '2022-05-16 19:42:17.454000', 'info', 'Status Update', 46);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 46 on ', '2022-05-16 19:46:52.954000', 'info', 'Status Update', 46);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 27 on ', '2022-05-16 21:01:01.079000', 'info', 'Status Update', 27);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES (null, 'Pending form with ID: 27 received on', '2022-05-16 21:01:01.094000', 'info', 'Action Pending', 27);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 23 on ', '2022-05-16 21:08:40.074000', 'info', 'Status Update', 23);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair@gmail.com', 'Pending form with ID: 23 received on', '2022-05-16 21:08:40.092000', 'info', 'Action Pending', 23);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 46 was denied by AO on ', '2022-05-16 21:16:57.345000', 'error', 'Your Purchase form was denied', 46);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES (null, 'Purchase form with ID : 46 was denied by AO', '2022-05-16 21:16:57.365000', 'warning', 'A Purchase form was denied', 46);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Purchase form with ID : 27 was denied by AO on ', '2022-05-16 21:25:00.349000', 'error', 'Your Purchase form was denied', 27);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('2019csb1085@iitrpr.ac.in', 'Purchase form with ID : 27 was denied by AO', '2022-05-16 21:25:00.371000', 'warning', 'A Purchase form was denied', 27);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Your Purchase form with ID : 23 has been approved by the AO on ', '2022-05-16 21:33:00.356000', 'info', 'Status Update', 23);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('2019csb1085@iitrpr.ac.in', 'A new form with ID: 23 received on', '2022-05-16 21:33:00.366000', 'info', 'New form was added', 23);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('2019csb1129@iitrpr.ac.in', 'Take action on new form added with ID : 53', '2022-05-16 22:03:10.387000', 'warning', 'New Form Added', 53);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('2019csb1129@iitrpr.ac.in', 'Take action on new form added with ID : 52', '2022-05-16 22:03:10.388000', 'warning', 'New Form Added', 52);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Your Purchase form with ID : 54 has been approved by the HOD on ', '2022-05-16 23:26:07.976000', 'info', 'Status Update', 54);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('2019csb1121@iitrpr.ac.in', 'A new form with ID: 54 received on', '2022-05-16 23:26:07.988000', 'info', 'New form was added', 54);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Budget has been filled by JAO for purchase form 54 on ', '2022-05-16 23:27:55.995000', 'info', 'Status Update', 54);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair@gmail.com', 'A new form with ID: 54 received on', '2022-05-16 23:27:56.016000', 'info', 'New form was added', 54);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Your Purchase form with ID : 54 has been approved by the AO on ', '2022-05-16 23:29:14.557000', 'info', 'Status Update', 54);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('2019csb1085@iitrpr.ac.in', 'A new form with ID: 54 received on', '2022-05-16 23:29:14.569000', 'info', 'New form was added', 54);
INSERT INTO public.notifications (email, message, notification_time, type, heading, id) VALUES ('shobitnair10@gmail.com', 'Your Purchase form with ID : 54 has been approved by the AR on ', '2022-05-16 23:29:53.324000', 'success', 'Purchase form approved', 54);
