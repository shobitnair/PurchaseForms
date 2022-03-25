create table draft_shobitnair10
(
    id           serial
        constraint draft_shobitnair10_pk
            primary key,
    type         varchar   not null,
    data         text      not null,
    last_updated timestamp not null
);

alter table draft_shobitnair10
    owner to postgres;

create unique index draft_shobitnair10_id_uindex
    on draft_shobitnair10 (id);

