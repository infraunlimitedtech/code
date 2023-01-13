# managed infra code repositories
Managed by pulumi (TS)

## Current managed resources:

- groups in gitlab
- repositories in gitlab
- mirrored repository in github

## Configuration
- Any configuration values and environment variables for [Github](https://www.pulumi.com/registry/packages/github/) and [Gitlab](https://www.pulumi.com/registry/packages/gitlab)
- `mirrorToken`: api token for Github replication user which has rights to create new repositories and push. Used in mirroring Gitlab ---> Gtihub

## Manual usage
Pulumi uses Hashicorp Vault secret backend. `VAULT_ADDR` and `VAULT_TOKEN` env needed.

```
$ yarn install
$ export VAULT_ADDR=https://<vault-addr>>
$ export VAULT_TOKEN=<<vault-token>>
$ pulumi up -yf
```
