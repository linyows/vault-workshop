Vault Workshop
==============

This repository for Hashicorp Vault Workshop.

```sh
$ brew install consul vault
$ docker-compose build
$ docker-compose up -d

$ export CONSUL_HTTP_ADDR=localhost:8500
$ export VAULT_SKIP_VERIFY=true
$ export VAULT_ADDR=https://localhost:8200

# Init & Unseal
$ consul members
$ vault operator init
$ vault operator unseal
$ vaullt login

# PKI Secrets
$ vault secrets enable -description="root ca" pki
$ vault secrets tune -max-lease-ttl=87600h pki/
$ vault write pki/root/generate/internal common_name=service.consul ttl=8760h
$ vault write pki/config/urls issuing_certificates="https://vault.service.consul:8200/v1/pki/ca" \
  crl_distribution_points="https://vault.service.consul:8200/v1/pki/crl"
$ vault write pki/roles/service-dot-consul allowed_domains=service.consul allow_subdomains=true max_ttl=72h

# Consul Template
$ docker exec -it vault-workshop_vault_1 curl https://vault.service.consul:8200/v1/
$ docker exec -it vault-workshop_vault_1 supervisorctl status
$ docker exec -it vault-workshop_vault_1 vault login
$ docker exec -it vault-workshop_vault_1 supervisorctl start consul-template
$ docker exec -it vault-workshop_vault_1 curl https://vault.service.consul:8200/v1/

# Database Secrets
$ vault secrets enable -description "mysql database" database
$ vault write database/config/mysql-database plugin_name=mysql-database-plugin \
  connection_url="{{username}}:{{password}}@tcp(mysql.node.consul:3306)/" \
  allowed_roles="express" username="root" password="secret"
$ vault write database/roles/express db_name=mysql-database default_ttl="1h" max_ttl="24h" \
  creation_statements="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}';GRANT ALL ON *.* TO '{{name}}'@'%';"

# Transit Secrets
$ vault secrets enable -description "express transit" transit
$ vault write -f transit/keys/express_users_email convergent_encryption=true derived=true
$ docker exec -it vault-workshop_express_1 echo '' > /root/.vault-token
$ docker exec -it vault-workshop_vault_1 supervisorctl start consul-template
$ docker exec -it vault-workshop_express_1 cat .env
$ docker exec -it vault-workshop_vault_1 supervisorctl start express
```
