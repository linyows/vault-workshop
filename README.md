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

$ consul members
$ vault operator init
$ vault operator unseal
$ vaullt login

$ docker exec -it vault-workshop_vault_1 supervisorctl status
```
