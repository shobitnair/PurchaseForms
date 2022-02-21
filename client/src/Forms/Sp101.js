import React, { useEffect, useState } from 'react';
import {
    TextField,
    Stack,
    DefaultButton,
    PrimaryButton, Label,
    DetailsList, Selection,
    Dropdown,
    Dialog,
    DialogType,
    DialogFooter,
    DatePicker,
    initializeIcons,
    MessageBar,
    Depths
} from '@fluentui/react';
import axios from 'axios';
import { LoginCheck } from '../Login/LoginCheck';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {URL} from '../cred';

initializeIcons();

const formatDate = (date) => {
    console.log(date);
    if (!date)
        return '';
    const month = date.getMonth() + 1; // + 1 because 0 indicates the first Month of the Year.
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const stackTokens = { childrenGap: 20 };
const stackStyles = { root: { width: "100%" } };

const column1 = {
    tokens: { childrenGap: 10 },
    styles: { root: { width: "33%", padding: "20px" } },
};
const column2 = {
    tokens: { childrenGap: 8 },
    styles: { root: { width: "33%", padding: "20px" } },
};
const column3 = {
    tokens: { childrenGap: 8 },
    styles: { root: { width: "34%", padding: "20px" } },
};


const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 400 } },
};


/**
* Different option sets for dropdown boxes
*/
const option1 = [
    { key: 'A', text: 'Yes' },
    { key: 'B', text: 'No' },
];
const option2 = [
    { key: 'A', text: 'Yes' },
    { key: 'B', text: 'No' },
    { key: 'C', text: 'N/A' },
];
const option3 = [
    { key: 'A', text: 'Telephone' },
    { key: 'B', text: 'E-mail' },
    { key: 'C', text: 'Spot Visit' },
    { key: 'D', text: `Vendor's Website` },
    { key: 'E', text: 'GEM' },
];
const option4 = [
    { key: 'A', text: 'Consumables' },
    { key: 'B', text: 'LTA' },
    { key: 'C', text: 'Non-Consumables' },
];


