import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CartItem } from "../entities/CartItem";
import { AuthService } from "./security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(private authService: AuthService) { }

  generatePDF(cartItems: CartItem[], department: string, departmentAddress: string): void {
    // Set up pdfmake fonts
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const username = this.authService.fullName;
    const userId = this.authService.userId;
    const enterprise = "LaboControl";
    const currentDate = new Date().toLocaleDateString();

    let totalAmount = 0;

    const cartContent = cartItems.map(item => {
      const itemTotal = item.product.price * item.quantity;
      totalAmount += itemTotal;
      return [
        { text: item.product.name, alignment: 'left' },
        { text: `${item.product.price} DH`, alignment: 'right' },
        { text: `${item.quantity}`, alignment: 'right' },
        { text: `${itemTotal} DH`, alignment: 'right' }
      ];
    });

    const docDefinition: any = {
      content: [
        { text: enterprise, style: 'enterprise' },
        { text: 'REÇU D\'ACHAT', style: 'title' },
        { text: `Date: ${currentDate}`, alignment: 'right' },
        { text: `Client: ${username}`, alignment: 'right' },
        { text: `Client ID: ${userId}`, alignment: 'right' },
        { text: ' ', margin: [0, 10] },

        { text: 'Agence:', style: 'header' },
        { text: department, margin: [0, 0, 0, 10] },
        { text: 'Adresse:', style: 'header' },
        { text: departmentAddress, margin: [0, 0, 0, 10] },

        { text: 'Produits:', style: 'header' },

        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Nom', style: 'tableHeader' },
                { text: 'Prix', style: 'tableHeader', alignment: 'right' },
                { text: 'Quantité', style: 'tableHeader', alignment: 'right' },
                { text: 'Total', style: 'tableHeader', alignment: 'right' }
              ],
              ...cartContent,
              [
                { text: 'Total Général', colSpan: 3, alignment: 'right', bold: true }, {}, {},
                { text: `${totalAmount} DH`, alignment: 'right', bold: true }
              ]
            ]
          }
        },
        { text: ' ', margin: [0, 10] },
        { text: 'Merci pour votre achat!', style: 'footer', alignment: 'center' }
      ],
      styles: {
        enterprise: {
          bold: true,
          fontSize: 16,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        title: {
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        header: {
          bold: true,
          fontSize: 14,
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        },
        footer: {
          italics: true,
          fontSize: 12,
          margin: [0, 10, 0, 0]
        }
      }
    };

    // Create the PDF document
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    // Open the PDF in a new window
    pdfDocGenerator.open();
  }

}
