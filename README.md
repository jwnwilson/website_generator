
## ToDo

- Push cms & postgres to cluster
- Setup jwnwilson.co.uk/cms -> cms
- Push client to cluster
- Setup jwnwilson.co.uk/ -> client
- Connect client -> cms
- Push builder to clister
- Connect builder -> cms
- Setup auto deployment of static content
- Setup a secure login

## Deploying new versions

- Build new cms and builder docker images
- Push images to ECR with incremented versions
- Generate a token and update a docker-registery secret on kubernetes cluster
- Bump image versions in kubernetes files
- apply new cms and builder images 