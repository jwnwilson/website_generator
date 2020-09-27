
## ToDo

- Add testing to Client
  - Test loadable components
  - Test SSR and code splitting
    - Does the intial HTML get loaded?
    - Does the component avoid reload?

- Add gatsby markdown card:
  - https://www.gatsbyjs.com/docs/adding-markdown-pages/

- Add testing to CMS

- Move to typescript (Auto supported by gatsby)

- Fix jwnwilson-kube.co.uk redirect
  - Need to setup reserved ip address for A record in DNS
  - https://www.scaleway.com/en/docs/using-a-load-balancer-to-expose-your-kubernetes-kapsule-ingress-controller-service/#-Using-a-Reserved-IP-as-the-IP-Address-of-Your-Load-Balancer

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