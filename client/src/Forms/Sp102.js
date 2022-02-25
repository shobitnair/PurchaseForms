import React, { useState, useRef , useContext } from "react";
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
} from "@fluentui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import { LoginContext } from "../Login/LoginContext";
import { URL } from "../cred";
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
    width: "34%",
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
};

/**
 * Options for dropdowns
 */
const options1 = [
  { key: "1", text: "Consumables" },
  { key: "2", text: "LTA" },
  { key: "3", text: "Non-Consumables" },
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

const Sp102 = () => {
  const {user} = useContext(LoginContext);
  const nav = useNavigate();

  const init = {
    name: "",
    department: null,
    budgetHead: null,
    sanctionHead: null,
    itemName: null,
    cost: null,
    category: [],
    BAE: null,
    DPC: null,
    researchPurpose: null,
    GeM: null,
    GeMDetails: null,
    members: [],
    indenterRecommendations: null,
    enquiryMode: null,
    numQuotations: null,
    purchasedFrom: null,
    quotation: null,
    purchaseDate: null,
    paymentMode: null,
    deliveryPeriod: null,
    items: [],
  };

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

  const postForm = async () => {
    const res = await axios.post(URL+'/forms', {
        type:'sp102',
        email: user.email,
        data: JSON.stringify(data),
        status:"pending"
    });
  };

  const onSubmitClicked = async () => {
    if (user === null) {
      setHideSubmitDialog(true);
      window.alert("Login using google before submitting a form.");
      nav("/");
    } else {
      ///console.log(data);
      await postForm();
      setHideSubmitDialog(true);
    }
  };

  //Make PDF of the form
  const onPreviewClicked = () => {};

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
        onDismiss={() => setHideSubmitDialog(true)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: "Confirm Submit",
        }}
        modalProps={modelProps}
      >
        <DialogFooter>
          <PrimaryButton text="Submit" onClick={onSubmitClicked} />
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

  return (
    <Stack horizontal tokens={{ childrenGap: 20 }} styles={stackStyles}>
      {/**
       * Column1 of stack
       */}
      <Stack tokens={{ childrenGap: 10 }} styles={column1Styles}>
        <TextField
          label="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <TextField
          label="Department"
          value={data.department}
          onChange={(e) => setData({ ...data, department: e.target.value })}
        />
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <TextField
            label="Budget Head"
            value={data.budgetHead}
            onChange={(e) => setData({ ...data, budgetHead: e.target.value })}
            style={{ width: "50%" }}
          />
          <TextField
            label="Sanctioned Head"
            value={data.sanctionHead}
            onChange={(e) => setData({ ...data, sanctionHead: e.target.value })}
            style={{ width: "50%" }}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <TextField
            label="Item Name"
            value={data.itemName}
            onChange={(e) => setData({ ...data, itemName: e.target.value })}
            placeholder="write 'MANY' if > 1"
            style={{ width: "50%" }}
          />
          <TextField
            label="Approximate Cost"
            value={data.cost}
            onChange={(e) => setData({ ...data, cost: e.target.value })}
            style={{ width: "50%" }}
          />
        </Stack>
        <Dropdown
          label="Category"
          placeholder="Choose 1 or more Option(s)"
          options={options1}
          multiSelect
          onChange={onCategoryChange}
        />
        <Dropdown
          label="Budgetary Approval Enclosed"
          placeholder="Select an Option"
          options={options2}
          onChange={(e, item) => setData({ ...data, BAE: item.text })}
        />
        <Dropdown
          label="Certified that the space is ready for installation of the equipment in Deptt/Centre/Unit on its arrival"
          placeholder="Select an Option"
          options={[...options2, { key: "3", text: "N/A" }]}
          onChange={(e, item) => setData({ ...data, DPC: item.text })}
        />

        <Dropdown
          label="Are the goods required for Research Purpose"
          placeholder="Select an Option"
          options={options2}
          onChange={(e, item) =>
            setData({ ...data, researchPurpose: item.text })
          }
        />

        <MessageBar styles={messageStyles}>
          If required for Research Purpose then Certificate for claiming
          concessional GST under notification no. 45/2017 & 47/2017: Certified
          that purchase of above goods for which concessional GST is claimed is
          required for research purpose only
        </MessageBar>
      </Stack>

      {/* <button onClick={show}>Show</button> */}

      {/**
       * Column2 of stack
       */}
      <Stack tokens={{ childrenGap: 8 }} styles={column2Styles}>
        <Dropdown
          label="GeM Purchase"
          options={options2}
          placeholder="Select an Option"
          onChange={(e, item) => setData({ ...data, GeM: item.text })}
        />
        <TextField
          label="Mention details of the item(s) if available on GeM, else mention the GeMAR & PTS ID"
          value={data.GeMDetails}
          onChange={(e) => setData({ ...data, GeMDetails: e.target.value })}
          multiline
          rows={3}
        />

        <div style={listStyles}>
          <Label style={{ "text-align": "center" }}>Proposed Committee</Label>
          <DetailsList
            items={data.members}
            columns={columnProposedCommittee}
            selection={selectionMember}
            setKey={["key1"]}
          />
        </div>
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <PrimaryButton
            text="Add Member"
            style={{
              marginLeft: "2.5%",
              width: "45%",
              backgroundColor: "#4C4A48",
              boxShadow: Depths.depth4,
            }}
            onClick={() => sethideAddMemberDialog(!hideAddMemberDialog)}
          />
          <DefaultButton
            text="Delete Selected"
            style={{ marginLeft: "5%", width: "45%", boxShadow: Depths.depth4 }}
            onClick={deleteMemberClicked}
          />
        </Stack>
        <MemberPopUp />
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <PrimaryButton
            text="Submit"
            style={{
              marginLeft: "2.5%",
              width: "45%",
              backgroundColor: "#4C4A48",
              boxShadow: Depths.depth4,
            }}
            onClick={() => setHideSubmitDialog(!hideSubmitDialog)}
          />
          <DefaultButton
            text="Preview"
            style={{ marginLeft: "5%", width: "45%", boxShadow: Depths.depth4 }}
            onClick={onPreviewClicked}
          />
        </Stack>
        <SubmitPopUp />
      </Stack>

      {/**
       * Column3 of stack
       */}
      <Stack tokens={{ childrenGap: 8 }} styles={column3Styles}>
        <TextField
          label="Recommendations of the Indenter"
          value={data.indenterRecommendations}
          onChange={(e) => setData({ ...data, indenterRecommendations: e.target.value })}
          multiline
          rows={3}
        />
        <Dropdown
          label="Mode of Enquiry"
          placeholder="Select an Option"
          options={optionsEnquiry}
          onChange={(e, item) => setData({ ...data, enquiryMode: item.text })}
        />
        <TextField
          label="Number of Quotations Received"
          value={data.numQuotations}
          onChange={(e) => setData({ ...data, numQuotations: e.target.value })}
        />
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <TextField
            label="Purchased from M/s"
            value={data.purchasedFrom}
            onChange={(e) =>setData({ ...data, purchasedFrom: e.target.value })}
            style={{ width: "50%" }}
          />
          <TextField
            label="Quotation Number"
            value={data.quotation}
            onChange={(e) => setData({ ...data, quotation: e.target.value })}
            style={{ width: "50%" }}
          />
        </Stack>
        <DatePicker
          label="Date of Purchase"
          placeholder="Select a Date"
          onSelectDate={(e) => setData({ ...data, purchaseDate: e })}
        />
        <TextField
          label="Recommended mode of Payment"
          value={data.paymentMode}
          onChange={(e) => setData({ ...data, paymentMode: e.target.value })}
          style={{ width: "50%" }}
        />
        <TextField
          label="Delivery Period"
          value={data.deliveryPeriod}
          onChange={(e) => setData({ ...data, deliveryPeriod: e.target.value })}
          style={{ width: "50%" }}
        />

        <div style={listStyles}>
          <Label style={{ "text-align": "center" }}>Items</Label>
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
            style={{ marginLeft: "5%", width: "45%", boxShadow: Depths.depth4 }}
            onClick={deleteItemClicked}
          />
        </Stack>
        <ItemPopUp />
        <MessageBar styles={messageStyles}>
          It is certified that we the undersigned purchase committee members are
          jointly and individually satisfied that the recommended items are of
          requisite specifications and quality, prices are according to the
          prevailing market rates and the supplier recommended is reliable and
          competent to supply the goods in question.
        </MessageBar>
      </Stack>
    </Stack>
  );
};

export default Sp102;
