# neos-ci-end-to-end

Boilerplate for a monorepo with Neos CMS and end-to-end CI using GitLab.

## Development

### Requirements

- [asdf](https://github.com/asdf-vm/asdf) with PHP and Node.js plugins
- Docker-Compose

### Initial setup

- `asdf install`
- `yarn install`
- `yarn neos:init`

### Start development server

- `yarn neos:dev`

## Deployment

### One-time setup for Kubernetes deployments

- Create namespace `dev-neos-ci`
- Create secret for basic auth:
  - `htpasswd -c auth neos-demo` (and enter password)
  - `kubectl -n dev-neos-ci create secret generic basic-auth --from-file=auth`
