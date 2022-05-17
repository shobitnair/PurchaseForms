import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Depths,
  Dropdown,
  MessageBar,
  Stack,
  TextField,
  Label,
  DetailsList,
  Selection,
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  DatePicker,
  DateRangeType,
  DropdownMenuItemType,
  HighContrastSelectorWhite,
} from "@fluentui/react";
import { PDFHandler } from "./PDFHandler";
import { useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { LoginContext } from "../Login/LoginContext";
import { URL } from "../cred";
import { getFormById, getProfileDetails,getHOD, addActivities, addNotifications , postForm } from "../Requests/formRequests";
import { useToast } from "@chakra-ui/react";
import {
  Dropzone,
  FileItem,
  FullScreenPreview,
  InputButton,
} from "@dropzone-ui/react";


/**
 * Styles for the stack and the columns
 */
const stackStyles = {
  root: {
    width: "100%",
  },
};

const column1Styles = {
  root: {
    width: "33%",
    padding: "20px",
    backgroundColor: "#faf9f8",
    boxShadow: Depths.depth8,
  },
};

const column2Styles = {
  root: {
    width: "33%",
    padding: "20px",
    backgroundColor: "#faf9f8",
    boxShadow: Depths.depth8,
  },
};

const column3Styles = {
  root: {
    width: "33%",
    padding: "20px",
    backgroundColor: "#faf9f8",
    boxShadow: Depths.depth8,
  },
};

const messageStyles = {
  root: {
    boxShadow: Depths.depth4,
  },
};

const listStyles = {
  height: "300px",
  overflow: "scroll",
  border: "8px solid #f3f2f1",
  borderRadius: "2px",
  boxShadow: Depths.depth4,
  marginTop: "20px",
  marginBottom: "20px",
};

/**
 * Options for dropdowns
 */
const option1 = [
  { key: "A", text: "Consumables" },
  { key: "B", text: "LTA" },
  { key: "C", text: "Non-Consumables" },
  { key: "D", text: "Services" },
];

const options2 = [
  { key: "1", text: "Yes" },
  { key: "2", text: "No" },
];

const optionsEnquiry = [
  { key: "1", text: "Telephone" },
  { key: "2", text: "E-mail" },
  { key: "3", text: "Spot Visit" },
  { key: "4", text: "Vendor's Website" },
  { key: "5", text: "GeM" },
];

/**
 * Column names for lists
 */
const columnProposedCommittee = [
  {
    key: "column1",
    name: "Member of Committee",
    fieldName: "memberType",
    minWidth: 75,
    maxWidth: 150,
    isResizable: true,
  },
  {
    key: "column2",
    name: "Name of Faculty/Group A Officer",
    fieldName: "memberName",
    minWidth: 75,
    maxWidth: 150,
    isResizable: true,
  },
];

const columnItem = [
  {
    key: "column1",
    name: "Description",
    fieldName: "description",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "column2",
    name: "Quantity",
    fieldName: "quantity",
    minWidth: 75,
    maxWidth: 150,
    isResizable: true,
  },
  {
    key: "column3",
    name: "Rate",
    fieldName: "rate",
    minWidth: 75,
    maxWidth: 150,
    isResizable: true,
  },
];

const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 400 } },
};

