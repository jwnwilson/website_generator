variable "name" {}

resource "aws_ecr_repository" "kubernetes_rep" {
  name                 = var.name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}