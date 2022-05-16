import React, { useEffect, useState, useContext } from 'react';
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
    Depths,
    DropdownMenuItemType
} from '@fluentui/react';
import { useNavigate} from 'react-router';
import {LoginContext} from '../Login/LoginContext'
import { useToast } from '@chakra-ui/react'
import {PDFHandler} from "./PDFHandler";
import { postForm  , postDraft, getProfileDetails, addActivities, getHOD, addNotifications} from '../Requests/formRequests';
import { Dropzone, FileItem, FullScreenPreview, InputButton } from "@dropzone-ui/react";
import {URL} from '../cred'
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
    { key: 'D', text: 'Services'}
];

const option5 = [
    { key: 'header1' , text:'Engineering',itemType: DropdownMenuItemType.Header },
    { key: 'A', text: 'BioMedical' },
    { key: 'B', text: 'Chemical' },
    { key: 'C', text: 'Civil' },
    { key: 'D', text: 'Computer Science'},
    { key: 'E', text: 'Electrical' },
    { key: 'F', text: 'Mechanical' },
    { key: 'G', text: 'Metallurigical and Materials' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'header2' , text:'Science & Humanities',itemType: DropdownMenuItemType.Header },
    { key: 'H', text: 'Chemistry' },
    { key: 'I', text: 'Physics' },
    { key: 'J', text: 'Mathematics' },
    { key:'K' , text: 'Humanities'}
]

const findKey = (options , value) =>{
    if(value){
        return options.filter(x => x.text === value)[0].key;
    } else return 'NULL_KEY'
}

