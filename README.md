
## ToDo

- Improve site publishing / add visual indicator
  - Improve publishing logs
  - Add publishing boolean
  - Store logs in a mongo doc
  - Customize the CMS to show bool and logs
- Setup multi-site deployment:
  - Do through ops, have list of products and for each create:
  - new db
  - new cms
  - new preview
  - new subdomains for each
  - Add Site model with S3 bucket name
  - Setup cdn for new website
- Add card tests
- Add testing to CMS
- Move to typescript (Auto supported by gatsby)

- Fix jwnwilson-kube.co.uk redirect (Not worth the cost currently pointing at single node in cluster)
  - Need to setup reserved ip address for A record in DNS
  - https://www.scaleway.com/en/docs/using-a-load-balancer-to-expose-your-kubernetes-kapsule-ingress-controller-service/#-Using-a-Reserved-IP-as-the-IP-Address-of-Your-Load-Balancer

- Scale out client
- Create node package for new projects to import
- Setup sentry on client