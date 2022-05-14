create table users
(
    name       varchar not null,
    email      varchar not null
        primary key,
    role       varchar,
    department varchar,
    signature  varchar
);

alter table users
    owner to postgres;

INSERT INTO public.users (name, email, role, department, signature) VALUES ('Shobit Nair', 'shobitnair@gmail.com', 'FACULTY', 'CSE', null);
INSERT INTO public.users (name, email, role, department, signature) VALUES ('PUNEET GOYAL', 'puneet@iitrpr.ac.in', 'JAO', 'CSE', null);
INSERT INTO public.users (name, email, role, department, signature) VALUES ('Shobit Nair', 'shobitnair10@gmail.com', 'FACULTY', 'Computer Science', null);
INSERT INTO public.users (name, email, role, department, signature) VALUES ('SHOBIT PRASHANT NAIR', '2019csb1121@iitrpr.ac.in', 'HOD', 'Computer Science', null);
