## Deploying new versions

- Build new cms and builder docker images
- Push images to ECR with incremented versions
- Generate a token and update a docker-registery secret on kubernetes cluster
- Bump image versions in kubernetes files
- apply new cms and builder images 