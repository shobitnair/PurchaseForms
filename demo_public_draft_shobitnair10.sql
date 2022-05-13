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

INSERT INTO public.draft_shobitnair10 (id, type, data, last_updated) VALUES (2, 'sp101', '{"name":"BUBUBUBUBU","department":"EE","items":[],"budgetHead":null,"budgetSanction":null,"itemName":null,"approxCost":null,"category":null,"BAE":null,"CSR":null,"GRP":null,"GEM":null,"GEMdetails":null,"MOE":null,"ROI":null,"NOQ":null,"PurchasedFrom":null,"DOP":null,"Qno":null,"RMP":null,"DP":null}', '2022-04-29 17:13:16.994000');
INSERT INTO public.draft_shobitnair10 (id, type, data, last_updated) VALUES (4, 'sp101', '{"name":"Shobit","department":"Computer science","items":[],"budgetHead":"vcvc","budgetSanction":null,"itemName":null,"approxCost":null,"category":null,"BAE":null,"CSR":null,"GRP":null,"GEM":null,"GEMdetails":null,"MOE":null,"ROI":null,"NOQ":null,"PurchasedFrom":null,"DOP":null,"Qno":null,"RMP":null,"DP":null}', '2022-05-13 01:41:19.509000');
