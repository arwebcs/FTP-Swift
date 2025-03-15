# FTP Swift

## Overview

FTP Swift is a fast and reliable solution for uploading and managing files and folders via FTP. It ensures seamless transfers with secure connections, making file management efficient and hassle-free.

## Features

- Automatic FTP deployment on GitHub push
- Secure and efficient file transfers
- Customizable local and remote directory settings
- Supports GitHub Actions for CI/CD integration

## Usage

This setup uses GitHub Actions to automatically deploy your files and folders via FTP when changes are pushed to the specified branch.

### Workflow Configuration

The following GitHub Actions workflow (`.github/workflows/<any_file_name>.yml`) is used to deploy files via FTP:

```yaml
name: Deploy website
on:
  push:
    branches: [<your_branch_name>]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Custom FTP Deploy
        uses: arwebcs/FTP-Swift@v1.0.0
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          port: ${{ secrets.FTP_PORT }}
          local-dir: ""
          remote-dir: ""
```

## Setup Instructions

1. **Create GitHub Secrets:**

   - Go to your repository settings on GitHub.
   - Navigate to **Secrets and variables** > **Actions**.
   - Add the following secrets:

2. **Configure FTP Server Details:**

   - Update the `local-dir` and `remote-dir` fields in the workflow file as needed.

3. **Commit and Push Changes:**

   - Ensure the `.github/workflows/<any_file_name>.yml` file is added to your repository.
   - Push your code to the specified branch to trigger the deployment.

## Environment Variables

The following environment variables must be set up as GitHub Secrets for the FTP deployment to work properly:

| Variable     | Mandatory | Default Value                   | Description                                            |
| ------------ | --------- | ------------------------------- | ------------------------------------------------------ |
| FTP_HOST     | ✅ Yes    | N/A                             | The hostname or IP address of the FTP server.          |
| FTP_USERNAME | ✅ Yes    | N/A                             | The username used to authenticate with the FTP server. |
| FTP_PASSWORD | ✅ Yes    | N/A                             | The password for the FTP user account.                 |
| FTP_PORT     | ❌ No     | For non-SSL : 21, For SSL : 990 | The port used for the FTP connection.                  |

## Support

For issues and feature requests, please open an issue on the repository:  
[GitHub Issues](https://github.com/arwebcs/FTP-Swift/issues)
