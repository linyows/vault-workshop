path "pki/*" {
  capabilities = [ "create", "read", "update", "delete", "list" ]
}

path "auth/token/*" {
  capabilities = [ "create", "read", "update", "delete", "list" ]
}

path "sys/policy/*" {
  capabilities = [ "create", "read", "update", "delete", "list" ]
}

path "sys/auth/*" {
  capabilities = [ "create", "read", "update", "delete", "sudo" ]
}

# path "transit/*" {
#   capabilities = [ "create", "read", "update", "delete", "list" ]
# }
