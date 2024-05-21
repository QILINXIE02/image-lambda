# Image Lambda Function

## Overview

This repository contains the code for an AWS Lambda function designed to automatically process image uploads to an S3 bucket. The Lambda function is triggered whenever an image is uploaded to the specified S3 bucket. It retrieves metadata about the uploaded image, updates a `images.json` file stored in the bucket, and then re-uploads the updated `images.json` file.

## Functionality

- **Trigger**: The Lambda function is triggered by S3 events, specifically `ObjectCreated` events.
- **Metadata Extraction**: Upon trigger, the function extracts metadata (name, size, type) of the uploaded image.
- **JSON File Update**: It retrieves the existing `images.json` file from the S3 bucket, adds the metadata of the newly uploaded image to it, and then uploads the updated `images.json` file back to the bucket.
- **Dependencies**: The function uses the AWS SDK v3 (`@aws-sdk/client-s3`) for S3 interaction and `node-fetch` for handling responses.

## Setup

1. **Lambda Function**: Create a new Lambda function in your AWS account.
2. **Trigger Configuration**: Configure the Lambda function to be triggered by S3 events (ObjectCreated) in the desired bucket.
3. **Dependencies**: Ensure that the `aws-sdk` and `node-fetch` dependencies are included in your deployment package (`package.json`).
4. **Permissions**: Grant necessary permissions to the Lambda function to interact with S3 buckets.
5. **Testing**: Upload an image to the specified S3 bucket and verify that the Lambda function is triggered and the `images.json` file is updated accordingly.

## File Structure

- `index.js`: Contains the Lambda function code.
- `package.json`: Lists project dependencies.

## Additional Notes

- **Error Handling**: The Lambda function includes basic error handling to handle cases where S3 object retrieval or file upload fails.
- **Testing**: It's recommended to test the Lambda function thoroughly to ensure proper functionality.

## Author

- **Qilin Xie**

## License

This project is licensed under the ISC License. 
