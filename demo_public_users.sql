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

INSERT INTO public.users (name, email, role, department, signature) VALUES ('VANSHAL SINGH', '2019csb1129@iitrpr.ac.in', 'HOD', 'Computer Science', '1652710219025-737883997signature.png');
INSERT INTO public.users (name, email, role, department, signature) VALUES ('GANESH AGGARWAL', '2019csb1085@iitrpr.ac.in', 'AR', 'ACCOUNTS', '1652716804368-724621897signature.png');
INSERT INTO public.users (name, email, role, department, signature) VALUES ('Shobit Nair', 'shobitnair10@gmail.com', 'FACULTY', 'Computer Science', '1652722200284-421478084signature.png');
INSERT INTO public.users (name, email, role, department, signature) VALUES ('Shobit Prashant Nair', '2019csb1121@iitrpr.ac.in', 'JAO', 'ACCOUNTS', '1652723462998-599164649signature.png');
INSERT INTO public.users (name, email, role, department, signature) VALUES ('Shobit Nair', 'shobitnair@gmail.com', 'AO', 'ACCOUNTS', null);
INSERT INTO public.users (name, email, role, department, signature) VALUES ('PUNEET GOYAL', 'puneet@iitrpr.ac.in', 'FACULTY', 'Computer Science', null);