const Sp101 = () => {
    const {user , role} = useContext(LoginContext)
    const nav = useNavigate();
    const toast = useToast()
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
        files:[],
        tax: null,
        taxDisable:false,
    };  

    const initValid = {
        nameError: false,
        departmentError: false,
        itemsError: [],
        budgetHeadError: false,
        budgetSanctionError: false,
        itemNameError: false,
        approxCostError: false,
        categoryError: false,
        BAEError: false,
        CSRError: false,
        GRPError: false,
        GEMError: false,
        GEMdetailsError: false,
        MOEError: false,
        ROIError: false,
        NOQError: false,
        PurchasedFromError: false,
        DOPError: false,
        QnoError: false,
        budgetHeadError: false,
        taxError: false,
        fileError: false,
        itemError: false,
    };  



    const [valid, setValid] = useState(initValid)

    // data which manages form variable states
    const [data, setData] = useState(init);
    const [flag, setFlag] = useState(false);
        

    /**
    *  does a HTTP POST REQUEST to add a new purchase form.
    */
    const submitForm = async () => {
        const res = await postForm("sp101" ,user.email , data , "pending" , data.department)
        await addActivities(user.email ,
            'Purchase form SPS-101 succesfully submitted with ID : '+res.id+' on ' , 'success' , 'Form Submitted', res.id)
        
        const hodMAIL = await getHOD(data.department);
        console.log(hodMAIL);
        await addNotifications(hodMAIL.email , 'Take action on new form added with ID : '+res.id , 'warning' , 'New Form Added' , res.id)
        toast({
            title: 'Purchase form submitted',
            description: res.comment,
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        
        nav('/site')
    }


    /**
    *  Manages validation of the form data
    *  Manages the pop up toggle states
    */
     
     const validationFunc = () =>{
        setValid({
            ...valid,
            nameError: (data.name === null || data.name === ''),
            departmentError:(data.department === null || data.department === ''),
            itemNameError:(data.itemName === null || data.itemName === ''),
            budgetHeadError:(data.budgetHead === null || data.budgetHead ===''),
            budgetSanctionError:(data.budgetSanction === null || data.budgetSanction === ''),
            approxCostError:(data.approxCost === null || data.approxCost === ''),
            categoryError:(data.category === null || data.category === ''),
            BAEError:(data.BAE === null || data.BAE === ''),
            CSRError:(data.CSR === null || data.CSR === ''),
            GRPError:(data.GRP === null || data.GRP === ''),
            GEMError:(data.GEM === null || data.GEM === ''),
            MOEError:(data.MOE === null || data.MOE === ''),
            NOQError:(data.NOQ === null || data.NOQ === ''),
            PurchasedFromError:(data.PurchasedFrom === null || data.PurchasedFrom === ''),
            QnoError:(data.Qno === null || data.Qno === ''),
            taxError:(data.tax === null || data.tax ===''),
            fileError:(data.files.length === 0),
            itemError:(data.items.length === 0),
        })
        
        

        
        
    }
    const onSubmit = async () => {
        if(user == null){
            setToggleSubmit(!toggleSubmit);
            window.alert("Login using google before submitting a form.")
            nav('/');
        }
        else{
            await submitForm();
            setToggleSubmit(!toggleSubmit);

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
    const [validFlag, setValidFlag] = useState(1);

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

    const [firstVisit, setFirstVisit]=useState(0);
    useEffect(async() => {
        if(user && role){
            if(firstVisit===0){
                const response = await getProfileDetails(user.email);
                setData({...data,
                    name:response.name,
                    department:response.department,
                    signature:response.signature,
                    email:user.email,
                });
                setFirstVisit(1);
            }
            if(firstVisit===1){
                if((!valid.nameError)&&(!valid.departmentError)&&(!valid.itemNameError)&&
                (!valid.budgetSanctionError)&&(!valid.approxCostError)&&(!valid.categoryError)&&
                (!valid.BAEError)&&(!valid.CSRError)&&(!valid.GRPError)&&(!valid.GEMError)&&(!valid.MOEError)&&
                (!valid.fileError) && (!valid.QnoError) &&(!valid.PurchasedFromError) &&(!valid.taxError) &&
                (!valid.NOQError) &&(!valid.budgetHeadError) && (!valid.itemError)){
                    setToggleSubmit(!toggleSubmit);
                }
                if(valid.fileError){
                    toast({
                        title: 'Please attach documents and click update files',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }
                if(valid.itemError){
                    toast({
                        title: 'No items listed',
                        description: 'Add items to complete the form filling process',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            
            }
        }
        
    }, [valid , user , role]);

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

    const handleDraft = async()=>{
        const response = await postDraft(user.email , data , "sp101");
        toast({
            title: 'Redirected to Drafts Section',
            description: 'Continue editing and save drafts to keep it updated. draft id = '+response.id,
            status: 'info',
            duration: 5000,
            isClosable: true,
        })
        nav('/site/forms/sp101/draft/'+response.id);
    }

    const [files, setFiles] = useState([]);

    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
    };

    
    const onDelete = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };


    const uploader = (res) =>{
        setData({...data , files:res.map(x => {
            return x.serverResponse.data
        })})
    }


    const setTax = (e,i) =>{
        if(i.text ==='Yes'){
            setData({...data,
                GRP: i.text,
                tax: 5,
                taxDisable: true,
            });
        }
        else
        {
            setData({...data,
                GRP: i.text,
                taxDisable: false,
                tax: null,
            });
        }
        
    }

    return (
        <div >
            <ItemPopUp />
            <SubmitPopUp />
            {firstVisit && <Stack horizontal tokens={stackTokens} styles={stackStyles} style={{marginTop:10}}>
                {/**
                 *  COlUMN1 of the form
                 */}
                <Stack {...column1} style={{ 'backgroundColor': '#faf9f8', boxShadow: Depths.depth16 }}>
                    <TextField label="Name" value={data.name} errorMessage={ valid.nameError? "This field is required":""}
                        onChange={(e) => setData({ ...data, name: e.target.value })} required />
            
                    <Dropdown placeholder="Select an Option" options={option5} label="Department" 
                        errorMessage={ valid.departmentError? "This field is required":""}
                        defaultSelectedKey = {findKey(option5,data.department)}
                        onChange={(e, i) => setData({ ...data, department: i.text })} required/>
                    
                    <Stack horizontal tokens={stackTokens}>
                        <TextField label="Budget Head" value={data.budgetHead} styles={{ root: { width: '50%' } }} errorMessage={valid.budgetHeadError?"This field is required":""}
                            onChange={(e) => setData({ ...data, budgetHead: e.target.value })} required />
                        <TextField label="Sanctioned Budget" value={data.budgetSanction} errorMessage={ valid.budgetSanctionError? "This field is required":""} styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, budgetSanction: e.target.value })} required/>
                    </Stack>
                    <Stack horizontal tokens={stackTokens}>
                        <TextField label="Item Name"
                            placeholder="write 'MANY' if > 1" errorMessage={ valid.itemNameError? "This field is required":""} styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, itemName: e.target.value })} required/>
                        <TextField label="Approximate Cost" errorMessage={ valid.approxCostError? "This field is required":""} styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, approxCost: e.target.value })} required/>
                    </Stack>
                    <Dropdown placeholder="Select an Option" options={option4} label="Category" errorMessage={ valid.categoryError? "This field is required":""}
                        onChange={(e, i) => setData({ ...data, category: i.text })} required/>
                    <Dropdown placeholder="Select an Option" options={option1} label="Budgetary Approval Enclosed" errorMessage={ valid.BAEError? "This field is required":""}
                        onChange={(e, i) => setData({ ...data, BAE: i.text })} required/>
                    <Dropdown placeholder="Select an Option" options={option2}
                        label="Certified that the space is ready for installation of the equipment in Department/Centre/Unit on its arrival"
                        errorMessage={ valid.CSRError? "This field is required":""}
                        onChange={(e, i) => setData({ ...data, CSR: i.text })} required/>
                    <Dropdown placeholder="Select an Option" options={option1}
                        label="Are the goods for Research Purpose "
                        errorMessage={ valid.GRPError? "This field is required":""}
                        onChange={(e, i) => setTax(e,i)} required/>
                    <div style={{ boxShadow: Depths.depth4 }}><MessageBar >
                        If required for Research Purpose then Certificate for claiming concessional GST under notification no. 45/2017
                        & 47/2017: Certified that purchase of above goods for which concessional GST is claimed is required for research
                        purpose only
                    </MessageBar></div>
 
                </Stack>

                {/**
                 *  COlUMN2 of the form
                 */}
                <Stack {...column2} style={{ 'backgroundColor': '#faf9f8', boxShadow: Depths.depth16 }}>
                    {/* <div hidden={valid.nameError}>yoi</div> */}
                    <Dropdown placeholder="Select an Option" errorMessage={ valid.GEMError? "This field is required":""} options={option1} label="GEM Purchase"
                        onChange={(e, i) => setData({ ...data, GEM: i.text })} required/>
                    <div>
                        <Label >Details of the item if available in GEM ,
                            Else mention the GeMAR & PTS ID</Label>
                        <TextField multiline rows={2}
                            onChange={(e) => setData({ ...data, GEMdetails: e.target.value })} />
                    </div>
                    <TextField label="Recommendations of the Indenter (If required , seperate sheet can be attached for detailed specifications)" multiline rows={4}
                        onChange={(e) => setData({ ...data, ROI: e.target.value })} />
                    <Dropdown placeholder="Select an Option" options={option3} label="Mode of Enquiry"
                    errorMessage={ valid.MOEError? "This field is required":""}
                        onChange={(e, i) => setData({ ...data, MOE: i.text })} required/>
                    <TextField label="Number of Quotations Received" errorMessage={valid.NO?"This field is required":""}
                        onChange={(e) => setData({ ...data, NOQ: e.target.value })} required/>
                    <Stack horizontal tokens={stackTokens}>
                        <TextField label="Purchased from M/s" styles={{ root: { width: '50%' } }}
                            errorMessage={valid.PurchasedFromError?"This field is required":""}
                            onChange={(e) => setData({ ...data, PurchasedFrom: e.target.value })} required />
                        <TextField label="Quotation Number" styles={{ root: { width: '50%' } }}
                            onGetErrorMessage = {valid.QnoError?"This field is required":""}
                            onChange={(e) => setData({ ...data, Qno: e.target.value })} required/>
                    </Stack>
                    <DatePicker
                        placeholder="Select a date"
                        label="Date of quotation"
                        onSelectDate={(e) => setData({ ...data, DOP: formatDate(e) })}
                        isRequired/>
                    <Stack horizontal tokens={stackTokens}>
                        <TextField label="Recommended mode of payment"
                            styles={{ root: { width: '50%', } }}
                            onChange={(e) => setData({ ...data, RMP: e.target.value })} />
                        <TextField label="Delivery Period"
                            styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, DP: e.target.value })}/>
                    </Stack>
                    <TextField label="Tax" errorMessage={ valid.taxError? "This field is required":""} styles={{ root: { width: '50%' } }}
                            onChange={(e) => setData({ ...data, tax: e.target.value })} required
                            value={data.tax}
                            disabled={data.taxDisable}
                            />
                </Stack>
                {/**
                 *  COlUMN3 of the form
                 */}
                <Stack {...column3} style={{ 'backgroundColor': '#faf9f8', boxShadow: Depths.depth16 }}>
                <Label>Attach necessary files. (PDF , JPEG , JPG , PNG)</Label>
                
                <Dropzone
                    onChange={updateFiles}
                    value={files}
                    maxFileSize={25240000}
                    label="Click here to upload files"
                    url={URL + "/upload"}
                    accept=".png,.jpeg,.jpg,image/*,.pdf"
                    footer={false}
                    onUploadFinish={uploader}
                >
                    {files.map((file) => (
                        <FileItem
                            {...file}
                            key={file.id}
                            onDelete={onDelete}
                            resultOnTooltip
                            preview
                            info
                            />
                    ))}
                    
                </Dropzone>
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
                            onClick = {() => validationFunc()} />
                        <DefaultButton style={{ 'marginLeft': '5%', 'width': '45%', boxShadow: Depths.depth4 }} text="Preview"
                            onClick={() => PDFHandler('sp101' , data)} />
                    </Stack>

                </Stack>
            </Stack>}
        </div>
    );

};
export default Sp101;