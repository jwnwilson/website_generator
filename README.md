
## ToDo

- add www redirect to route 53
- Reduce cluster size to 1
- Check ssl generation on cluster

- Add SEO meta tags to my site
- Store S3 in same S3 bucket as site to reduce buckets and CDN

- Add testing to Client
  - Test loadable components

- Add gatsby markdown card:
  - https://www.gatsbyjs.com/docs/adding-markdown-pages/

- Add testing to CMS

- Move to typescript (Auto supported by gatsby)

- Setup multi-site deployment:
  - Add Site model with S3 bucket name
  - Link Pages to a Site
  - Add Pages filter by Site
  - When publishing get all pages by site
  - Get S3 bucket from site
  - new site will require:
    - New S3 bucket terraform settings
    - Terraform for new subdomain DNS to S3 bucket

- Scale out client
- Create node package for new projects to import

- Setup sentry on client