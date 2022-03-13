create table users
(
    name  varchar not null,
    email varchar not null
        primary key
        unique,
    role  varchar
);

alter table users
    owner to postgres;

INSERT INTO public.users (name, email, role) VALUES ('Sujaya prashant', 'sujaprasha1995@gmail.com', null);
INSERT INTO public.users (name, email, role) VALUES ('SHOBIT PRASHANT NAIR', '2019csb1121@iitrpr.ac.in', 'JOA');
INSERT INTO public.users (name, email, role) VALUES ('Shobit Nair', 'shobitnair10@gmail.com', '<null>');