# little-bobby-tables


# ACR
URL
    littlebobbytables.azurecr.io
Anwendungsimage
    littlebobbytables.azurecr.io/doc22/application_frontend
    ...
before you can use ACR you need to run docker login

# Docker
### Login
    docker login littlebobbytables.azurecr.io # you will be promted to enter username and password
use credentials from azure, username is: littlebobbytables

use the password from azure

### Pull

```
sudo docker pull littlebobbytables.azurecr.io/doc22/application_api
```


# Terraform
```
terraform init
az login
terraform plan
terraform apply
```

# CI pipeline
just push to verify
