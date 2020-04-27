terraform {
  required_version = "<= 0.12"
  required_providers {
    aws = "~> 1.0"
    cloudflare = "~> 2.1"
    external = "~> 1.2"
    null = "~> 2.1.2"
    random = "~> 2.2"
    scaleway = "~> 1.10"
    template = "~> 2.1.2"
  }
}