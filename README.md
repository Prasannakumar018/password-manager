# PasswordManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.





































# Password Manager Deployment with Angular & Terraform on Azure

## **📌 Project Overview**
This project is a **Password Manager** built using **Angular** and deployed on **Azure Static Web Apps** using **Terraform** for infrastructure automation. Authentication is enabled via **Azure Active Directory (Azure AD)** to restrict access to authorized users.

---

## **📂 Project Structure**
```
📂 angular-password-manager/
│
├── 📂 password-manager/          # Angular App
│   ├── 📂 src/
│   │   ├── 📂 app/
│   │   │   ├── 📂 auth/          # Authentication logic
│   │   │   │   ├── auth.guard.ts    # Protects routes
│   │   │   │   ├── auth.service.ts  # Handles Azure AD authentication
│   │   │   │
│   │   │   ├── 📂 components/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │
│   │   │   ├── app.module.ts       # Main Angular module
│   │   │   ├── app-routing.module.ts # Routing configuration
│   │   │
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   ├── environment.prod.ts
│   │   │
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── styles.css
│   │
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
│
├── 📂 terraform/                  # Terraform Configuration
│   ├── main.tf                     # Defines Azure infrastructure
│   ├── variables.tf                 # Stores variables for Terraform
│   ├── outputs.tf                   # Prints important values after deployment
│   ├── routes.json                   # Access control for authentication
│   ├── README.md
│
├── .gitignore
├── README.md
```

---

## **🚀 Step-by-Step Setup Guide**

### **1️⃣ Prerequisites**
Before starting, ensure you have:
- **Azure Account** (already created)
- **Terraform Installed** (`brew install terraform` on macOS)
- **Azure CLI Installed** (`brew install azure-cli`)
- **Node.js & Angular CLI** installed (`npm install -g @angular/cli`)

---

### **2️⃣ Set Up Azure Authentication**
#### **Step 1: Login to Azure**
Run the following command in your terminal:
```sh
az login
```
This will open a browser to authenticate with Azure.

#### **Step 2: Set Subscription (If Needed)**
```sh
az account set --subscription "<YOUR_SUBSCRIPTION_ID>"
```
Find your Subscription ID using:
```sh
az account list --output table
```

---

### **3️⃣ Deploy Angular App to GitHub Pages**
```sh
cd password-manager
ng build --output-path docs --base-href /password-manager/
gh-pages -d docs
```
This will deploy your Angular app to GitHub Pages.

---

### **4️⃣ Configure Terraform for Azure**
#### **Step 1: Initialize Terraform**
```sh
cd terraform
terraform init
```
#### **Step 2: Create Terraform Plan**
```sh
terraform plan
```
#### **Step 3: Deploy Infrastructure**
```sh
terraform apply -auto-approve
```
Terraform will create:
- **Azure Static Web App** (for Angular frontend)
- **Azure AD Authentication**
- **Networking & Security Policies**

---

### **5️⃣ Set Up Authentication with Azure AD**
1. Go to **Azure Portal** → **Azure Active Directory** → **App Registrations**
2. Create a new app registration
3. Note **Application (client) ID** and **Directory (tenant) ID**
4. Update `auth.service.ts` in your Angular app:
```typescript
export const msalConfig: Configuration = {
  auth: {
    clientId: '<YOUR_CLIENT_ID>',
    authority: 'https://login.microsoftonline.com/<YOUR_TENANT_ID>',
    redirectUri: 'https://your-app.azurestaticapps.net/',
  },
};
```

---

### **6️⃣ Apply Access Restrictions**
Modify `routes.json` in `terraform/` to restrict access:
```json
{
  "routes": [
    {
      "route": "/dashboard",
      "allowedRoles": ["authenticated"]
    }
  ]
}
```
Run Terraform again:
```sh
terraform apply -auto-approve
```

---

### **7️⃣ Verify Deployment**
Find the deployed URL by running:
```sh
echo $(terraform output website_url)
```
Open the URL in a browser, and **login via Azure AD**.

---

## **🎯 Conclusion**
You have now successfully:
✅ **Built & Deployed an Angular Password Manager**
✅ **Secured it with Azure Active Directory Authentication**
✅ **Automated Infrastructure using Terraform**

---

### **💡 Next Steps**
- **Enhance Security** by adding role-based access control (RBAC).
- **Enable CI/CD** for automatic deployments.
- **Add Key Vault** to store sensitive credentials securely.

🚀 **Happy Coding!**

