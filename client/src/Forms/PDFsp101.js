import React from 'react'
import jsPDF from 'jspdf';

export const PDFsp101 = (data) => {
    var doc = new jsPDF({orientation: "p", lineHeight: 1});
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    //doc.text(init.name,10,10);
    doc.setFont('times');
    doc.setFontSize(10);
    doc.text("INDIAN INSTITUTE OF TECHNOLOGY, ROPAR",pageWidth/2,10,{align: 'center'})
    doc.line(pageWidth-20, 11, 20, 11)
    
    
    // console.log(doc.getFontList());
    doc.setFont('times','bold')
    doc.text('SPS101',pageWidth-31,10)

    doc.text('Indent for Purchases below Rs.25000',pageWidth/2,17,{align:'center'})
    doc.line(pageWidth/2+28, 17.5, pageWidth/2-28, 17.5)
    
    doc.text(`Date: `,pageWidth-50,22)
    var today = new Date();
    var todDateStr = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    doc.text(todDateStr,pageWidth-40,22)

    doc.text(`Indenter's Name and Department: `,20,25,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.name+`, `+data.department,73,25,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Budget Head & Sanctioned Budget: `,20,32,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.budgetHead+`, `+data.budgetSanction,75,32,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Name of Item(Attach list if items>1): `,20,39,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.itemName+'',77,39,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Approx cost: `,20,46,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.approxCost+'',41,46,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Category: `,20,53,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.category+'',37,53,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Budgetary Approval Enclosed: `,20,60,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.BAE+'',68,60,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Certified that the space is ready for`,20,67,{align:'left'}) 
    doc.text(`Installation of the equipment in`,20,71,{align:'left'})
    doc.text(`Deptt/Centre/Unit on its arrival`,20,75,{align:'left'})             
    doc.setFont('times','normal')
    doc.text(`: `+data.CSR,77,72,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Is Goods are required for Research Purpose: `,20,84,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.GRP+'',89,84,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`GeM Purchase: `,20,91,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.GEM+'',45,91,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Details of the item if available in GEM , Else mention the GeMAR & PTS ID:- `,20,98,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.GEMdetails+'',20,102,{align:'left', maxWidth:pageWidth - 30})
    
    doc.setFont('times','bold')
    doc.text(`Recommendations of the Indenter:- `,20,113,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.ROI+'',20,117,{align:'left' , maxWidth:pageWidth - 30})

    doc.setFont('times','bold')
    doc.text(`Mode of Enquiry: `,20,133,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.MOE+'',48,133,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Number of Quotations recieved: `,20,140,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.NOQ+'',69,140,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Purchased from M/s: `,20,147,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.PurchasedFrom+'',53,147,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Quotation No.: `,20,154,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.Qno+'',44,154,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Date of Purchase: `,20,161,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.DOP+'',48,161,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Required mode of payment: `,20,168,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.RMP+'',64,168,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`Delivery Period: `,20,175,{align:'left'})
    doc.setFont('times','normal')
    doc.text(data.DP+'',46,175,{align:'left'})

    doc.setFont('times','bold')
    doc.text(`List of items:- `,pageWidth/2-10,182,{align:'left'})
    
    doc.text(`S.no`,25,187,{align:'left'})
    doc.text(`Description`,40,187,{align:'left'})
    doc.text(`Quantity`,130,187,{align:'left'})
    doc.text(`Rate`,170,187,{align:'left'})
    doc.setFont('times','normal')
    var ypos = 193;
    data.items.forEach((element,index,array)=>{
        
        doc.text(index+1+'',26,ypos,{align:'left'})
        //console.log(element.Description)
        doc.text(element.Description+'',40,ypos,{align:'left', maxWidth: 80})
        doc.text(element.Quantity+'',132,ypos,{align:'left'})
        doc.text(element.Rate+'',171,ypos,{align:'left'})
        ypos+=13;
        if(ypos>pageHeight-23){
            doc.addPage();
            ypos=10;
        }
    })

    // doc.text(data.items,20,183,{align:'left'})

    doc.save("SPS101.pdf");
}