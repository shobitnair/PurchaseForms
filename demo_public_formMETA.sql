create table "formMETA"
(
    name varchar not null
        constraint forms_pkey
            primary key
);

alter table "formMETA"
    owner to postgres;

INSERT INTO public."formMETA" (name) VALUES ('sp101');
INSERT INTO public."formMETA" (name) VALUES ('sp102');
