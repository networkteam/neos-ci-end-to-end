# neos-ci-end-to-end

Boilerplate for a monorepo with Neos CMS and end-to-end CI using GitLab.

## Development setup

- `asdf install`
- `yarn install`

## One-time setup for Kubernetes

- Create namespace
- Create secret for basic auth:
  - `htpasswd -c auth neos-demo` (and enter password)
  - `kubectl -n dev-neos-ci create secret generic basic-auth --from-file=auth`
