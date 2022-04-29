create table users
(
    name       varchar not null,
    email      varchar not null
        primary key,
    role       varchar,
    department varchar
);

alter table users
    owner to postgres;

INSERT INTO public.users (name, email, role, department) VALUES ('Sujaya prashant', 'sujaprasha1995@gmail.com', 'FACULTY', null);
INSERT INTO public.users (name, email, role, department) VALUES ('PUNEET GOYAL', 'puneet@iitrpr.ac.in', 'JAO', null);
INSERT INTO public.users (name, email, role, department) VALUES ('Shobit Nair', 'shobitnair@gmail.com', 'FACULTY', 'CSE');
INSERT INTO public.users (name, email, role, department) VALUES ('SHOBIT PRASHANT NAIR', '2019csb1121@iitrpr.ac.in', 'JAO', 'ACCOUNTS');
INSERT INTO public.users (name, email, role, department) VALUES ('Shobit Nair', 'shobitnair10@gmail.com', 'FACULTY', 'CSE');
