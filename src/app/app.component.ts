import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
declare var $: any; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Password Manager';
  passwordFieldType: string = 'password';

  newItem = {
    website: '',
    password: '',
    passwordFieldType: 'password'
    
  };
  


  data: { website: string; password: string; passwordFieldType: string }[] = [ ];
  constructor(private router: Router) {}


  ngOnInit() {
    const savedData = localStorage.getItem('passwords');
    if (savedData) {
      this.data = JSON.parse(savedData); // Convert JSON string back to an array
    }
  }
  
  dialogService: any;
  isModalOpen = false; // Modal visibility state
  selectedIndex: number | null = null;
  searchTerm: string = ''; 


  togglPassword(index: String) {
    this.newItem.passwordFieldType = index === 'password' ? 'text' : 'password'; 
  }

  togglePassword(index: number) {
    
    const item = this.data[index];
    item.passwordFieldType = item.passwordFieldType === 'password' ? 'text' : 'password'; 
  }

 


  // addData() {
  //   if (this.newItem.website && this.newItem.password) {
  //     this.data.push({ ...this.newItem });
  //     this.newItem = { website: '', password: '', passwordFieldType: 'password' };
  //   }
  // }

  addData() {
    if (this.newItem.website && this.newItem.password) {
      this.data.push({ ...this.newItem });
      this.saveToLocalStorage(); // Save updated data to LocalStorage
      this.newItem = { website: '', password: '', passwordFieldType: 'password' };
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('passwords', JSON.stringify(this.data));
  }



  updatePassword(index: number) {
    console.log(`Update password for ${this.data[index].website}`);

  }

  // deletePassword(index: number) {
  
  //       this.data.splice(index, 1);
  //     }

  // deletePassword(index: number) {
  //   this.data.splice(index, 1);
  //   localStorage.removeItem('passwords');
  //   this.saveToLocalStorage(); // Update LocalStorage after deletion
  // }

  // deletePassword(index: number) {
  //   console.log('Attempting to delete item at index:', index);
  
  //   // Get current data from LocalStorage
  //   const savedData = localStorage.getItem('passwords');
  //   console.log('Data from LocalStorage before deletion:', savedData);
  
  //   if (savedData) {
  //     let passwords = JSON.parse(savedData);
  
  //     if (index >= 0 && index < passwords.length) {
  //       passwords.splice(index, 1); // Remove item at given index
  //       console.log('Updated passwords array:', passwords);
  
  //       localStorage.setItem('passwords', JSON.stringify(passwords)); // Save updated data
  //       this.data = passwords; // Update UI
  //       console.log('Data successfully deleted.');
  //     } else {
  //       console.log('Invalid index:', index);
  //     }
  //   }
  // }
  



      openDeleteModal(index: number) {
        this.selectedIndex = index;
        this.isModalOpen = true; // Open the modal
      }
    
      closeModal() {
        this.isModalOpen = false; // Close the modal
      }
    
      confirmDelete() {
        if (this.selectedIndex !== null) {
          this.data.splice(this.selectedIndex, 1);
          this.selectedIndex = null;
          this.isModalOpen = false; // Close modal after deletion
          localStorage.removeItem('passwords');
          this.saveToLocalStorage();
        }       
}
      // filteredData() {
      //   return this.data.filter(item => 
      //     item.website.toLowerCase().includes(this.searchTerm.toLowerCase())
      //   );
      // }

      filteredData() {
        if (this.searchTerm) {
          this.data = this.data.filter(item => 
            item.website.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        } else {
          this.data = [...this.data];
        }
    }

    logout() {
      localStorage.removeItem('isAuthenticated');
      this.router.navigate(['/login']); // ✅ Redirect to login page
    }
    
  }