const Sp101 = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const nav = useNavigate();
    /**
    * Initial state of the form data
    */
    const init = {
        name: null,
        department: null,
        items: [],
        budgetHead: null,
        budgetSanction: null,
        itemName: null,
        approxCost: null,
        category: null,
        BAE: null,
        CSR: null,
        GRP: null,
        GEM: null,
        GEMdetails: null,
        MOE: null,
        ROI: null,
        NOQ: null,
        PurchasedFrom: null,
        DOP: null,
        Qno: null,
        RMP: null,
        DP: null,
    };

    // data which manages form variable states
    const [data, setData] = useState(init);
    const [flag, setFlag] = useState(0);

    /**
    *  does a HTTP POST REQUEST to add a new purchase form.
    */
    const postForm = async () => {
        try {
            const d = new Date();
            const res = await axios.post(URL+'/sp101', {
                email: state.user.email,
                data: JSON.stringify(data),
                status:'pending',
                date: new Date()
            });
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    /**
    *  Manages validation of the form data
    *  Manages the pop up toggle states
    */
    const onSubmit = async () => {
                // Form validation here.
        if(state.user == null){
            setToggleSubmit(!toggleSubmit);
            window.alert("Login using google before submitting a form.")
            nav('/');
        }
        else{
            await postForm();
            setToggleSubmit(!toggleSubmit);
            console.log(data);
        }
    };

    /**
    * Add items section
    * 
    * selection : Manages the array of items that are selected
    * toggle : Manages state of  pop up window for adding an item
    * _columns : some styles and data of the items viewer table
    * addItem() : adds an item in the table
    * handleDelete() : deletes the checked items and updates the list.
    */
    const [selection, setSelection] = useState(new Selection());
    const [toggleItem, setToggleItem] = useState(true);
    const [toggleSubmit, setToggleSubmit] = useState(true);

    const _columns = [{ key: 'column1', name: 'Description', fieldName: 'Description', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Quantity', fieldName: 'Quantity', minWidth: 75, maxWidth: 150, isResizable: true },
    { key: 'column3', name: 'Rate', fieldName: 'Rate', minWidth: 75, maxWidth: 150, isResizable: true }];


    const addItem = () => {
        let Description = document.getElementById("Description").value;
        let Quantity = document.getElementById("Quantity").value;
        let Rate = document.getElementById("Rate").value;
        setData({ ...data, items: [...data.items, { Description, Quantity, Rate }] });
        setToggleItem(true);
    };

    const handleDelete = () => {
        setData({ ...data, items: data.items.filter(x => !selection.getSelection().includes(x)) });
    };


    /**
    * A preview PDF for personal verification
    */
    const makePDF = () => {
        
        //MAKE PDF using state 'data'
    }

    useEffect(() => {
        
    }, []);

    const ItemPopUp = () => {
        return (
            <Dialog
                hidden={toggleItem}
                onDismiss={() => setToggleItem(false)}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Enter the details'

                }}
                modalProps={modelProps}
            >
                <TextField id="Description" label="Item Description" />
                <TextField id="Quantity" label="Quantity" />
                <TextField id="Rate" label="Rate" />
                <DialogFooter>
                    <PrimaryButton onClick={addItem} text="Add" />
                    <DefaultButton onClick={() => setToggleItem(true)} text="Cancel" />
                </DialogFooter>
            </Dialog>
        )
    }




    const SubmitPopUp = () => {
        return (
            <Dialog
                hidden={toggleSubmit}
                onDismiss={() => setToggleSubmit(false)}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Confirm Submit'
                }}
                modalProps={modelProps}
            >
                <DialogFooter>
                    <PrimaryButton onClick={onSubmit} text="Submit" />
                    <DefaultButton onClick={() => setToggleSubmit(true)} text="Cancel" />
                </DialogFooter>
            </Dialog>
        )
    }



    return (
        <div >
            <ItemPopUp />
            <SubmitPopUp />
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                {/**
                 *  COlUMN1 of the form
                 */}
                <Stack {...column1} style={{ 'backgroundColor': '#faf9f8', boxShadow: Depths.depth8 }}>
                    <TextField label="Name" value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })} />
                    <TextField label="Department" value={data.department}
                        onChange={(e) => setData({ ...data, department: e.target.value })} />
                    <Stack horizontal tokens={stackTokens}>
                        <TextField label="Budget Head" value={data.budgetHead} styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, budgetHead: e.target.value })} />
                        <TextField label="Sanctioned Budget" value={data.budgetSanction} styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, budgetSanction: e.target.value })} />
                    </Stack>
                    <Stack horizontal tokens={stackTokens}>
                        <TextField label="Item Name"
                            placeholder="write 'MANY' if > 1" styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, itemName: e.target.value })} />
                        <TextField label="Approximate Cost" styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, approxCost: e.target.value })} />
                    </Stack>
                    <Dropdown placeholder="Select an Option" options={option4} label="Category"
                        onChange={(e, i) => setData({ ...data, category: i.text })} />
                    <Dropdown placeholder="Select an Option" options={option1} label="Budgetary Approval Enclosed"
                        onChange={(e, i) => setData({ ...data, BAE: i.text })} />
                    <Dropdown placeholder="Select an Option" options={option2}
                        label="Certified that the space is ready for installation of the equipment in Department/Centre/Unit on its arrival"
                        onChange={(e, i) => setData({ ...data, CSR: i.text })} />
                    <Dropdown placeholder="Select an Option" options={option1}
                        label="Are the goods for Research Purpose "
                        onChange={(e, i) => setData({ ...data, GRP: i.text })} />
                    <div style={{ boxShadow: Depths.depth4 }}><MessageBar >
                        If required for Research Purpose then Certificate for claiming concessional GST under notification no. 45/2017
                        & 47/2017: Certified that purchase of above goods for which concessional GST is claimed is required for research
                        purpose only
                    </MessageBar></div>
                </Stack>

                {/**
                 *  COlUMN2 of the form
                 */}
                <Stack {...column2} style={{ 'backgroundColor': '#faf9f8', boxShadow: Depths.depth8 }}>
                    <Dropdown placeholder="Select an Option" options={option1} label="GEM Purchase"
                        onChange={(e, i) => setData({ ...data, GEM: i.text })} />
                    <div>
                        <Label >Details of the item if available in GEM ,
                            Else mention the GeMAR & PTS ID</Label>
                        <TextField multiline rows={2}
                            onChange={(e) => setData({ ...data, GEMdetails: e.target.value })} />
                    </div>
                    <TextField label="Recommendations of the Indenter " multiline rows={4}
                        onChange={(e) => setData({ ...data, ROI: e.target.value })} />
                    <Dropdown placeholder="Select an Option" options={option3} label="Mode of Enquiry"
                        onChange={(e, i) => setData({ ...data, MOE: i.text })} />
                    <TextField label="Number of Quotations Received"
                        onChange={(e) => setData({ ...data, NOQ: e.target.value })} />
                    <Stack horizontal tokens={stackTokens}>
                        <TextField label="Purchased from M/s" styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, PurchasedFrom: e.target.value })} />
                        <TextField label="Quotation Number" styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, Qno: e.target.value })} />
                    </Stack>
                    <DatePicker
                        placeholder="Select a date"
                        label="Date of purchase"
                        onSelectDate={(e) => setData({ ...data, DOP: formatDate(e) })} />
                    <Stack horizontal tokens={stackTokens} >
                        <TextField label="Required mode of payment"
                            styles={{ root: { width: '50%', } }}
                            onChange={(e) => setData({ ...data, RMP: e.target.value })} />
                        <TextField label="Delivery Period"
                            styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, DP: e.target.value })} />
                    </Stack>
                </Stack>
                {/**
                 *  COlUMN3 of the form
                 */}
                <Stack {...column3} style={{ 'backgroundColor': '#faf9f8', boxShadow: Depths.depth8 }}>
                    <Label>Added Items</Label>
                    <div style={{
                        'height': '300px',
                        'overflow': 'scroll',
                        'border': '8px solid #f3f2f1'
                        , borderRadius: '2px', boxShadow: Depths.depth4
                    }}>
                        <DetailsList
                            items={data.items}
                            columns={_columns}
                            selection={selection}
                            setKey={["key"]}
                        >
                        </DetailsList>
                    </div>
                    <div style={{ boxShadow: Depths.depth4 }}><MessageBar>I am personally satisfied that these goods purchased are of the requisite quality and specification and have
                        been purchased from a reliable supplier at a reasonable price.</MessageBar></div>
                    <Label />
                    <Stack horizontal>
                        <PrimaryButton style={{ 'marginLeft': '2.5%', 'width': '45%', 'backgroundColor': '#4C4A48', boxShadow: Depths.depth4 }}
                            onClick={() => { setToggleItem(!toggleItem); }}
                            text="Add Items  "> </PrimaryButton>
                        <DefaultButton style={{ 'marginLeft': '5%', 'width': '45%', boxShadow: Depths.depth4 }} text="Delete Selected"
                            onClick={handleDelete} />
                    </Stack>
                    <Stack horizontal>
                        <PrimaryButton style={{ 'marginLeft': '2.5%', 'width': '45%', 'backgroundColor': '#4C4A48', boxShadow: Depths.depth4 }} text="Submit"
                            onClick={() => setToggleSubmit(!toggleSubmit)} />
                        <DefaultButton style={{ 'marginLeft': '5%', 'width': '45%', boxShadow: Depths.depth4 }} text="Preview"
                            onClick={() => makePDF()} />
                    </Stack>
                </Stack>
            </Stack>
        </div>
    );

};
export default Sp101;
