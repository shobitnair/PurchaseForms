create table forms
(
    id           serial
        constraint forms_submitted_pkey
            primary key,
    type         varchar               not null
        constraint formtype_fk
            references "formMETA",
    email        varchar               not null
        constraint email_fk
            references users,
    status       varchar               not null,
    data         text                  not null,
    "Accountant" boolean default false not null,
    ao           boolean default false not null,
    "Accounts"   boolean default false not null,
    "Message"    text
);

alter table forms
    owner to postgres;

INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (4, 'sp101', 'shobitnair10@gmail.com', 'approved', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (18, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (5, 'sp101', 'shobitnair10@gmail.com', 'approved', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (20, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (23, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (24, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (25, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (14, 'sp101', 'shobitnair10@gmail.com', 'denied', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (11, 'sp102', 'shobitnair10@gmail.com', 'denied', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (12, 'sp101', 'shobitnair10@gmail.com', 'denied', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (13, 'sp101', 'shobitnair10@gmail.com', 'denied', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (17, 'sp101', 'shobitnair10@gmail.com', 'denied', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (26, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (30, 'sp101', '2019csb1121@iitrpr.ac.in', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (27, 'sp101', 'shobitnair10@gmail.com', 'approved', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (31, 'sp101', 'shobitnair10@gmail.com', 'approved', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (8, 'sp101', 'shobitnair10@gmail.com', 'denied', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (9, 'sp101', 'shobitnair10@gmail.com', 'denied', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/2/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (22, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (7, 'sp101', 'shobitnair10@gmail.com', 'approved', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (21, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (3, 'sp101', 'shobitnair10@gmail.com', 'approved', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (6, 'sp101', 'shobitnair10@gmail.com', 'approved', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (16, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (19, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
INSERT INTO public.forms (id, type, email, status, data, "Accountant", ao, "Accounts", "Message") VALUES (15, 'sp101', 'shobitnair10@gmail.com', 'pending', '{"name":"Shobit Nair","department":"CSE","items":[{"Description":"i1","Quantity":"20","Rate":"25"},{"Description":"i2","Quantity":"24","Rate":"232"}],"budgetHead":"25000","budgetSanction":"12345","itemName":"MANY","approxCost":"12345","category":"Consumables","BAE":"Yes","CSR":"Yes","GRP":"Yes","GEM":"Yes","GEMdetails":"Nill","MOE":"Telephone","ROI":"Nill , no recomm","NOQ":"2","PurchasedFrom":"xyz","DOP":"1/3/2022","Qno":"2342","RMP":"upi","DP":"12 days"}', false, false, false, null);
