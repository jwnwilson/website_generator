
## ToDo

- Setup new cluster domain jwnwilson-kube.co.uk
- Setup static S3 bucket + cloudfront for deployed site
- Add restricted service account to cluster / env vars
- Test deployment cluster -> S3
- Fix static site

- Setup multi-site deployment:
  - New cms -> database per site
  - Set S3 bucket settings in env vars
  - new site will require:
    - New cms container with new env vars
    - New DB env vars
    - New S3 bucket env vars
    - New S3 bucket terraform settings

- Setup sentry on client