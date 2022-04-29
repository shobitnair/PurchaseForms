create table draft_2019csb1121
(
    id           serial,
    type         varchar   not null,
    data         text      not null,
    last_updated timestamp not null
);

alter table draft_2019csb1121
    owner to postgres;

