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
  initializeIcons
} from '@fluentui/react';

initializeIcons();
const stackTokens = { childrenGap: 50 };
const stackStyles = { root: { width: "100%" } };
const columnProps = {
  tokens: { childrenGap: 8 },
  styles: { root: { width: "100%", padding: "20px" } },
};
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Add Items to the List',
};
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
    MOE: null,
    ROI: null,
    NOQ: null,
    PurchasedFrom: null,
    DOP: null,
    Qno: null,
    RMP: null,
    DP: null,
  };
  const [data, setData] = useState(init);
  const [flag, setFlag] = useState(0);


  const onSubmit = () => {
    const isEmpty = Object.values(data).some(x => x === [] || x === null || x === '');
    if (isEmpty) {
      window.alert('Fill in all the details');
      console.log(data);
    }
    else {
      window.alert('Submitted', data);
    }
  };
  
  const addItem = () => {
    let Description = document.getElementById("Description").value;
    let Quantity = document.getElementById("Quantity").value;
    let Rate = document.getElementById("Rate").value;
    setData({ ...data, items: [...data.items, { Description, Quantity, Rate }] });
    setToggle(true);
  };

  const _columns = [{ key: 'column1', name: 'Description', fieldName: 'Description', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Quantity', fieldName: 'Quantity', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column3', name: 'Rate', fieldName: 'Rate', minWidth: 100, maxWidth: 200, isResizable: true }];


  const [selection, setSelection] = useState(new Selection());
  const [toggle, setToggle] = useState(true);

  const handleDelete = () => {
    setData({ ...data, items: data.items.filter(x => !selection.getSelection().includes(x)) });
  };
  const formatDate = (date) => {
    if (!date)
      return '';
    const month = date.getMonth() + 1; // + 1 because 0 indicates the first Month of the Year.
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (flag === 0) {

      setFlag(flag => flag + 1);
    }
    else {
    }
  }, []);

  return (
    <div>

      <Dialog
        hidden={toggle}
        onDismiss={() => setToggle(false)}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <TextField id="Description" label="Item Description" />
        <TextField id="Quantity" label="Quantity" />
        <TextField id="Rate" label="Rate" />
        <DialogFooter>
          <PrimaryButton onClick={addItem} text="Add" />
          <DefaultButton onClick={() => setToggle(true)} text="Cancel" />
        </DialogFooter>
      </Dialog>


      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps} style={{ 'backgroundColor': '#EFF6FC' }}>
          <TextField label="Name" value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })} />
          <TextField label="Department" value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })} />
          <Stack horizontal tokens={stackTokens}>
            <TextField label="Budget Head" value = {data.budgetHead}
              onChange={(e) => setData({ ...data, budgetHead: e.target.value })} />
            <TextField label="Sanctioned Budget" value={data.budgetSanction}
              onChange={(e) => setData({ ...data, budgetSanction: e.target.value })} />
          </Stack>
          <Stack horizontal tokens={stackTokens}>
            <TextField label="Item Name" 
              placeholder="write 'MANY' if > 1"
              onChange={(e) => setData({ ...data, itemName: e.target.value })} />
            <TextField label="Approximate Cost"
            onChange={(e) => setData({ ...data, approxCost: e.target.value })} />
          </Stack>
          <Label>Category</Label>
          <Dropdown placeholder="Select an Option" options={option4} 
            onChange={(e, i) => setData({ ...data, category: i.text })} />
          <Dropdown placeholder="Select an Option" options={option1} label="Budgetary Approval Enclosed"
            onChange={(e, i) => setData({ ...data, BAE: i.text })} />
          <Dropdown placeholder="Select an Option" options={option2}
            label="Certified that the space is ready for installation of the equipment on its arrival"
            onChange={(e, i) => setData({ ...data, CSR: i.text })} />
          <Dropdown placeholder="Select an Option" options={option1} label="Are the goods   for Research Purpose"
            onChange={(e, i) => setData({ ...data, GRP: i.text })} />
          <Dropdown placeholder="Select an Option" options={option1} label="GEM Purchase"
            onChange={(e, i) => setData({ ...data, GEM: i.text })} />
          <Dropdown placeholder="Select an Option" options={option3} label="Mode of Enquiry"
            onChange={(e, i) => setData({ ...data, MOE: i.text })} />
        </Stack>


        <Stack {...columnProps} style={{ 'backgroundColor': '#EFF6FC' }}>
          <TextField label="Recommendations of the Indenter " multiline rows={5}
            onChange={(e) => setData({ ...data, ROI: e.target.value })} />
          <TextField label="Number of Quotations Received"
            onChange={(e) => setData({ ...data, NOQ: e.target.value })} />
          <TextField label="Purchased from M/s"
            onChange={(e) => setData({ ...data, PurchasedFrom: e.target.value })} />
          <DatePicker
            placeholder="Select a date"
            label="Date of purchase"
            onSelectDate={(e) => setData({ ...data, DOP: formatDate(e) })} />
          <TextField label="Quotation Number"
            onChange={(e) => setData({ ...data, Qno: e.target.value })} />
          <TextField label="Required mode of payment"
            onChange={(e) => setData({ ...data, RMP: e.target.value })} />
          <TextField label="Delivery Period"
            onChange={(e) => setData({ ...data, DP: e.target.value })} />
        </Stack>


        <Stack {...columnProps} style={{ 'backgroundColor': '#EFF6FC' }}>
          <Label>Added Items</Label>
          <div style={{ 'height': '400px', 'overflow': 'scroll' }}>
            <DetailsList

              items={data.items}
              columns={_columns}
              selection={selection}
              setKey={["key"]}
            >
            </DetailsList>
          </div>
          <Label />
          <Stack horizontal>
            <PrimaryButton style={{ 'marginLeft': '2.5%', 'width': '45%', /*'backgroundColor':'#252423'*/ }} onClick={() => { setToggle(!toggle); }}
              text="Add Items  "> </PrimaryButton>
            <DefaultButton style={{ 'marginLeft': '5%', 'width': '45%', }} text="Delete Selected" onClick={handleDelete} />
          </Stack>
          <Stack horizontal>
            <PrimaryButton style={{ 'marginLeft': '2.5%', 'width': '45%', /*'backgroundColor':'#6264A7'*/ }} text="Submit" onClick={onSubmit} />
            <DefaultButton style={{ 'marginLeft': '5%', 'width': '45%' }} text="Reset" onClick={() => setData(init)} />
          </Stack>

          
        </Stack>
      </Stack>


    </div>
  );

};
export default Sp101;