const option5 = [
  {
    key: "header1",
    text: "Engineering",
    itemType: DropdownMenuItemType.Header,
  },
  { key: "A", text: "BioMedical" },
  { key: "B", text: "Chemical" },
  { key: "C", text: "Civil" },
  { key: "D", text: "Computer Science" },
  { key: "E", text: "Electrical" },
  { key: "F", text: "Mechanical" },
  { key: "G", text: "Metallurigical and Materials" },
  { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
  {
    key: "header2",
    text: "Science & Humanities",
    itemType: DropdownMenuItemType.Header,
  },
  { key: "H", text: "Chemistry" },
  { key: "I", text: "Physics" },
  { key: "J", text: "Mathematics" },
  { key: "K", text: "Humanities" },
];

const findKey = (options, value) => {
  if (value) {
    return options.filter((x) => x.text === value)[0].key;
  } else return "NULL_KEY";
};

const Sp102 = () => {
  const { user, role } = useContext(LoginContext);
  const nav = useNavigate();

  const initValid = {
    nameError: false,
    departmentError: false,
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
    memberError: false,
    member1Error: false,
    member2Error: false,
    member3Error: false,
  };

  const [valid, setValid] = useState(initValid);
  const [firstVisit, setFirstVisit] = useState(0);

  const param = useParams();

  const getFaculties = async () => {
    const faculties = await axios.post(URL + "/get/all/faculty");
    return faculties.data;
  };


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
    Qno: 'To be filled',
    RMP: null,
    DP: null,
    files: [],
    members: [],
    tax: null,
    taxDisable: false,
    partA: false,
    member1: null,
    member2: null,
    member3: null,
    member1name: null,
    member2name: null,
    member3name: null,
  };

  const toast = useToast();
  const [data, setData] = useState(init); //contains all the data of the form
  const [selectionMember, setSelectionMember] = useState(new Selection()); // for managing members list
  const [selectionItem, setSelectionItem] = useState(new Selection()); //for managing items list
  const [hideAddMemberDialog, sethideAddMemberDialog] = useState(true);
  const [hideSubmitDialog, setHideSubmitDialog] = useState(true);
  const [hideAddItemDialog, setHideAddItemDialog] = useState(true);
  const newMemberType = useRef();
  const newMemberName = useRef();
  const newItemDescription = useRef();
  const newItemQuantity = useRef();
  const newItemRate = useRef();
  const [facultyOptions, setFacultyOptions] = useState([]);

  const onCategoryChange = (e, item) => {
    if (item.selected) {
      setData({ ...data, category: [...data.category, item.text] });
    } else {
      const deleleIndex = data.category.indexOf(item.text);
      data.category.splice(deleleIndex, 1);
    }
  };

  const addMemberClicked = () => {
    const memberType = newMemberType.current.state.uncontrolledValue;
    const memberName = newMemberName.current.state.uncontrolledValue;
    setData({
      ...data,
      members: [...data.members, { memberType, memberName }],
    });
    sethideAddMemberDialog(true);
  };

  const addItemClicked = () => {
    const newItem = {
      description: newItemDescription.current.state.uncontrolledValue,
      quantity: newItemQuantity.current.state.uncontrolledValue,
      rate: newItemRate.current.state.uncontrolledValue,
    };
    setData({ ...data, items: [...data.items, newItem] });
    setHideAddItemDialog(true);
  };

  const deleteMemberClicked = () => {
    const deletemembers = selectionMember.getSelection();
    setData({
      ...data,
      members: data.members.filter((x) => !deletemembers.includes(x)),
    });
  };

  const deleteItemClicked = () => {
    const deleteItems = selectionItem.getSelection();
    setData({
      ...data,
      items: data.items.filter((x) => !deleteItems.includes(x)),
    });
  };

  const updateFormById = async () => {
    const res = await axios.post(URL + "/forms/update", {
      id: param.id,
      data: JSON.stringify(data),
      status: "pending",
    });
    return res.data;
  };

  const submitForm = async () => {
    try {
      if (!param.id) {
        const res = await postForm(
          "sp102",
          user.email,
          data,
          "pending",
          data.department
        );
        await addActivities(user.email ,'Part A of SPS-102 submitted with ID : '+res.id+' on ' , 'success' , 'Form Submitted', res.id);
        const hodMAIL = await getHOD(data.department);
        console.log(hodMAIL);
        await addNotifications(hodMAIL.email , 'Take action on new form added with ID : '+res.id , 'warning' , 'New Form Added' , res.id)
          
        toast({
          title: "Purchase form part A submitted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        nav("/site/admin/activity");
      } else {
        const res = await updateFormById();
        console.log(data.member1);
        await addNotifications(data.member1,'You are requested to approve for the committee for form : '+res.id,'committee','New Request for committee' , res.id);
        await addNotifications(data.member2,'You are requested to approve for the committee for form : '+res.id,'committee','New Request for committee' , res.id);
        await addNotifications(data.member3,'You are requested to approve for the committee for form : '+res.id,'committee','New Request for committee' , res.id);
        await addActivities(user.email ,'Part B of SPS-102 submitted with ID : '+res.id+' on ' , 'success' , 'Form Submitted', res.id);
        toast({
          title: "Purchase form part B submitted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        nav("/site");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    if (user === null) {
      setHideSubmitDialog(true);
      window.alert("Login using google before submitting a form.");
      nav("/");
    } else {
      ///console.log(data);
      await submitForm();
      setHideSubmitDialog(true);
    }
  };

  //Make PDF of the form
  const onPreviewClicked = useCallback(async() => {
    const response = await getFacultyNames();
    console.log(response)  
    const value={...data , 
      member1name:response.a,
      member2name:response.b,
      member3name:response.c,}
    setData(value);
    PDFHandler('sp102',value)

  },[data]);

  const MemberPopUp = () => {
    return (
      <Dialog
        hidden={hideAddMemberDialog}
        onDismiss={() => sethideAddMemberDialog(true)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Enter the Details",
        }}
        modalProps={modelProps}
      >
        <TextField
          label="Mention Faculty or Group A Officer"
          ref={newMemberType}
        />
        <TextField label="Member Name" ref={newMemberName} />
        <DialogFooter>
          <PrimaryButton text="Add" onClick={addMemberClicked} />
          <DefaultButton
            text="Cancel"
            onClick={() => sethideAddMemberDialog(true)}
          />
        </DialogFooter>
      </Dialog>
    );
  };

  const ItemPopUp = () => {
    return (
      <Dialog
        hidden={hideAddItemDialog}
        onDismiss={setHideAddItemDialog}
        modalProps={modelProps}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Enter the Details",
        }}
      >
        <TextField label="Description" ref={newItemDescription} />
        <TextField label="Quantity" ref={newItemQuantity} />
        <TextField label="Rate" ref={newItemRate} />
        <DialogFooter>
          <PrimaryButton text="Add" onClick={addItemClicked} />
          <DefaultButton
            text="Cancel"
            onClick={() => setHideAddItemDialog(true)}
          />
        </DialogFooter>
      </Dialog>
    );
  };

  const SubmitPopUp = () => {
    return (
      <Dialog
        hidden={hideSubmitDialog}
        onDismiss={() => setHideSubmitDialog(false)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Confirm Submit",
        }}
        modalProps={modelProps}
      >
        <DialogFooter>
          <PrimaryButton text="Submit" onClick={onSubmit} />
          <DefaultButton
            text="Cancel"
            onClick={() => setHideSubmitDialog(true)}
          />
        </DialogFooter>
      </Dialog>
    );
  };

  //For debugging
  const show = () => {
    console.log(data);
  };

  const validationFuncPartA = () => {
    setValid({
      ...valid,
      nameError: data.name === null || data.name === "",
      departmentError: data.department === null || data.department === "",
      itemNameError: data.itemName === null || data.itemName === "",
      budgetHeadError: data.budgetHead === null || data.budgetHead === "",
      budgetSanctionError:
        data.budgetSanction === null || data.budgetSanction === "",
      approxCostError: data.approxCost === null || data.approxCost === "",
      categoryError: data.category === null || data.category === "",
      BAEError: data.BAE === null || data.BAE === "",
      CSRError: data.CSR === null || data.CSR === "",
      GRPError: data.GRP === null || data.GRP === "",
      GEMError: data.GEM === null || data.GEM === "",
      member1Error:
        data.member1 === null ||
        data.member1 === "" ||
        !facultyOptions.includes(data.member1),
      member2Error:
        data.member2 === null ||
        data.member2 === "" ||
        !facultyOptions.includes(data.member2),
      member3Error:
        data.member3 === null ||
        data.member3 === "" ||
        !facultyOptions.includes(data.member3),
      memberError:
        data.member1 === data.member2 ||
        data.member2 === data.member3 ||
        data.member3 === data.member1,
    });
  };

  const validationFuncPartB = () => {
    setValid({
      ...valid,
      MOEError: data.MOE === null || data.MOE === "",
      NOQError: data.NOQ === null || data.NOQ === "",
      PurchasedFromError:
        data.PurchasedFrom === null || data.PurchasedFrom === "",
      QnoError: data.Qno === null || data.Qno === "",
      taxError: data.tax === null || data.tax === "",
      fileError: data.files.length === 0,
      itemError: data.items.length === 0,
    });
  };

  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const uploader = (res) =>{
    setData({...data , files:res.map(x => {
        return x.serverResponse.data
    })})
  }


  const getFacultyNames = useCallback(async() =>{
    const facultyName1 = await axios.post(URL + '/get/faculty/name',{email: data.member1});
    const facultyName2 = await axios.post(URL + '/get/faculty/name',{email: data.member2});
    const facultyName3 = await axios.post(URL + '/get/faculty/name',{email: data.member3});
    
    const value = {...data, member1name: facultyName1.data.name, member2name: facultyName2.data.name, member3name: facultyName3.data.name};
    setData(value);
  },[data])


  useEffect(async () => {
    if (user && role && param.id) {
      if (firstVisit === 0) {
        const tempData = await getFormById(param.id); //PartA->tempData.data
        const curData = JSON.parse(tempData.data);
        if (curData.GRP === "Yes") {
          setData({ ...curData, partA: false, tax: 5, taxDisable: true, Qno:''});
        } else {
          setData({ ...curData, partA: false, tax: null, taxDisable: false, Qno:'' });
        }
        setFirstVisit(1);
      } else if (firstVisit === 1) {
        //
        if (
          !valid.MOEError &&
          !valid.NOQError &&
          !valid.PurchasedFromError &&
          !valid.DOPError &&
          !valid.QnoError &&
          !valid.itemError &&
          !valid.fileError
        ) {
          setHideSubmitDialog(false);
        } else setHideSubmitDialog(true);
        if (valid.fileError) {
          toast({
            title: "No files attached",
            description: "Add files to complete the form filling process",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        if (valid.itemError) {
          toast({
            title: "No items listed",
            description: "Add items to complete the form filling process",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } else if (user && role) {
      if (firstVisit === 0) {
        const response = await getProfileDetails(user.email);
        const faculties = await getFaculties();
        setFacultyOptions(
          faculties.map((x) => {
            return x.email;
          })
        );
        
        setData({
          ...data,
          name: response.name,
          department: response.department,
          partA: true,
        });
        setFirstVisit(1);
      } else if (firstVisit === 1) {
        //console.log(data);
        //console.log(valid);
        if (
          !valid.nameError &&
          !valid.departmentError &&
          !valid.itemNameError &&
          !valid.budgetSanctionError &&
          !valid.approxCostError &&
          !valid.categoryError &&
          !valid.BAEError &&
          !valid.CSRError &&
          !valid.GRPError &&
          !valid.GEMError &&
          !valid.budgetHeadError &&
          !valid.memberError &&
          !valid.member1Error &&
          !valid.member2Error &&
          !valid.member3Error
        ) {
          await getFacultyNames();
          setHideSubmitDialog(!hideSubmitDialog);
        }
        if(valid.memberError || valid.member1Error || valid.member2Error || valid.member3Error) {
          toast({
            title: "Error in Proposed Committee",
            description:
              "Mention 3(different) members for committee. Check emails for spelling mistakes",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  }, [user, role, valid ]);

  return (
    <Stack horizontal tokens={{ childrenGap: 20 }} styles={stackStyles}>
      {/**
       * Column 1 of partA
       */}

      {firstVisit && data.partA && (
        <Stack tokens={{ childrenGap: 10 }} styles={column1Styles}>
          <TextField
            label="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            errorMessage={valid.nameError ? "This field is required" : ""}
          />
          <Dropdown
            placeholder="Select an Option"
            options={option5}
            label="Department"
            errorMessage={valid.departmentError ? "This field is required" : ""}
            defaultSelectedKey={findKey(option5, data.department)}
            onChange={(e, i) => setData({ ...data, department: i.text })}
            required
          />
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <TextField
              label="Budget Head"
              value={data.budgetHead}
              onChange={(e) => setData({ ...data, budgetHead: e.target.value })}
              styles={{ root: { width: "50%" } }}
              required
              errorMessage={
                valid.budgetHeadError ? "This field is required" : ""
              }
            />
            <TextField
              label="Sanctioned Budget"
              value={data.budgetSanction}
              onChange={(e) =>
                setData({ ...data, budgetSanction: e.target.value })
              }
              styles={{ root: { width: "50%" } }}
              required
              errorMessage={
                valid.budgetSanctionError ? "This field is required" : ""
              }
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <TextField
              label="Item Name"
              value={data.itemName}
              onChange={(e) => setData({ ...data, itemName: e.target.value })}
              placeholder="write 'MANY' if > 1"
              styles={{ root: { width: "50%" } }}
              required
              errorMessage={valid.itemNameError ? "This field is required" : ""}
            />
            <TextField
              label="Approximate Cost"
              value={data.approxCost}
              onChange={(e) => setData({ ...data, approxCost: e.target.value })}
              styles={{ root: { width: "50%" } }}
              required
              errorMessage={
                valid.approxCostError ? "This field is required" : ""
              }
            />
          </Stack>
          <Dropdown
            placeholder="Select an Option"
            options={option1}
            label="Category"
            errorMessage={valid.categoryError ? "This field is required" : ""}
            onChange={(e, i) => setData({ ...data, category: i.text })}
            required
          />
          <Dropdown
            label="Budgetary Approval Enclosed"
            placeholder="Select an Option"
            options={options2}
            onChange={(e, item) => setData({ ...data, BAE: item.text })}
            required
            errorMessage={valid.BAEError ? "This field is required" : ""}
          />
          <Dropdown
            label="Certified that the space is ready for installation of the equipment in Deptt/Centre/Unit on its arrival"
            placeholder="Select an Option"
            options={[...options2, { key: "3", text: "N/A" }]}
            onChange={(e, item) => setData({ ...data, CSR: item.text })}
            required
            errorMessage={valid.CSRError ? "This field is required" : ""}
          />

          <Dropdown
            label="Are the goods required for Research Purpose"
            placeholder="Select an Option"
            options={options2}
            onChange={(e, item) => setData({ ...data, GRP: item.text })}
            required
            errorMessage={valid.GRPError ? "This field is required" : ""}
          />

          <MessageBar styles={messageStyles}>
            If required for Research Purpose then Certificate for claiming
            concessional GST under notification no. 45/2017 & 47/2017: Certified
            that purchase of above goods for which concessional GST is claimed
            is required for research purpose only
          </MessageBar>
        </Stack>
      )}
      {/* <button onClick={show}>Show</button> */}

      {/**
       * Column 2 of partA
       */}
      {firstVisit && data.partA && (
        <Stack tokens={{ childrenGap: 8 }} styles={column2Styles}>
          <Dropdown
            label="GEM Purchase"
            options={options2}
            placeholder="Select an Option"
            onChange={(e, item) => setData({ ...data, GEM: item.text })}
            required
            errorMessage={valid.GEMError ? "This field is required" : ""}
          />
          <TextField
            label="Details of the item if available in GEM ,
          Else mention the GeMAR & PTS ID"
            value={data.GEMdetails}
            onChange={(e) => setData({ ...data, GEMdetails: e.target.value })}
            multiline
            rows={3}
          />
          <div>
            <label>Proposed Committee</label>
            <TextField
              label="Member 1 (Email)"
              value={data.member1}
              onChange={(e) => setData({ ...data, member1: e.target.value })}
              required
              errorMessage={valid.member1Error ? "This field is required" : ""}
            />
            <TextField
              label="Member 2 (Email)"
              value={data.member2}
              onChange={(e) => setData({ ...data, member2: e.target.value })}
              required
              errorMessage={valid.member2Error ? "This field is required" : ""}
            />
            <TextField
              label="Member 3 (Email)"
              value={data.member3}
              onChange={(e) => setData({ ...data, member3: e.target.value })}
              required
              errorMessage={valid.member3Error ? "This field is required" : ""}
            />
          </div>
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <PrimaryButton
              text="Submit"
              style={{
                marginLeft: "2.5%",
                width: "45%",
                backgroundColor: "#4C4A48",
                boxShadow: Depths.depth4,
              }}
              onClick={() => validationFuncPartA()}
            />
            <DefaultButton
              text="Preview"
              style={{
                marginLeft: "5%",
                width: "45%",
                boxShadow: Depths.depth4,
              }}
              onClick={() => onPreviewClicked()}
            />
          </Stack>
          <SubmitPopUp />
        </Stack>
      )}
      {/**
       * Column 1 of partB
       */}
      {firstVisit && !data.partA && (
        <Stack tokens={{ childrenGap: 8 }} styles={column3Styles}>
          <TextField
            label="Recommendations of the Indenter (If required , seperate sheet can be attached for detailed specifications)"
            value={data.ROI}
            onChange={(e) => setData({ ...data, ROI: e.target.value })}
            multiline
            rows={4}
          />
          <Dropdown
            label="Mode of Enquiry"
            placeholder="Select an Option"
            options={optionsEnquiry}
            onChange={(e, item) => setData({ ...data, MOE: item.text })}
            required
            errorMessage={valid.MOEError ? "This field is required" : ""}
          />
          <TextField
            label="Number of Quotations Received"
            value={data.NOQ}
            onChange={(e) => setData({ ...data, NOQ: e.target.value })}
            required
            errorMessage={valid.NOQError ? "This field is required" : ""}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <TextField
              label="Purchased from M/s"
              value={data.PurchasedFrom}
              onChange={(e) =>
                setData({ ...data, PurchasedFrom: e.target.value })
              }
              styles={{ root: { width: "50%" } }}
              required
              errorMessage={
                valid.PurchasedFromError ? "This field is required" : ""
              }
            />
            <TextField
              label="Quotation Number"
              value={data.Qno}
              onChange={(e) => setData({ ...data, Qno: e.target.value })}
              styles={{ root: { width: "50%" } }}
              required
              errorMessage={valid.QnoError ? "This field is required" : ""}
            />
          </Stack>

          <DatePicker
            label="Date of quotation"
            placeholder="Select a Date"
            onSelectDate={(e) => setData({ ...data, DOP: e })}
            isRequired
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <TextField
              label="Recommended mode of Payment"
              value={data.RMP}
              onChange={(e) => setData({ ...data, RMP: e.target.value })}
              styles={{ root: { width: "50%" } }}
            />
            <TextField
              label="Delivery Period"
              value={data.DP}
              onChange={(e) => setData({ ...data, DP: e.target.value })}
              styles={{ root: { width: "50%" } }}
            />
          </Stack>
          <TextField
            label="Tax"
            value={data.tax}
            onChange={(e) => setData({ ...data, tax: e.target.value })}
            styles={{ root: { width: "50%" } }}
            required
            errorMessage={valid.taxError ? "This field is required" : ""}
            disabled={data.taxDisable}
          />

          <div style={listStyles}>
            <Label style={{ textAlign: "center" }}>Items</Label>
            <DetailsList
              items={data.items}
              columns={columnItem}
              selection={selectionItem}
              setKey={["key2"]}
            />
          </div>
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <PrimaryButton
              text="Add Item"
              style={{
                marginLeft: "2.5%",
                width: "45%",
                backgroundColor: "#4C4A48",
                boxShadow: Depths.depth4,
              }}
              onClick={() => setHideAddItemDialog(!hideAddItemDialog)}
            />
            <DefaultButton
              text="Delete Selected"
              style={{
                marginLeft: "5%",
                width: "45%",
                boxShadow: Depths.depth4,
              }}
              onClick={deleteItemClicked}
            />
          </Stack>
          <ItemPopUp />
          <MessageBar styles={messageStyles}>
            It is certified that we the undersigned purchase committee members
            are jointly and individually satisfied that the recommended items
            are of requisite specifications and quality, prices are according to
            the prevailing market rates and the supplier recommended is reliable
            and competent to supply the goods in question.
          </MessageBar>
        </Stack>
      )}
      {/**
       * Column 2 of partB
       */}
      {firstVisit && !data.partA && (
        <Stack tokens={{ childrenGap: 8 }} styles={column3Styles}>
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
                onSee={handleSee}
                resultOnTooltip
                preview
                info
                hd
              />
            ))}
            <FullScreenPreview
              imgSource={imageSrc}
              openImage={imageSrc}
              onClose={(e) => handleSee(undefined)}
            />
          </Dropzone>
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <PrimaryButton
              text="Submit"
              style={{
                marginLeft: "2.5%",
                width: "45%",
                backgroundColor: "#4C4A48",
                boxShadow: Depths.depth4,
              }}
              onClick={() => validationFuncPartB()}
            />
            <DefaultButton
              text="Preview"
              style={{
                marginLeft: "5%",
                width: "45%",
                boxShadow: Depths.depth4,
              }}
              onClick={onPreviewClicked}
            />
          </Stack>
          <SubmitPopUp />
        </Stack>
      )}
    </Stack>
  );
};

export default Sp102;
