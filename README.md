
## ToDo

- Set portfolio as pop up only
- Add SEO meta tags to my site
- Store S3 in same S3 bucket as site to reduce buckets and CDN
- Setup image versioning

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