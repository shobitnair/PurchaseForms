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

INSERT INTO public.draft_shobitnair10 (id, type, data, last_updated) VALUES (1, 'sp101', '{"name":null,"department":null,"items":[],"budgetHead":null,"budgetSanction":null,"itemName":null,"approxCost":null,"category":null,"BAE":null,"CSR":null,"GRP":null,"GEM":null,"GEMdetails":null,"MOE":null,"ROI":null,"NOQ":null,"PurchasedFrom":null,"DOP":null,"Qno":null,"RMP":null,"DP":null}', '2022-03-25 23:09:20.913000');
INSERT INTO public.draft_shobitnair10 (id, type, data, last_updated) VALUES (3, 'sp101', '{"name":"Shobit","department":"CSE","items":[],"budgetHead":"22","budgetSanction":null,"itemName":null,"approxCost":null,"category":null,"BAE":null,"CSR":null,"GRP":null,"GEM":null,"GEMdetails":null,"MOE":null,"ROI":null,"NOQ":null,"PurchasedFrom":null,"DOP":null,"Qno":null,"RMP":null,"DP":null}', '2022-04-29 17:06:21.545000');
INSERT INTO public.draft_shobitnair10 (id, type, data, last_updated) VALUES (2, 'sp101', '{"name":"BUBUBUBUBU","department":"EE","items":[],"budgetHead":null,"budgetSanction":null,"itemName":null,"approxCost":null,"category":null,"BAE":null,"CSR":null,"GRP":null,"GEM":null,"GEMdetails":null,"MOE":null,"ROI":null,"NOQ":null,"PurchasedFrom":null,"DOP":null,"Qno":null,"RMP":null,"DP":null}', '2022-04-29 17:13:16.994000');
INSERT INTO public.draft_shobitnair10 (id, type, data, last_updated) VALUES (4, 'sp101', '{"name":"Shobit","department":"CSE","items":[],"budgetHead":null,"budgetSanction":null,"itemName":null,"approxCost":null,"category":null,"BAE":null,"CSR":null,"GRP":null,"GEM":null,"GEMdetails":null,"MOE":null,"ROI":null,"NOQ":null,"PurchasedFrom":null,"DOP":null,"Qno":null,"RMP":null,"DP":null}', '2022-04-30 00:44:11.930000');
