import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PdfService } from "../../../services/pdf.service";
import { CartItem } from "../../../entities/CartItem";
import { CartService } from "../../../services/cart/cart.service";
import { AuthService } from "../../../services/security/auth.service";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-department-modal',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './department-modal.component.html',
  styleUrl: './department-modal.component.css'
})
export class DepartmentModalComponent {
  selectedDepartment: string = '';
  selectedDepartmentAddress: string = ''; // Added property for selected department address

  departments = [
    { value: 'TANGER', label: 'TANGER', address: '171 Rue Tetouan Mechlaoua Gch' },
    { value: 'FES', label: 'FES', address: '12 COP Idrissia (près de Kitéa Géant)' },
    { value: 'TAZA', label: 'TAZA', address: '240 lot Al Montazah Taza Nouveau Route Oujda' },
    { value: 'RABAT', label: 'RABAT', address: 'Zerdal El Gharbia N° Ac 96 Bouknadel Salé' },
    { value: 'EL JADIDA', label: 'EL JADIDA', address: 'Essalam 239 Hay Essalam El Jadida' },
    { value: 'BENI MELLAL', label: 'BENI MELLAL', address: 'N° 180 Lot. Riad Salam Beni Mellal' },
    { value: 'MARRAKECH', label: 'MARRAKECH', address: '159 Lot. Al Massar Marrakech' },
    { value: 'OUARZAZATE', label: 'OUARZAZATE', address: 'Rue 516 Hay El Massira Laâyoune' },
    { value: 'AGADIR', label: 'AGADIR', address: 'N° 42 Lot. Tissir Rdc Ait Melloul Agadir' },
    { value: 'LAAYOUNE', label: 'LAAYOUNE', address: 'Hay Amal 2 N° 273 Laâyoune' }
  ];

  constructor(private pdfService: PdfService,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router,
              public activeModal: NgbActiveModal

  ) { }

  onDepartmentChange(event: any): void {
    this.selectedDepartment = event.target.value;
    // Fetch the address of the selected department
    this.selectedDepartmentAddress = this.getDepartmentAddress(this.selectedDepartment);
    console.log('Selected department:', this.selectedDepartment);
    console.log('Selected department address:', this.selectedDepartmentAddress);
  }

  generatePDF(): void {

    if (!this.selectedDepartment || !this.selectedDepartmentAddress) {
      console.error('Please select a department before generating PDF.');
      return;
    }

    this.cartService.getCartItemsForUser(this.authService.userId).subscribe((cartItems: CartItem[]) => {
      this.pdfService.generatePDF(cartItems, this.selectedDepartment, this.selectedDepartmentAddress);
    });
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Dismiss the modal
  }
  // Function to retrieve the address of the selected department
  private getDepartmentAddress(department: string): string {
    // Find the department object in the departments array
    const selectedDepartment = this.departments.find(dep => dep.value === department);
    return selectedDepartment ? selectedDepartment.address : '';
  }
}
