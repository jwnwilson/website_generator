
## ToDo

- Setup image download -> S3 hosting

- Add testing to CMS
- Add testing to Client

- Setup multi-site deployment:
  - New cms -> database per site
  - Set S3 bucket settings in env vars
  - new site will require:
    - New cms container with new env vars
    - New DB env vars
    - New S3 bucket env vars
    - New S3 bucket terraform settings

- Setup sentry on client