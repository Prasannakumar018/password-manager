provider "azurerm" {
  features {}
}

resource "azurerm_static_site" "password_manager" {
  name                = "password-manager-site"
  location            = "West Europe"
  resource_group_name = "MyResourceGroup"
}

output "website_url" {
  value = azurerm_static_site.password_manager.default_host_name
}
