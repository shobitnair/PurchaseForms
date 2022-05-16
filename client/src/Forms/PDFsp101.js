import React from 'react'
import jsPDF from 'jspdf';

export const PDFsp101 = (data,budgetData , meta) => {
    console.log(meta)
    var doc = new jsPDF({orientation: "p", lineHeight: 1});
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    var imgData = 'data:image/png;base64,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'

    doc.addImage(imgData,'JPEG',pageWidth/2 - 22, 2, 45, 5);
    doc.setFont('times');
    doc.setFontSize(10);
    doc.text("INDIAN INSTITUTE OF TECHNOLOGY, ROPAR",pageWidth/2,10,{align: 'center'})
    doc.line(pageWidth-20, 11, 20, 11)
    
    
    // console.log(doc.getFontList());
    doc.setFont('times','bold')
    doc.setFontSize(9);
    doc.text('SPS-101',pageWidth-31,5)
    doc.line(pageWidth-20, 5.5, pageWidth-31, 5.5)
    doc.setFontSize(10);

    doc.setFont('times','normal')
    doc.text("File No.",21,15)
    doc.text('Dated: ',pageWidth-55,15)
    var today = new Date();
    
    if(today.getMonth()+1 < 10){
       doc.text('0'+today.getMonth(),pageWidth-34,15.3);
    }
    else{
        doc.text(today.getMonth(),pageWidth-34,15.3);
    }

    doc.text(today.getDate()+'',pageWidth-42.5,15.3);
    doc.text(today.getFullYear()+'',pageWidth-28,15.3);
    doc.text('.',pageWidth-36,15.5);
    doc.text('.',pageWidth-30,15.5);
    doc.line(pageWidth-36, 16, pageWidth-45, 16);
    doc.line(pageWidth-30, 16, pageWidth-35, 16);
    doc.line(pageWidth-20, 16, pageWidth-29, 16);
    
    doc.setFont('times','bold')
    doc.text('Indent for Purchases below Rs.25000',pageWidth/2,18,{align:'center'})
    doc.line(pageWidth/2+28, 18.5, pageWidth/2-28, 18.5)
    //top horizontal line
    doc.line(pageWidth-19, 19, 19, 19)
    //leftmost vertical line
    doc.line(19, 19, 19, 134.8)
    //rightmost vertical line
    doc.line(pageWidth-19, 19, pageWidth-19, 134.8)
    //Middle vertical line
    doc.line(94, 19, 94, 70.5)

    doc.text(`Indenter's Name and Deptt.: `,21,22.5,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.name ===null ? '': data.name) +`, `+(data.department ===null ? '': data.department),97,23,{align:'left'})
    doc.line(pageWidth-19, 24, 19, 24)
    
    doc.setFont('times','bold')
    doc.text(`Budget Head & Sanctioned Budget: `,21,27.5,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.budgetHead ===null ? '': data.budgetHead+', ')+ 
    (data.budgetSanction ===null ? '': data.budgetSanction),97,27.5,{align:'left'})
    doc.line(pageWidth-19, 29, 19, 29)

    doc.setFont('times','bold')
    doc.text(`Name of the Item(Attach list in case the no of) `,21,33,{align:'left'})
    doc.text(`items are more): `,21,36,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.itemName ===null ? '': data.itemName)+'',97,33,{align:'left'})
    doc.line(pageWidth-19, 37.5, 19, 37.5)

    doc.setFont('times','bold')
    doc.text(`Approx cost: `,21,41,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.approxCost ===null ? '': data.approxCost)+'',97,41,{align:'left'})
    doc.line(pageWidth-19, 42.5, 19, 42.5)

    doc.setFont('times','bold')
    doc.text(`Category: `,21,46,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.category ===null ? '': data.category)+'',97,46,{align:'left'})
    doc.line(pageWidth-19, 47.5, 19, 47.5)

    doc.setFont('times','bold')
    doc.text(`Budgetary Approval Enclosed: `,21,51,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.BAE ===null ? '': data.BAE)+'',97,51,{align:'left'})
    doc.line(pageWidth-19, 52.5, 19, 52.5)

    doc.setFont('times','bold')
    doc.text(`Certified that the space is ready for`,21,56,{align:'left'}) 
    doc.text(`installation of the equipment in`,21,60,{align:'left'})
    doc.text(`Deptt/Centre/Unit on its arrival:-`,21,64,{align:'left'})             
    doc.setFont('times','normal')
    doc.text(``+(data.CSR ===null ? '': data.CSR),97,56,{align:'left'})
    doc.line(pageWidth-19, 65.5, 19, 65.5)

    doc.setFont('times','bold')
    doc.text(`Is Goods are required for Research Purpose: `,21,69,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.GRP ===null ? '': data.GRP)+'',97,69,{align:'left'})
    doc.line(pageWidth-19, 70.5, 19, 70.5)

    doc.setFont('times','bold')
    doc.text("If required for Research Purpose then Certificate for claiming concessional GST under notification no. 45/2017",21,74,{align: 'left'})
    doc.text("& 47/2017: ",21,78,{align:'left'})
    doc.setFont('times','normal')
    doc.text("Certified that purchase of above goods for which concessional GST is claimed is required for research", 40,78,{align: 'left'})
    doc.text("purpose only.",21,82,{align: 'left'})
    doc.line(pageWidth-19, 83.5, 19, 83.5)

    doc.setFont('times','bold')
    doc.text(`GeM Purchase: `,21,87,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.GEM ===null ? '': data.GEM)+'',97,87,{align:'left'})
    doc.line(pageWidth-19, 88.5, 19, 88.5)
    doc.line(94, 83.5, 94, 88.5)

    doc.text("*",21,92)
    doc.text("If available on GeM, specifications of the item as available on the GeM are attached. In case of non-availability of",27,92,{align:'left'})
    doc.text("the items on the GeM, GeMAR&PTS ID attached.",27,96,{align:'left'})
    doc.line(pageWidth-19, 97.5, 19, 97.5)

    // doc.setFont('times','bold')
    // doc.text(`Details of the item if available in GEM , Else mention the GeMAR & PTS ID:- `,20,98,{align:'left'})
    // doc.setFont('times','normal')
    // doc.text(data.GEMdetails+'',20,102,{align:'left', maxWidth:pageWidth - 30})
    
    doc.setFont('times','bold')
    doc.text(`Recommendations of the Indenter (If required,seperate sheet can be attached for detailed specifications): `,21,101,{align:'left'})
    doc.line(pageWidth-19, 102.5, 19, 102.5)


    // doc.setFont('times','normal')
    // doc.text(data.ROI+'',20,117,{align:'left' , maxWidth:pageWidth - 30})

    doc.setFont('times','bold')
    doc.text(`Mode of Enquiry: `,21,106,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.MOE ===null ? '': data.MOE)+'',97,106,{align:'left'})
    doc.line(pageWidth-19, 107.5, 19, 107.5)
    doc.line(94, 102.5, 94, 107.5)

    doc.setFont('times','bold')
    doc.text(`Number of Quotation(s) recieved: `,21,111,{align:'left'})
    doc.setFont('times','normal')
    doc.text((data.NOQ ===null ? '': data.NOQ)+'',97,111,{align:'left'})
    doc.line(pageWidth-19, 112.5, 19, 112.5)
    doc.line(94, 107.5, 94, 112.5)

    doc.text("The indenter recommends the purchase of the following items from",21,116)
    doc.setFont('times','bold')
    doc.text("M/s",117.5,116)
    doc.line(124, 117.5, 172, 117.5)
    doc.setFont('times','normal')
    doc.text((data.PurchasedFrom ===null ? '': data.PurchasedFrom)+'',126,116,{align:'left'})
    
    doc.text('against',174,116)
    doc.text("quotation no: ",21,121.5)
    doc.line(42, 122.5, 77, 122.5)
    doc.text((data.Qno ===null ? '': data.Qno)+'',44,121.5)

    doc.setFont('times','bold')
    doc.text("dated",79,121.5)
    doc.line(89,122.5,117,122.5)
    doc.setFont('times','normal')
    doc.text((data.DOP ===null ? '': data.DOP)+'',91,121.5)
    doc.text(".   Quotation(s) has have been signed by the", 119,121.5)
    doc.text("committee members.",21,127)
    doc.line(pageWidth-19, 128.5, 19, 128.5)
    // doc.text("")
    // doc.setFont('times','bold')
    // doc.text(`Purchased from M/s: `,20,147,{align:'left'})
    // doc.setFont('times','normal')
    // doc.text(data.PurchasedFrom+'',53,147,{align:'left'})

    // doc.setFont('times','bold')
    // doc.text(`Quotation No.: `,20,154,{align:'left'})
    // doc.setFont('times','normal')
    // doc.text(data.Qno+'',44,154,{align:'left'})

    // doc.setFont('times','bold')
    // doc.text(`Date of Purchase: `,20,161,{align:'left'})
    // doc.setFont('times','normal')
    // doc.text(data.DOP+'',48,161,{align:'left'})

    // doc.setFont('times','bold')
    // doc.text(`Required mode of payment: `,20,168,{align:'left'})
    // doc.setFont('times','normal')
    // doc.text(data.RMP+'',64,168,{align:'left'})

    // doc.setFont('times','bold')
    // doc.text(`Delivery Period: `,20,175,{align:'left'})
    // doc.setFont('times','normal')
    // doc.text(data.DP+'',46,175,{align:'left'})

    // doc.setFont('times','bold')
    // doc.text(`List of items:- `,pageWidth/2-10,182,{align:'left'})
    
    doc.setFont('times','bold')
    doc.text(`S.no`,21,133,{align:'left'})

    doc.text(`Description`,65,133,{align:'left'})
    doc.text(`Qty.`,120,133,{align:'left'})
    doc.text(`Rate(Rs.)`,135,133,{align:'left'})
    doc.text('Amt(Rs.)',165,133,{align:'left'})
    doc.setFont('times','normal')
    doc.line(pageWidth-19, 134.5, 19, 134.5)
    doc.line(30, 128.5, 30, 134.5)
    doc.line(115, 128.5, 115, 134.5)
    doc.line(130, 128.5, 130, 134.5)
    doc.line(155, 128.5, 155, 134.5)

    var ypos = 139;
    var ylinepos=134.5
    var flag=0
    var total=0,total2=0
    data.items.forEach((element,index,array)=>{
        flag=1
        doc.text(index+1+'',23,ypos,{align:'left'})
        //console.log(element.Description)
        doc.text(element.Description+'',35,ypos,{align:'left', maxWidth: 80})
        doc.text(element.Quantity+'',122,ypos,{align:'center'})
        doc.text(element.Rate+'',141,ypos,{align:'center'})
        var amtTotal=element.Quantity*element.Rate;
        total+=amtTotal
        total2+=amtTotal
        doc.text(amtTotal+'',170,ypos,{align:'center'})
        ypos+=10;
        doc.line(19, ylinepos, 19 , Math.min(ylinepos+10,pageHeight-23))
        doc.line(30, ylinepos, 30, Math.min(ylinepos+10,pageHeight-23))
        doc.line(115, ylinepos, 115, Math.min(ylinepos+10,pageHeight-23))
        doc.line(130, ylinepos, 130, Math.min(ylinepos+10,pageHeight-23))
        doc.line(155, ylinepos, 155, Math.min(ylinepos+10,pageHeight-23))
        doc.line(pageWidth-19, ylinepos, pageWidth-19 , Math.min(ylinepos+10,pageHeight-23))
        ylinepos+=10;
        if(ypos>pageHeight-23){

            doc.line(pageWidth-19, ylinepos, 19, ylinepos)
            doc.addPage();
            ypos=20;
            ylinepos=15;
            doc.line(pageWidth-19, ylinepos, 19, ylinepos)
        }
        
    })
    if(flag===0){
        doc.line(pageWidth-19, ylinepos+10, 19, ylinepos+10)
        doc.line(19, ylinepos, 19 , Math.min(ylinepos+10,pageHeight-23))
        doc.line(30, ylinepos, 30, Math.min(ylinepos+10,pageHeight-23))
        doc.line(115, ylinepos, 115, Math.min(ylinepos+10,pageHeight-23))
        doc.line(130, ylinepos, 130, Math.min(ylinepos+10,pageHeight-23))
        doc.line(155, ylinepos, 155, Math.min(ylinepos+10,pageHeight-23))
        doc.line(pageWidth-19, ylinepos, pageWidth-19 , Math.min(ylinepos+10,pageHeight-23))
        ylinepos+=10
    }
    doc.line(pageWidth-19, ylinepos, 19, ylinepos)
    doc.line(pageWidth-19, ylinepos+5, 19, ylinepos+5)
    doc.line(19,ylinepos,19,Math.min(ylinepos+10,pageHeight-23))
    doc.line(30, ylinepos, 30, Math.min(ylinepos+10,pageHeight-23))
    doc.line(155, ylinepos, 155, Math.min(ylinepos+10,pageHeight-23))
    doc.line(pageWidth-19, ylinepos, pageWidth-19 , Math.min(ylinepos+10,pageHeight-23))
    doc.line(pageWidth-19, ylinepos+10, 19, ylinepos+10)
    doc.text('Tax@__',140,ylinepos+4)
    doc.setFont('times','bold')
    doc.text('Total',144,ylinepos+9)
    doc.setFont('times','normal')
    if(data.tax!=null){
        total=total+(data.tax*total)/100;
        total.toFixed(2)
        tax.toFixed(2)
    }
    doc.text((data.tax ===null ? '': data.tax*total2/100)+'',170,ylinepos+3.5)
    doc.text((total===0? '':total)+'',170,ylinepos+8.5)
    
    doc.setFontSize(8);
    doc.text((data.tax ===null ? '': data.tax)+'%',149,ylinepos+3.5)
    
    
    ypos=ylinepos+15
    doc.setFontSize(10);
    if(pageHeight-ypos<60){
        doc.addPage();
        ypos=15
        doc.text(`"I, am personally satisfied that these goods purchased are of the requisite quality and specification and have`,22,ypos)
        ypos+=5
        doc.text(`been purchased from a reliable supplier at a reasonable price."`,22,ypos)
        ypos+=15
    }
    else if(pageHeight-ypos<30){
        doc.text(`"I, am personally satisfied that these goods purchased are of the requisite quality and specification and have`,22,ypos)
        ypos+=5
        doc.text(`been purchased from a reliable supplier at a reasonable price."`,22,ypos)
        doc.addPage();
        ypos=15
    }
    else{
        doc.text(`"I, am personally satisfied that these goods purchased are of the requisite quality and specification and have been`,22,ypos)
        ypos+=5
        doc.text(`purchased from a reliable supplier at a reasonable price."`,22,ypos)
        ypos+=15
    }
    doc.setFont("times",'bold')
    doc.text("Recommended Mode of Payment:",21,ypos,{align:'left'})
    doc.setFont("times",'normal')
    doc.text((data.RMP ===null ? '': data.RMP)+'',73,ypos,{align:'left'})
    ypos+=15
    doc.setFont("times",'bold')
    doc.text("Delivery Period:",21,ypos,{align:'left'})
    doc.setFont("times",'normal')
    doc.text((data.DP ===null ? '': data.DP)+'',47,ypos,{align:'left'})
    ypos+=15
    doc.setFont("times",'bold')
    doc.text("Signature of the Indenter",pageWidth-51,ypos,{align:'left'})
    // console.log(meta.signInt)
    doc.addImage(meta.signInt,'JPEG',pageWidth-51,ypos-20,40,10)
    ypos+=15
    doc.text("HOD/PI (for external projects only)",21,ypos,{align:'left'})
    console.log(meta.okHOD)
    if(meta.okHOD)
    {
        var text=meta.signHOD+''
        if(text.endsWith('.png'))
        {
            doc.addImage(meta.signHOD,'PNG',21,ypos-20,40,10)
        }
        else if(text.endsWith('.jpg')){
            doc.addImage(meta.signHOD,'JPG',21,ypos-20,40,10)
        }
        else if(text.endsWith('.jpeg')){
            doc.addImage(meta.signHOD,'JPEG',21,ypos-20,40,10)
        }
    }   

    if(pageHeight-ypos<=60){
        doc.addPage();
        ypos=15;
    }
   

    doc.line(19,ypos+5,pageWidth-19,ypos+5)
    doc.text("For use by Budget Section",pageWidth/2,ypos+8.5,{align:'center'})
    doc.line(pageWidth/2-20,ypos+9,pageWidth/2+20,ypos+9)
    doc.line(19,ypos+5,19,ypos+55)
    doc.line(pageWidth - 19,ypos+5,pageWidth - 19,ypos+55)
    doc.line(19,ypos+10,pageWidth-19,ypos+10)
    ypos+=10
    doc.line(19,ypos+5,pageWidth-19,ypos+5)
    doc.text("(Amount in Rs.)",pageWidth-44,ypos+4)
    ypos+=5
    doc.text("Budget Sanctioned",21,ypos+4)
    doc.setFont('times','normal')
    doc.text((budgetData.bs===null? '' :budgetData.bs)+'',80,ypos+4)
    // doc.text('lol',80,ypos+4)
    doc.line(19,ypos+5,pageWidth-19,ypos+5)
    doc.line(75,ypos,75,ypos+40)
    ypos+=5
    doc.setFont('times','bold')
    doc.text("Budget Available",21,ypos+4)
    doc.setFont('times','normal')
    doc.text((budgetData.ba===null? '' :budgetData.ba)+'',80,ypos+4)
    // doc.text('lol',80,ypos+4)
    doc.line(19,ypos+5,pageWidth-19,ypos+5)
    ypos+=5
    doc.setFont('times','bold')
    doc.text("Budget Booked",21,ypos+4)
    doc.setFont('times','normal')
    doc.text((budgetData.bb===null? '' :budgetData.bb)+'',80,ypos+4)
    // doc.text('lol',80,ypos+4)
    doc.line(19,ypos+5,pageWidth-19,ypos+5)
    doc.line(130,ypos,130,ypos+5)
    doc.line(153,ypos,153,ypos+5)
    doc.setFont('times','bold')
    doc.text("Budget Head",132,ypos+4)
    doc.setFont('times','normal')
    doc.setFontSize(8)
    doc.text((budgetData.bh===null? '' :budgetData.bh)+'',155,ypos+4)
    // doc.text('lol',155,ypos+4)
    doc.setFontSize(10)
    ypos+=5
    doc.setFont('times','bold')
    doc.text("Balance Budget",21,ypos+4)
    doc.setFont('times','normal')
    doc.text((budgetData.balb===null? '' :budgetData.balb)+'',80,ypos+4)
    // doc.text('lol',80,ypos+4)
    doc.line(19,ypos+5,pageWidth-19,ypos+5)
    doc.line(130,ypos+5,130,ypos+25)
    ypos+=5
    doc.line(19,ypos+20,pageWidth-19,ypos+20)
    doc.setFont('times','bold')
    doc.text("Accountant/JAO",21,ypos+19)
    if(meta.okJAO){
        var text=meta.signJAO+''
        if(text.endsWith('.png'))
        {
            doc.addImage(meta.signJAO,'PNG',21,ypos+3,40,10)
        }
        else if(text.endsWith('.jpg')){
            doc.addImage(meta.signJAO,'JPG',21,ypos+3,40,10)
        }
        else if(text.endsWith('.jpeg')){
            doc.addImage(meta.signJAO,'JPEG',21,ypos+3,40,10)
        }
        
    }
    doc.text("AO",100,ypos+19)

    if(meta.okAO)
    {
        var text=meta.signAO+''
        if(text.endsWith('.png'))
        {
            doc.addImage(meta.signAO,'PNG',80,ypos+3,40,10)
        }
        else if(text.endsWith('.jpg')){
            doc.addImage(meta.signAO,'JPG',80,ypos+3,40,10)
        }
        else if(text.endsWith('.jpeg')){
            doc.addImage(meta.signAO,'JPEG',80,ypos+3,40,10)
        }
    }

    doc.text("AR/JR/DR, Accounts",pageWidth-55,ypos+19)
    if(meta.okAR)
    {
        var text=meta.signAR+''
        if(text.endsWith('.png'))
        {
            doc.addImage(meta.signAR,'PNG',pageWidth-70,ypos+3,40,10)
        }
        else if(text.endsWith('.jpg')){
            doc.addImage(meta.signAR,'JPG',pageWidth-70,ypos+3,40,10)
        }
        else if(text.endsWith('.jpeg')){
            doc.addImage(meta.signAR,'JPEG',pageWidth-70,ypos+3,40,10)
        }
    }

    doc.addPage()

    doc.setFont('times','bold')
    doc.text("For use by the Purchase Section",pageWidth/2,13,{align:'center'})
    doc.line(pageWidth/2-24,13.5,pageWidth/2+24,13.5)

    doc.setFont('times','normal')
    doc.text("Quotation signed by all the committee members. Calculations indicated above have been checked and found in order.",23,20,{maxWidth: pageWidth - 37})
    doc.text("Purchase proposal (Page no.______to_______) is in order. The Competent Financial Authority (CFA) may kindly",23,26,{maxWidth: pageWidth - 37})
    doc.text("accord financial sanction to the extent of Rs. ________________(Rupees _____________________________only)",23,32,{maxWidth: pageWidth - 37})
    doc.text("for the above purchase.",23,38,{maxWidth: pageWidth - 37})


    doc.setFont('times','bold')
    doc.text('J.S./Supdt (P)',23,60)
    doc.text('AR/DR/JR',pageWidth-39,60)
    doc.text('Recommended/Not Recommended',23,70)
    doc.text('Approved/Not Approved',pageWidth-60,70)

    doc.text('REGISTRAR',23,100)
    doc.text('HOD',pageWidth-31,100)


    doc.text("Instructions",pageWidth/2,110,{align:'center'})

    doc.setFont('times','normal')
    
    doc.setFontSize(10)
    doc.text(`1. The Purchase committees may be constituted as per Store and Purchase manual's Rule No. 7 before initializing the `,23,125,{maxWidth: pageWidth - 37})
    doc.text("purchase in order to effect this purchase. The relevant provision for constitution committee can be assessed at Store and ",23,130,{maxWidth: pageWidth - 37})
    doc.text('Purchase website: ',23,135)
    doc.setTextColor(0,0,255)
    doc.setDrawColor(0,0,255)
    doc.textWithLink('www.iitrpr.ac.in',50,135,{url: 'www.iitrpr.ac.in'})
    doc.line(50,135.4,73,135.4)
    doc.setDrawColor(0,0,0)
    doc.setTextColor(0,0,0)
    

    doc.text(`2. As per this Office Memorandum No.F.1/26//2018-PPD dated.02.04.2019 received from the Ministry of Finance,`,23,150,{maxWidth: pageWidth - 37})
    doc.text("Department of Expenditure, Procurement Policy Division that Common Use Goods and Services are to be procured ",23,155,{maxWidth: pageWidth - 37})
    doc.text('mandatorily through GeM as per GFR Rule 147 & 149 and institute office order No.1412-19/ADMN-GeM/PS/487',23,160)
    doc.text("dt.05.02.2020.",23,165)

    doc.text(`3. The procurement of the second laptop from the Department Fund subject to the circular no. Reg-1/2018/IITRPR/167`,23,180,{maxWidth: pageWidth - 37})
    doc.text("dated 31.08.2018. As per circular, the faculty member can procure second laptop only after four years of first procurement ",23,185,{maxWidth: pageWidth - 37})
    doc.text("irrespective of the source of funding like institute/CPDA. This will not be applicable on the procurement of laptops from",23,190,{maxWidth: pageWidth - 37})
    doc.text("the projects.",23,195,{maxWidth: pageWidth - 37})

    doc.text(`4. All the purchases of furniture should be done through Store and Purchase Section as per the circular no. 752 dated `,23,210,{maxWidth: pageWidth - 37})
    doc.text("17.02.2020.",23,215,{maxWidth: pageWidth - 37})

    doc.addPage();
    doc.setFont('times','bold')
    doc.setFontSize(16)
    doc.text("GEM details or GeMAR & PTS ID",pageWidth/2-40,15)
    doc.line(pageWidth/2-40,15.7,pageWidth/2+43,15.7)
    doc.setFontSize(12)
    doc.setFont('times','normal')
    doc.text((data.GEMdetails===null?'':data.GEMdetails)+'',21,30,{maxWidth:pageWidth-40})

    doc.setFont('times','bold')
    doc.setFontSize(16)
    doc.text("Recommendations of the Indenter",pageWidth/2-40,pageHeight/2)
    doc.line(pageWidth/2-40,pageHeight/2+0.7,pageWidth/2+43,pageHeight/2+0.7)
    doc.setFontSize(12)
    doc.setFont('times','normal')
    doc.text((data.ROI===null?'':data.ROI)+'',21,pageHeight/2+15,{maxWidth:pageWidth-40})

    window.open(doc.output('bloburl'))
}