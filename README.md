
## ToDo

- Add draft / publish / archive to content-types
- If content moved to published state cron job will publish the new site
- Setup auto deployment of static content
- Setup an AWS service account to push to S3 bucket
- Add builder to cluster
- Connect builder -> cms
- Add deploy button to cms



- Setup sentry on client


## Deploying new versions

- Build new cms and builder docker images
- Push images to ECR with incremented versions
- Generate a token and update a docker-registery secret on kubernetes cluster
- Bump image versions in kubernetes files
- apply new cms and builder images 