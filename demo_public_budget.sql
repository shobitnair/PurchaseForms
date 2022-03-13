create table budget
(
    id   integer not null
        constraint budget_pk
            primary key,
    data text
);

alter table budget
    owner to postgres;

