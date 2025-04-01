import React, { useState, useEffect } from 'react';


// 실제 질문과 선택지를 반영한 배열
const questions = [
  {
    id: 1,
    question: "A company plans to use an Amazon Snowball Edge device to transfer files to the AWS Cloud. Which activities related to a Snowball Edge device are available to the company at no cost?",
    options: [
      { id: "A", text: "Use of the Snowball Edge appliance for a 10-day period" },
      { id: "B", text: "The transfer of data out of Amazon S3 and to the Snowball Edge appliance" },
      { id: "C", text: "The transfer of data from the Snowball Edge appliance into Amazon S3" },
      { id: "D", text: "Daily use of the Snowball Edge appliance after 10 days" }
    ],
    correctAnswer: "C"
  },
  {
    id: 2,
    question: "A company has deployed applications on Amazon EC2 instances. The company needs to assess application vulnerabilities and must identify infrastructure deployments that do not meet best practices. Which AWS service can the company use to meet these requirements?",
    options: [
      { id: "A", text: "AWS Trusted Advisor" },
      { id: "B", text: "Amazon Inspector" },
      { id: "C", text: "AWS Config" },
      { id: "D", text: "Amazon GuardDuty" }
    ],
    correctAnswer: "B"
  },
  {
    id: 3,
    question: "A company has a centralized group of users with large file storage requirements that have exceeded the space available on premises. The company wants to extend its file storage capabilities for this group while retaining the performance benefit of sharing content locally. What is the MOST operationally efficient AWS solution for this scenario?",
    options: [
      { id: "A", text: "Create an Amazon S3 bucket for each user. Mount each bucket by using an S3 file system mounting utility." },
      { id: "B", text: "Configure and deploy an AWS Storage Gateway file gateway. Connect each user's workstation to the file gateway." },
      { id: "C", text: "Move each user's working environment to Amazon WorkSpaces. Set up an Amazon WorkDocs account for each user." },
      { id: "D", text: "Deploy an Amazon EC2 instance and attach an Amazon Elastic Block Store (Amazon EBS) Provisioned IOPS volume. Share the EBS volume directly with the users." }
    ],
    correctAnswer: "B"
  },
  {
    id: 4,
    question: "According to security best practices, how should an Amazon EC2 instance be given access to an Amazon S3 bucket?",
    options: [
      { id: "A", text: "Hard code an IAM user's secret key and access key directly in the application, and upload the file." },
      { id: "B", text: "Store the IAM user's secret key and access key in a text file on the EC2 instance, read the keys, then upload the file." },
      { id: "C", text: "Have the EC2 instance assume a role to obtain the privileges to upload the file." },
      { id: "D", text: "Modify the S3 bucket policy so that any service can upload to it at any time." }
    ],
    correctAnswer: "C"
  },
  {
    id: 5,
    question: "Which option is a customer responsibility when using Amazon DynamoDB under the AWS Shared Responsibility Model?",
    options: [
      { id: "A", text: "Physical security of DynamoDB" },
      { id: "B", text: "Patching of DynamoDB" },
      { id: "C", text: "Access to DynamoDB tables" },
      { id: "D", text: "Encryption of data at rest in DynamoDB" }
    ],
    correctAnswer: "C"
  },
  {
    id: 6,
    question: "Question #6Topic 1\nWhich option is a perspective that includes foundational capabilities of the AWS Cloud Adoption Framework (AWS CAF)?",
    options: [
      { id: "A", text: "Sustainability" },
      { id: "B", text: "Performance efficiency" },
      { id: "C", text: "Governance" },
      { id: "D", text: "Reliability" }
    ],
    correctAnswer: "C"
  },
  {
    id: 7,
    question: "A company is running and managing its own Docker environment on Amazon EC2 instances. The company wants an alternative to help manage cluster size, scheduling, and environment maintenance. Which AWS service meets these requirements?",
    options: [
      { id: "A", text: "AWS Lambda" },
      { id: "B", text: "Amazon RDS" },
      { id: "C", text: "AWS Fargate" },
      { id: "D", text: "Amazon Athena" }
    ],
    correctAnswer: "C"
  },

  {
  id: 8,
    question: "A company wants to run a NoSQL database on Amazon EC2 instances. Which task is the responsibility of AWS in this scenario?",
    options: [
      { id: "A", text: "Update the guest operating system of the EC2 instances." },
      { id: "B", text: "Maintain high availability at the database layer." },
      { id: "C", text: "Patch the physical infrastructure that hosts the EC2 instances." },
      { id: "D", text: "Configure the security group firewall." }
    ],
   },   

   {
    id: 9,
    question: "Which AWS services or tools can identify rightsizing opportunities for Amazon EC2 instances? (Choose two.)",
    options: [
      { id: "A", text: "AWS Cost Explorer" },
      { id: "B", text: "AWS Billing Conductor" },
      { id: "C", text: "Amazon CodeGuru" },
      { id: "D", text: "Amazon SageMaker" },
      { id: "E", text: "AWS Compute Optimizer" }
    ],
    correctAnswer: "A,E"
  },
  {
    id: 10,
    question: "Which of the following are benefits of using AWS Trusted Advisor? (Choose two.)",
    options: [
      { id: "A", text: "Providing high-performance container orchestration" },
      { id: "B", text: "Creating and rotating encryption keys" },
      { id: "C", text: "Detecting underutilized resources to save costs" },
      { id: "D", text: "Improving security by proactively monitoring the AWS environment" },
      { id: "E", text: "Implementing enforced tagging across AWS resources" }
    ],
    correctAnswer: "C,D"
  },
  {
    id: 11,
    question: "Which of the following is an advantage that users experience when they move on-premises workloads to the AWS Cloud?",
    options: [
      { id: "A", text: "Elimination of expenses for running and maintaining data centers" },
      { id: "B", text: "Price discounts that are identical to discounts from hardware providers" },
      { id: "C", text: "Distribution of all operational controls to AWS" },
      { id: "D", text: "Elimination of operational expenses" }
    ],
    correctAnswer: "A"
  },
  {
    id: 12,
    question: "A company wants to manage deployed IT services and govern its infrastructure as code (IaC) templates. Which AWS service will meet this requirement?",
    options: [
      { id: "A", text: "AWS Resource Explorer" },
      { id: "B", text: "AWS Service Catalog" },
      { id: "C", text: "AWS Organizations" },
      { id: "D", text: "AWS Systems Manager" }
    ],
    correctAnswer: "B"
  },
  {
    id: 13,
    question: "Which AWS service or tool helps users visualize, understand, and manage spending and usage over time?",
    options: [
      { id: "A", text: "AWS Organizations" },
      { id: "B", text: "AWS Pricing Calculator" },
      { id: "C", text: "AWS Cost Explorer" },
      { id: "D", text: "AWS Service Catalog" }
    ],
    correctAnswer: "C"
  },
  {
    id: 14,
    question: "A company is using a central data platform to manage multiple types of data for its customers. The company wants to use AWS services to discover, transform, and visualize the data. Which combination of AWS services should the company use to meet these requirements? (Choose two.)",
    options: [
      { id: "A", text: "AWS Glue" },
      { id: "B", text: "Amazon Elastic File System (Amazon EFS)" },
      { id: "C", text: "Amazon Redshift" },
      { id: "D", text: "Amazon QuickSight" },
      { id: "E", text: "Amazon Quantum Ledger Database (Amazon QLDB)" }
    ],
    correctAnswer: "A,D"
  },
  {
    id: 15,
    question: "A global company wants to migrate its third-party applications to the AWS Cloud. The company wants help from a global team of experts to complete the migration faster and more reliably in accordance with AWS internal best practices. Which AWS service or resource will meet these requirements?",
    options: [
      { id: "A", text: "AWS Support" },
      { id: "B", text: "AWS Professional Services" },
      { id: "C", text: "AWS Launch Wizard" },
      { id: "D", text: "AWS Managed Services (AMS)" }
    ],
    correctAnswer: "B"
  },
  {
    id: 16,
    question: "An e-learning platform needs to run an application for 2 months each year. The application will be deployed on Amazon EC2 instances. Any application downtime during those 2 months must be avoided. Which EC2 purchasing option will meet these requirements MOST cost-effectively?",
    options: [
      { id: "A", text: "Reserved Instances" },
      { id: "B", text: "Dedicated Hosts" },
      { id: "C", text: "Spot Instances" },
      { id: "D", text: "On-Demand Instances" }
    ],
    correctAnswer: "D"
  },
  {
    id: 17,
    question: "A developer wants to deploy an application quickly on AWS without manually creating the required resources. Which AWS service will meet these requirements?",
    options: [
      { id: "A", text: "Amazon EC2" },
      { id: "B", text: "AWS Elastic Beanstalk" },
      { id: "C", text: "AWS CodeBuild" },
      { id: "D", text: "Amazon Personalize" }
    ],
    correctAnswer: "B"
  },
  {
    id: 18,
    question: "A company is storing sensitive customer data in an Amazon S3 bucket. The company wants to protect the data from accidental deletion or overwriting. Which S3 feature should the company use to meet these requirements?",
    options: [
      { id: "A", text: "S3 Lifecycle rules" },
      { id: "B", text: "S3 Versioning" },
      { id: "C", text: "S3 bucket policies" },
      { id: "D", text: "S3 server-side encryption" }
    ],
    correctAnswer: "B"
  },
  {
    id: 19,
    question: "Which AWS service provides the ability to manage infrastructure as code?",
    options: [
      { id: "A", text: "AWS CodePipeline" },
      { id: "B", text: "AWS CodeDeploy" },
      { id: "C", text: "AWS Direct Connect" },
      { id: "D", text: "AWS CloudFormation" }
    ],
    correctAnswer: "D"
  },
  {
    id: 20,
    question: "An online gaming company needs to choose a purchasing option to run its Amazon EC2 instances for 1 year. The web traffic is consistent, and any increases in traffic are predictable. The EC2 instances must be online and available without any disruption. Which EC2 instance purchasing option will meet these requirements MOST cost-effectively?",
    options: [
      { id: "A", text: "On-Demand Instances" },
      { id: "B", text: "Reserved Instances" },
      { id: "C", text: "Spot Instances" },
      { id: "D", text: "Spot Fleet" }
    ],
    correctAnswer: "B"
  },

  {
    id: 21,
    question: "Which AWS service or feature allows a user to establish a dedicated network connection between a company’s on-premises data center and the AWS Cloud?",
    options: [
      { id: "A", text: "AWS Direct Connect" },
      { id: "B", text: "VPC peering" },
      { id: "C", text: "AWS VPN" },
      { id: "D", text: "Amazon Route 53" }
    ],
    correctAnswer: "A"
  },
  {
    id: 22,
    question: "Which option is a physical location of the AWS global infrastructure?",
    options: [
      { id: "A", text: "AWS DataSync" },
      { id: "B", text: "AWS Region" },
      { id: "C", text: "Amazon Connect" },
      { id: "D", text: "AWS Organizations" }
    ],
    correctAnswer: "B"
  },
  {
    id: 23,
    question: "A company wants to protect its AWS Cloud information, systems, and assets while performing risk assessment and mitigation tasks. Which pillar of the AWS Well-Architected Framework is supported by these goals?",
    options: [
      { id: "A", text: "Reliability" },
      { id: "B", text: "Security" },
      { id: "C", text: "Operational excellence" },
      { id: "D", text: "Performance efficiency" }
    ],
    correctAnswer: "B"
  },
  {
    id: 24,
    question: "What is the purpose of having an internet gateway within a VPC?",
    options: [
      { id: "A", text: "To create a VPN connection to the VPC" },
      { id: "B", text: "To allow communication between the VPC and the internet" },
      { id: "C", text: "To impose bandwidth constraints on internet traffic" },
      { id: "D", text: "To load balance traffic from the internet across Amazon EC2 instances" }
    ],
    correctAnswer: "B"
  },
  {
    id: 25,
    question: "A company is running a monolithic on-premises application that does not scale and is difficult to maintain. The company has a plan to migrate the application to AWS and divide the application into microservices. Which best practice of the AWS Well-Architected Framework is the company following with this plan?",
    options: [
      { id: "A", text: "Integrate functional testing as part of AWS deployment." },
      { id: "B", text: "Use automation to deploy changes." },
      { id: "C", text: "Deploy the application to multiple locations." },
      { id: "D", text: "Implement loosely coupled dependencies." }
    ],
    correctAnswer: "D"
  },
  {
    id: 26,
    question: "A company has an AWS account. The company wants to audit its password and access key rotation details for compliance purposes. Which AWS service or tool will meet this requirement?",
    options: [
      { id: "A", text: "IAM Access Analyzer" },
      { id: "B", text: "AWS Artifact" },
      { id: "C", text: "IAM credential report" },
      { id: "D", text: "AWS Audit Manager" }
    ],
    correctAnswer: "C"
  },
  {
    id: 27,
    question: "A company wants to receive a notification when a specific AWS cost threshold is reached. Which AWS services or tools can the company use to meet this requirement? (Choose two.)",
    options: [
      { id: "A", text: "Amazon Simple Queue Service (Amazon SQS)" },
      { id: "B", text: "AWS Budgets" },
      { id: "C", text: "Cost Explorer" },
      { id: "D", text: "Amazon CloudWatch" },
      { id: "E", text: "AWS Cost and Usage Report" }
    ],
    correctAnswer: "B,D"
  },
  {
    id: 28,
    question: "Which AWS service or resource provides answers to the most frequently asked security-related questions that AWS receives from its users?",
    options: [
      { id: "A", text: "AWS Artifact" },
      { id: "B", text: "Amazon Connect" },
      { id: "C", text: "AWS Chatbot" },
      { id: "D", text: "AWS Knowledge Center" }
    ],
    correctAnswer: "D"
  },
  {
    id: 29,
    question: "Which tasks are customer responsibilities, according to the AWS shared responsibility model? (Choose two.)",
    options: [
      { id: "A", text: "Configure the AWS provided security group firewall." },
      { id: "B", text: "Classify company assets in the AWS Cloud." },
      { id: "C", text: "Determine which Availability Zones to use for Amazon S3 buckets." },
      { id: "D", text: "Patch or upgrade Amazon DynamoDB." },
      { id: "E", text: "Select Amazon EC2 instances to run AWS Lambda on." }
    ],
    correctAnswer: "A,B"
  },
  {
    id: 30,
    question: "Which of the following are pillars of the AWS Well-Architected Framework? (Choose two.)",
    options: [
      { id: "A", text: "Availability" },
      { id: "B", text: "Reliability" },
      { id: "C", text: "Scalability" },
      { id: "D", text: "Responsive design" },
      { id: "E", text: "Operational excellence" }
    ],
    correctAnswer: "B,E"
  },
  {
  id: 31,
  question: "Which AWS service or feature is used to send both text and email messages from distributed applications?",
  options: [
    { id: "A", text: "Amazon Simple Notification Service (Amazon SNS)" },
    { id: "B", text: "Amazon Simple Email Service (Amazon SES)" },
    { id: "C", text: "Amazon CloudWatch alerts" },
    { id: "D", text: "Amazon Simple Queue Service (Amazon SQS)" }
  ],
  correctAnswer: "A"
},
{
  id: 32,
  question: "A user needs programmatic access to AWS resources through the AWS CLI or the AWS API. Which option will provide the user with the appropriate access?",
  options: [
    { id: "A", text: "Amazon Inspector" },
    { id: "B", text: "Access keys" },
    { id: "C", text: "SSH public keys" },
    { id: "D", text: "AWS Key Management Service (AWS KMS) keys" }
  ],
  correctAnswer: "B"
},
{
  id: 33,
  question: "A company runs thousands of simultaneous simulations using AWS Batch. Each simulation is stateless, is fault tolerant, and runs for up to 3 hours. Which pricing model enables the company to optimize costs and meet these requirements?",
  options: [
    { id: "A", text: "Reserved Instances" },
    { id: "B", text: "Spot Instances" },
    { id: "C", text: "On-Demand Instances" },
    { id: "D", text: "Dedicated Instances" }
  ],
  correctAnswer: "B"
},
{
  id: 34,
  question: "What does the concept of agility mean in AWS Cloud computing? (Choose two.)",
  options: [
    { id: "A", text: "The speed at which AWS resources are implemented" },
    { id: "B", text: "The speed at which AWS creates new AWS Regions" },
    { id: "C", text: "The ability to experiment quickly" },
    { id: "D", text: "The elimination of wasted capacity" },
    { id: "E", text: "The low cost of entry into cloud computing" }
  ],
  correctAnswer: "A,C"
},
{
  id: 35,
  question: "A company needs to block SQL injection attacks. Which AWS service or feature can meet this requirement?",
  options: [
    { id: "A", text: "AWS WAF" },
    { id: "B", text: "AWS Shield" },
    { id: "C", text: "Network ACLs" },
    { id: "D", text: "Security groups" }
  ],
  correctAnswer: "A"
},
{
  id: 36,
  question: "Which AWS service or feature identifies whether an Amazon S3 bucket or an IAM role has been shared with an external entity?",
  options: [
    { id: "A", text: "AWS Service Catalog" },
    { id: "B", text: "AWS Systems Manager" },
    { id: "C", text: "AWS IAM Access Analyzer" },
    { id: "D", text: "AWS Organizations" }
  ],
  correctAnswer: "C"
},
{
  id: 37,
  question: "A cloud practitioner needs to obtain AWS compliance reports before migrating an environment to the AWS Cloud. How can these reports be generated?",
  options: [
    { id: "A", text: "Contact the AWS Compliance team." },
    { id: "B", text: "Download the reports from AWS Artifact." },
    { id: "C", text: "Open a case with AWS Support." },
    { id: "D", text: "Generate the reports with Amazon Macie." }
  ],
  correctAnswer: "B"
},
{
  id: 38,
  question: "An ecommerce company has migrated its IT infrastructure from an on-premises data center to the AWS Cloud. Which cost is the company’s direct responsibility?",
  options: [
    { id: "A", text: "Cost of application software licenses" },
    { id: "B", text: "Cost of the hardware infrastructure on AWS" },
    { id: "C", text: "Cost of power for the AWS servers" },
    { id: "D", text: "Cost of physical security for the AWS data center" }
  ],
  correctAnswer: "A"
},
{
  id: 39,
  question: "A company is setting up AWS Identity and Access Management (IAM) on an AWS account. Which recommendation complies with IAM security best practices?",
  options: [
    { id: "A", text: "Use the account root user access keys for administrative tasks." },
    { id: "B", text: "Grant broad permissions so that all company employees can access the resources they need." },
    { id: "C", text: "Turn on multi-factor authentication (MFA) for added security during the login process." },
    { id: "D", text: "Avoid rotating credentials to prevent issues in production applications." }
  ],
  correctAnswer: "C"
},
{
  id: 40,
  question: "Elasticity in the AWS Cloud refers to which of the following? (Choose two.)",
  options: [
    { id: "A", text: "How quickly an Amazon EC2 instance can be restarted" },
    { id: "B", text: "The ability to rightsize resources as demand shifts" },
    { id: "C", text: "The maximum amount of RAM an Amazon EC2 instance can use" },
    { id: "D", text: "The pay-as-you-go billing model" },
    { id: "E", text: "How easily resources can be procured when they are needed" }
  ],
  correctAnswer: "B,E"
},
{
  id: 41,
  question: "Which service enables customers to audit API calls in their AWS accounts?",
  options: [
    { id: "A", text: "AWS CloudTrail" },
    { id: "B", text: "AWS Trusted Advisor" },
    { id: "C", text: "Amazon Inspector" },
    { id: "D", text: "AWS X-Ray" }
  ],
  correctAnswer: "A"
},
{
  id: 42,
  question: "What is a customer responsibility when using AWS Lambda according to the AWS shared responsibility model?",
  options: [
    { id: "A", text: "Managing the code within the Lambda function" },
    { id: "B", text: "Confirming that the hardware is working in the data center" },
    { id: "C", text: "Patching the operating system" },
    { id: "D", text: "Shutting down Lambda functions when they are no longer in use" }
  ],
  correctAnswer: "A"
},
{
  id: 43,
  question: "A company has 5 TB of data stored in Amazon S3. The company plans to occasionally run queries on the data for analysis. Which AWS service should the company use to run these queries in the MOST cost-effective manner?",
  options: [
    { id: "A", text: "Amazon Redshift" },
    { id: "B", text: "Amazon Athena" },
    { id: "C", text: "Amazon Kinesis" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "B"
},
{
  id: 44,
  question: "Which AWS service can be used at no additional cost?",
  options: [
    { id: "A", text: "Amazon SageMaker" },
    { id: "B", text: "AWS Config" },
    { id: "C", text: "AWS Organizations" },
    { id: "D", text: "Amazon CloudWatch" }
  ],
  correctAnswer: "C"
},
{
  id: 45,
  question: "Which AWS Cloud Adoption Framework (AWS CAF) capability belongs to the people perspective?",
  options: [
    { id: "A", text: "Data architecture" },
    { id: "B", text: "Event management" },
    { id: "C", text: "Cloud fluency" },
    { id: "D", text: "Strategic partnership" }
  ],
  correctAnswer: "C"
},
{
  id: 46,
  question: "A company wants to make an upfront commitment for continued use of its production Amazon EC2 instances in exchange for a reduced overall cost. Which pricing options meet these requirements with the LOWEST cost? (Choose two.)",
  options: [
    { id: "A", text: "Spot Instances" },
    { id: "B", text: "On-Demand Instances" },
    { id: "C", text: "Reserved Instances" },
    { id: "D", text: "Savings Plans" },
    { id: "E", text: "Dedicated Hosts" }
  ],
  correctAnswer: "C,D"
},
{
  id: 47,
  question: "A company wants to migrate its on-premises relational databases to the AWS Cloud. The company wants to use infrastructure as close to its current geographical location as possible. Which AWS service or resource should the company use to select its Amazon RDS deployment area?",
  options: [
    { id: "A", text: "Amazon Connect" },
    { id: "B", text: "AWS Wavelength" },
    { id: "C", text: "AWS Regions" },
    { id: "D", text: "AWS Direct Connect" }
  ],
  correctAnswer: "C"
},
{
  id: 48,
  question: "A company is exploring the use of the AWS Cloud, and needs to create a cost estimate for a project before the infrastructure is provisioned. Which AWS service or feature can be used to estimate costs before deployment?",
  options: [
    { id: "A", text: "AWS Free Tier" },
    { id: "B", text: "AWS Pricing Calculator" },
    { id: "C", text: "AWS Billing and Cost Management" },
    { id: "D", text: "AWS Cost and Usage Report" }
  ],
  correctAnswer: "B"
},
{
  id: 49,
  question: "A company is building an application that needs to deliver images and videos globally with minimal latency. Which approach can the company use to accomplish this in a cost effective manner?",
  options: [
    { id: "A", text: "Deliver the content through Amazon CloudFront." },
    { id: "B", text: "Store the content on Amazon S3 and enable S3 cross-region replication." },
    { id: "C", text: "Implement a VPN across multiple AWS Regions." },
    { id: "D", text: "Deliver the content through AWS PrivateLink." }
  ],
  correctAnswer: "A"
},
{
  id: 50,
  question: "Which option is a benefit of the economies of scale based on the advantages of cloud computing?",
  options: [
    { id: "A", text: "The ability to trade variable expense for fixed expense" },
    { id: "B", text: "Increased speed and agility" },
    { id: "C", text: "Lower variable costs over fixed costs" },
    { id: "D", text: "Increased operational costs across data centers" }
  ],
  correctAnswer: "C"
},
{
  id: 51,
  question: "Which of the following is a software development framework that a company can use to define cloud resources as code and provision the resources through AWS CloudFormation?",
  options: [
    { id: "A", text: "AWS CLI" },
    { id: "B", text: "AWS Developer Center" },
    { id: "C", text: "AWS Cloud Development Kit (AWS CDK)" },
    { id: "D", text: "AWS CodeStar" }
  ],
  correctAnswer: "C"
},
{
  id: 52,
  question: "A company is developing an application that uses multiple AWS services. The application needs to use temporary, limited-privilege credentials for authentication with other AWS APIs. Which AWS service or feature should the company use to meet these authentication requirements?",
  options: [
    { id: "A", text: "Amazon API Gateway" },
    { id: "B", text: "IAM users" },
    { id: "C", text: "AWS Security Token Service (AWS STS)" },
    { id: "D", text: "IAM instance profiles" }
  ],
  correctAnswer: "C"
},
{
  id: 53,
  question: "Which AWS service is a cloud security posture management (CSPM) service that aggregates alerts from various AWS services and partner products in a standardized format?",
  options: [
    { id: "A", text: "AWS Security Hub" },
    { id: "B", text: "AWS Trusted Advisor" },
    { id: "C", text: "Amazon EventBridge" },
    { id: "D", text: "Amazon GuardDuty" }
  ],
  correctAnswer: "A"
},
{
  id: 54,
  question: "Which AWS service is always provided at no charge?",
  options: [
    { id: "A", text: "Amazon S3" },
    { id: "B", text: "AWS Identity and Access Management (IAM)" },
    { id: "C", text: "Elastic Load Balancers" },
    { id: "D", text: "AWS WAF" }
  ],
  correctAnswer: "B"
},
{
  id: 55,
  question: "To reduce costs, a company is planning to migrate a NoSQL database to AWS. Which AWS service is fully managed and can automatically scale throughput capacity to meet database workload demands?",
  options: [
    { id: "A", text: "Amazon Redshift" },
    { id: "B", text: "Amazon Aurora" },
    { id: "C", text: "Amazon DynamoDB" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "C"
},
{
  id: 56,
  question: "A company is using Amazon DynamoDB. Which task is the company’s responsibility, according to the AWS shared responsibility model?",
  options: [
    { id: "A", text: "Patch the operating system." },
    { id: "B", text: "Provision hosts." },
    { id: "C", text: "Manage database access permissions." },
    { id: "D", text: "Secure the operating system." }
  ],
  correctAnswer: "C"
},
{
  id: 57,
  question: "A company has a test AWS environment. A company is planning on testing an application within AWS. The application testing can be interrupted and does not need to run continuously. Which Amazon EC2 purchasing option will meet these requirements MOST cost-effectively?",
  options: [
    { id: "A", text: "On-Demand Instances" },
    { id: "B", text: "Dedicated Instances" },
    { id: "C", text: "Spot Instances" },
    { id: "D", text: "Reserved Instances" }
  ],
  correctAnswer: "C"
},
{
  id: 58,
  question: "Which AWS service gives users the ability to discover and protect sensitive data that is stored in Amazon S3 buckets?",
  options: [
    { id: "A", text: "Amazon Macie" },
    { id: "B", text: "Amazon Detective" },
    { id: "C", text: "Amazon GuardDuty" },
    { id: "D", text: "AWS IAM Access Analyzer" }
  ],
  correctAnswer: "A"
},
{
  id: 59,
  question: "Which of the following services can be used to block network traffic to an instance? (Choose two.)",
  options: [
    { id: "A", text: "Security groups" },
    { id: "B", text: "Amazon Virtual Private Cloud (Amazon VPC) flow logs" },
    { id: "C", text: "Network ACLs" },
    { id: "D", text: "Amazon CloudWatch" },
    { id: "E", text: "AWS CloudTrail" }
  ],
  correctAnswer: "A,C"
},
{
  id: 60,
  question: "Which AWS service can identify when an Amazon EC2 instance was terminated?",
  options: [
    { id: "A", text: "AWS Identity and Access Management (IAM)" },
    { id: "B", text: "AWS CloudTrail" },
    { id: "C", text: "AWS Compute Optimizer" },
    { id: "D", text: "Amazon EventBridge" }
  ],
  correctAnswer: "B"
},
{
  id: 61,
  question: "Which AWS service helps customers assess and audit the security of their AWS environment and identify potential security risks?",
  options: [
    { id: "A", text: "Amazon Inspector" },
    { id: "B", text: "AWS Security Hub" },
    { id: "C", text: "AWS Trusted Advisor" },
    { id: "D", text: "Amazon GuardDuty" }
  ],
  correctAnswer: "C"
},
{
  id: 62,
  question: "Which AWS service helps reduce the time that is required to model and simulate materials at the atomic scale?",
  options: [
    { id: "A", text: "AWS Lambda" },
    { id: "B", text: "Amazon Braket" },
    { id: "C", text: "Amazon EC2" },
    { id: "D", text: "AWS Batch" }
  ],
  correctAnswer: "B"
},
{
  id: 63,
  question: "Which AWS service or feature helps protect against Distributed Denial of Service (DDoS) attacks?",
  options: [
    { id: "A", text: "AWS WAF" },
    { id: "B", text: "Amazon Inspector" },
    { id: "C", text: "AWS Shield" },
    { id: "D", text: "AWS IAM" }
  ],
  correctAnswer: "C"
},
{
  id: 64,
  question: "Which AWS service helps developers build, test, and deploy code quickly and reliably?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "AWS CodePipeline" },
    { id: "C", text: "Amazon SageMaker" },
    { id: "D", text: "AWS Config" }
  ],
  correctAnswer: "B"
},
{
  id: 65,
  question: "A user needs to retain access to archived data in Amazon S3 that is rarely accessed. Which storage class is MOST cost-effective for this use case?",
  options: [
    { id: "A", text: "S3 Standard" },
    { id: "B", text: "S3 One Zone-IA" },
    { id: "C", text: "S3 Glacier" },
    { id: "D", text: "S3 Intelligent-Tiering" }
  ],
  correctAnswer: "C"
},
{
  id: 66,
  question: "Which AWS service allows you to run containerized applications without managing servers?",
  options: [
    { id: "A", text: "Amazon RDS" },
    { id: "B", text: "AWS Fargate" },
    { id: "C", text: "Amazon EC2" },
    { id: "D", text: "Amazon S3" }
  ],
  correctAnswer: "B"
},
{
  id: 67,
  question: "A company needs to store and retrieve any amount of data at any time. Which AWS service should it use?",
  options: [
    { id: "A", text: "Amazon EBS" },
    { id: "B", text: "Amazon S3" },
    { id: "C", text: "Amazon RDS" },
    { id: "D", text: "Amazon VPC" }
  ],
  correctAnswer: "B"
},
{
  id: 68,
  question: "Which AWS service helps users move petabyte-scale data to AWS?",
  options: [
    { id: "A", text: "AWS DataSync" },
    { id: "B", text: "AWS Snowball" },
    { id: "C", text: "Amazon CloudFront" },
    { id: "D", text: "Amazon Kinesis" }
  ],
  correctAnswer: "B"
},
{
  id: 69,
  question: "Which AWS service enables continuous delivery and integration of application updates?",
  options: [
    { id: "A", text: "AWS CloudFormation" },
    { id: "B", text: "AWS CodeDeploy" },
    { id: "C", text: "AWS CodePipeline" },
    { id: "D", text: "AWS CodeCommit" }
  ],
  correctAnswer: "C"
},
{
  id: 70,
  question: "Which AWS service simplifies the creation and management of SSL/TLS certificates?",
  options: [
    { id: "A", text: "Amazon Certificate Store" },
    { id: "B", text: "AWS Identity and Access Management (IAM)" },
    { id: "C", text: "AWS Certificate Manager" },
    { id: "D", text: "AWS Secrets Manager" }
  ],
  correctAnswer: "C"
},
{
  id: 71,
  question: "Which service provides a managed, secure environment for running containerized applications?",
  options: [
    { id: "A", text: "Amazon EKS" },
    { id: "B", text: "Amazon EC2" },
    { id: "C", text: "Amazon RDS" },
    { id: "D", text: "AWS Cloud9" }
  ],
  correctAnswer: "A"
},
{
  id: 72,
  question: "Which AWS service enables real-time monitoring and observability of AWS resources and applications?",
  options: [
    { id: "A", text: "Amazon CloudWatch" },
    { id: "B", text: "AWS IAM" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "AWS WAF" }
  ],
  correctAnswer: "A"
},
{
  id: 73,
  question: "Which of the following can be used to automate the configuration and management of AWS resources?",
  options: [
    { id: "A", text: "AWS IAM" },
    { id: "B", text: "AWS CloudFormation" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "Amazon SNS" }
  ],
  correctAnswer: "B"
},
{
  id: 74,
  question: "Which AWS service enables users to build and run applications without provisioning or managing servers?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "AWS Lambda" },
    { id: "C", text: "Amazon RDS" },
    { id: "D", text: "Amazon S3" }
  ],
  correctAnswer: "B"
},
{
  id: 75,
  question: "Which AWS service is a fully managed, petabyte-scale data warehouse solution?",
  options: [
    { id: "A", text: "Amazon Aurora" },
    { id: "B", text: "Amazon DynamoDB" },
    { id: "C", text: "Amazon Redshift" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "C"
},
{
  id: 76,
  question: "Which AWS service helps manage user identities and access permissions securely?",
  options: [
    { id: "A", text: "Amazon RDS" },
    { id: "B", text: "AWS Shield" },
    { id: "C", text: "AWS IAM" },
    { id: "D", text: "Amazon EC2" }
  ],
  correctAnswer: "C"
},
{
  id: 77,
  question: "A company wants to run web applications in multiple AWS Regions. Which AWS service can help route user traffic to the closest AWS Region?",
  options: [
    { id: "A", text: "Amazon CloudWatch" },
    { id: "B", text: "Amazon Route 53" },
    { id: "C", text: "AWS IAM" },
    { id: "D", text: "AWS Auto Scaling" }
  ],
  correctAnswer: "B"
},
{
  id: 78,
  question: "Which AWS service provides a visual interface to create and manage AWS resources without writing code?",
  options: [
    { id: "A", text: "AWS CloudFormation" },
    { id: "B", text: "AWS CloudShell" },
    { id: "C", text: "AWS Management Console" },
    { id: "D", text: "AWS CLI" }
  ],
  correctAnswer: "C"
},
{
  id: 79,
  question: "Which AWS feature allows users to manage multiple AWS accounts centrally?",
  options: [
    { id: "A", text: "AWS IAM" },
    { id: "B", text: "AWS Organizations" },
    { id: "C", text: "Amazon VPC" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "B"
},
{
  id: 80,
  question: "Which AWS service allows users to query data in Amazon S3 using standard SQL?",
  options: [
    { id: "A", text: "Amazon Redshift" },
    { id: "B", text: "Amazon RDS" },
    { id: "C", text: "Amazon Athena" },
    { id: "D", text: "Amazon DynamoDB" }
  ],
  correctAnswer: "C"
},

{
  id: 81,
  question: "Which AWS service provides recommendations to help optimize AWS resources for cost and performance?",
  options: [
    { id: "A", text: "AWS Config" },
    { id: "B", text: "AWS Compute Optimizer" },
    { id: "C", text: "AWS Shield" },
    { id: "D", text: "Amazon GuardDuty" }
  ],
  correctAnswer: "B"
},
{
  id: 82,
  question: "Which AWS service is used to send email messages?",
  options: [
    { id: "A", text: "Amazon SNS" },
    { id: "B", text: "Amazon SES" },
    { id: "C", text: "Amazon SQS" },
    { id: "D", text: "AWS Lambda" }
  ],
  correctAnswer: "B"
},
{
  id: 83,
  question: "Which AWS service provides a managed environment to run relational databases in the cloud?",
  options: [
    { id: "A", text: "Amazon DynamoDB" },
    { id: "B", text: "Amazon RDS" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "Amazon Aurora" }
  ],
  correctAnswer: "B"
},
{
  id: 84,
  question: "Which AWS service enables automatic scaling of EC2 instances based on demand?",
  options: [
    { id: "A", text: "Amazon CloudWatch" },
    { id: "B", text: "AWS Auto Scaling" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "AWS Lambda" }
  ],
  correctAnswer: "B"
},
{
  id: 85,
  question: "Which AWS tool can estimate the monthly costs for using AWS services?",
  options: [
    { id: "A", text: "AWS Free Tier" },
    { id: "B", text: "AWS Billing Dashboard" },
    { id: "C", text: "AWS Pricing Calculator" },
    { id: "D", text: "AWS Budgets" }
  ],
  correctAnswer: "C"
},
{
  id: 86,
  question: "Which AWS service allows real-time analysis of streaming data?",
  options: [
    { id: "A", text: "Amazon Athena" },
    { id: "B", text: "Amazon Kinesis" },
    { id: "C", text: "Amazon Redshift" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "B"
},
{
  id: 87,
  question: "Which AWS service should a company use to store files and objects in the cloud?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "Amazon RDS" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "Amazon Route 53" }
  ],
  correctAnswer: "C"
},
{
  id: 88,
  question: "Which AWS feature can be used to restrict access to resources based on user identity?",
  options: [
    { id: "A", text: "Amazon VPC" },
    { id: "B", text: "AWS IAM policies" },
    { id: "C", text: "Amazon CloudFront" },
    { id: "D", text: "AWS CloudTrail" }
  ],
  correctAnswer: "B"
},
{
  id: 89,
  question: "Which AWS service enables developers to store and manage Git-based source code repositories?",
  options: [
    { id: "A", text: "AWS CodeBuild" },
    { id: "B", text: "AWS CodeDeploy" },
    { id: "C", text: "AWS CodePipeline" },
    { id: "D", text: "AWS CodeCommit" }
  ],
  correctAnswer: "D"
},
{
  id: 90,
  question: "What does Amazon Route 53 provide?",
  options: [
    { id: "A", text: "Monitoring of applications" },
    { id: "B", text: "Domain registration and DNS service" },
    { id: "C", text: "Object storage" },
    { id: "D", text: "Message queuing service" }
  ],
  correctAnswer: "B"
},
{
  id: 91,
  question: "Which AWS service is used to provision and manage infrastructure using code?",
  options: [
    { id: "A", text: "AWS Config" },
    { id: "B", text: "AWS CodeBuild" },
    { id: "C", text: "AWS CloudFormation" },
    { id: "D", text: "AWS CodePipeline" }
  ],
  correctAnswer: "C"
},
{
  id: 92,
  question: "Which AWS service helps identify security findings in your AWS environment?",
  options: [
    { id: "A", text: "Amazon Inspector" },
    { id: "B", text: "AWS CloudTrail" },
    { id: "C", text: "Amazon CloudWatch" },
    { id: "D", text: "Amazon S3" }
  ],
  correctAnswer: "A"
},
{
  id: 93,
  question: "Which AWS support plan provides access to a Cloud Support Engineer 24/7?",
  options: [
    { id: "A", text: "Basic" },
    { id: "B", text: "Developer" },
    { id: "C", text: "Business" },
    { id: "D", text: "Free Tier" }
  ],
  correctAnswer: "C"
},
{
  id: 94,
  question: "Which AWS service allows organizations to set policies for multiple AWS accounts?",
  options: [
    { id: "A", text: "AWS IAM" },
    { id: "B", text: "AWS Organizations" },
    { id: "C", text: "Amazon VPC" },
    { id: "D", text: "AWS Lambda" }
  ],
  correctAnswer: "B"
},
{
  id: 95,
  question: "Which of the following is an AWS responsibility under the shared responsibility model?",
  options: [
    { id: "A", text: "Configuring IAM policies" },
    { id: "B", text: "Patching the hypervisor" },
    { id: "C", text: "Managing application-level encryption" },
    { id: "D", text: "Controlling access to data stored in S3" }
  ],
  correctAnswer: "B"
},
{
  id: 96,
  question: "Which AWS service helps users analyze logs from multiple sources?",
  options: [
    { id: "A", text: "Amazon CloudWatch Logs" },
    { id: "B", text: "AWS CloudTrail" },
    { id: "C", text: "AWS Config" },
    { id: "D", text: "Amazon Inspector" }
  ],
  correctAnswer: "A"
},
{
  id: 97,
  question: "Which AWS service lets you create private network connectivity between your data center and AWS?",
  options: [
    { id: "A", text: "Amazon VPC" },
    { id: "B", text: "Amazon S3" },
    { id: "C", text: "AWS Direct Connect" },
    { id: "D", text: "Amazon Route 53" }
  ],
  correctAnswer: "C"
},
{
  id: 98,
  question: "Which AWS service is best suited for delivering static web content globally with low latency?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "AWS CloudFront" },
    { id: "C", text: "AWS Auto Scaling" },
    { id: "D", text: "Amazon VPC" }
  ],
  correctAnswer: "B"
},
{
  id: 99,
  question: "Which tool provides a detailed billing report with usage and cost details for AWS services?",
  options: [
    { id: "A", text: "AWS Cost and Usage Report" },
    { id: "B", text: "AWS Budgets" },
    { id: "C", text: "AWS Trusted Advisor" },
    { id: "D", text: "AWS Pricing Calculator" }
  ],
  correctAnswer: "A"
},
{
  id: 100,
  question: "Which AWS service allows you to automate security assessments to help improve the security and compliance of applications?",
  options: [
    { id: "A", text: "Amazon Macie" },
    { id: "B", text: "Amazon Inspector" },
    { id: "C", text: "AWS IAM Access Analyzer" },
    { id: "D", text: "AWS CloudTrail" }
  ],
  correctAnswer: "B"
},


{
  id: 101,
  question: "Which AWS service can be used to launch and manage virtual servers in the AWS Cloud?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "Amazon S3" },
    { id: "C", text: "Amazon RDS" },
    { id: "D", text: "Amazon EBS" }
  ],
  correctAnswer: "A"
},
{
  id: 102,
  question: "Which AWS service allows you to run code without provisioning or managing servers?",
  options: [
    { id: "A", text: "AWS Batch" },
    { id: "B", text: "Amazon EC2" },
    { id: "C", text: "AWS Lambda" },
    { id: "D", text: "Amazon ECS" }
  ],
  correctAnswer: "C"
},
{
  id: 103,
  question: "Which feature of Amazon RDS helps with automatic backups, database snapshots, and point-in-time recovery?",
  options: [
    { id: "A", text: "Amazon Aurora" },
    { id: "B", text: "Multi-AZ deployments" },
    { id: "C", text: "Amazon RDS automated backups" },
    { id: "D", text: "Amazon RDS Read Replicas" }
  ],
  correctAnswer: "C"
},
{
  id: 104,
  question: "Which AWS service helps protect applications by filtering malicious web traffic?",
  options: [
    { id: "A", text: "Amazon Inspector" },
    { id: "B", text: "AWS WAF" },
    { id: "C", text: "AWS Firewall Manager" },
    { id: "D", text: "Amazon Macie" }
  ],
  correctAnswer: "B"
},
{
  id: 105,
  question: "Which of the following is a benefit of using the AWS global infrastructure?",
  options: [
    { id: "A", text: "Single point of failure" },
    { id: "B", text: "Reduced application latency" },
    { id: "C", text: "Centralized logging only" },
    { id: "D", text: "Manual scaling of resources" }
  ],
  correctAnswer: "B"
},
{
  id: 106,
  question: "Which AWS tool helps you understand your AWS spending and identify opportunities for cost optimization?",
  options: [
    { id: "A", text: "AWS CloudTrail" },
    { id: "B", text: "AWS Pricing Calculator" },
    { id: "C", text: "AWS Budgets" },
    { id: "D", text: "AWS Cost Explorer" }
  ],
  correctAnswer: "D"
},
{
  id: 107,
  question: "Which AWS service is designed for object storage with high durability, availability, and scalability?",
  options: [
    { id: "A", text: "Amazon EFS" },
    { id: "B", text: "Amazon EBS" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "C"
},
{
  id: 108,
  question: "Which AWS support plan provides a designated Technical Account Manager (TAM)?",
  options: [
    { id: "A", text: "Basic" },
    { id: "B", text: "Developer" },
    { id: "C", text: "Business" },
    { id: "D", text: "Enterprise" }
  ],
  correctAnswer: "D"
},
{
  id: 109,
  question: "What is an Availability Zone in AWS?",
  options: [
    { id: "A", text: "A virtual private cloud" },
    { id: "B", text: "A data center or group of data centers within a region" },
    { id: "C", text: "A user-defined zone for applications" },
    { id: "D", text: "A separate AWS Region" }
  ],
  correctAnswer: "B"
},
{
  id: 110,
  question: "Which AWS service allows you to decouple application components using messaging?",
  options: [
    { id: "A", text: "Amazon SNS" },
    { id: "B", text: "AWS Lambda" },
    { id: "C", text: "Amazon SQS" },
    { id: "D", text: "AWS Step Functions" }
  ],
  correctAnswer: "C"
},
{
  id: 111,
  question: "Which AWS service makes it easier to migrate databases to AWS quickly and securely?",
  options: [
    { id: "A", text: "Amazon RDS" },
    { id: "B", text: "AWS DMS (Database Migration Service)" },
    { id: "C", text: "Amazon Redshift" },
    { id: "D", text: "Amazon Aurora" }
  ],
  correctAnswer: "B"
},
{
  id: 112,
  question: "Which AWS service provides managed Kubernetes clusters?",
  options: [
    { id: "A", text: "Amazon ECS" },
    { id: "B", text: "Amazon EC2" },
    { id: "C", text: "Amazon EKS" },
    { id: "D", text: "AWS Lambda" }
  ],
  correctAnswer: "C"
},
{
  id: 113,
  question: "Which AWS service provides content delivery with low latency and high transfer speeds?",
  options: [
    { id: "A", text: "Amazon CloudFront" },
    { id: "B", text: "Amazon Route 53" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "AWS Direct Connect" }
  ],
  correctAnswer: "A"
},
{
  id: 114,
  question: "Which AWS service allows you to run containerized applications without managing servers or clusters?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "Amazon ECS with AWS Fargate" },
    { id: "C", text: "AWS Lambda" },
    { id: "D", text: "Amazon EKS" }
  ],
  correctAnswer: "B"
},
{
  id: 115,
  question: "What does Amazon VPC allow you to do?",
  options: [
    { id: "A", text: "Host relational databases" },
    { id: "B", text: "Build private networks in the AWS Cloud" },
    { id: "C", text: "Deliver content globally" },
    { id: "D", text: "Manage object storage" }
  ],
  correctAnswer: "B"
},
{
  id: 116,
  question: "Which AWS service allows you to run big data frameworks like Apache Hadoop and Spark?",
  options: [
    { id: "A", text: "Amazon EMR" },
    { id: "B", text: "Amazon Redshift" },
    { id: "C", text: "Amazon Athena" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "A"
},
{
  id: 117,
  question: "Which AWS service helps you manage identities and permissions securely?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "Amazon VPC" },
    { id: "C", text: "AWS IAM" },
    { id: "D", text: "Amazon S3" }
  ],
  correctAnswer: "C"
},
{
  id: 118,
  question: "Which AWS service allows you to automate software deployment to various compute services?",
  options: [
    { id: "A", text: "AWS CodeCommit" },
    { id: "B", text: "AWS CodePipeline" },
    { id: "C", text: "AWS CodeDeploy" },
    { id: "D", text: "AWS CloudFormation" }
  ],
  correctAnswer: "C"
},
{
  id: 119,
  question: "Which AWS service is suitable for data warehousing and analytics?",
  options: [
    { id: "A", text: "Amazon RDS" },
    { id: "B", text: "Amazon Redshift" },
    { id: "C", text: "Amazon EC2" },
    { id: "D", text: "Amazon S3" }
  ],
  correctAnswer: "B"
},
{
  id: 120,
  question: "Which AWS service allows you to set alarms and monitor AWS resources and applications?",
  options: [
    { id: "A", text: "Amazon CloudWatch" },
    { id: "B", text: "AWS CloudTrail" },
    { id: "C", text: "AWS Config" },
    { id: "D", text: "AWS X-Ray" }
  ],
  correctAnswer: "A"
},

{
  id: 121,
  question: "Which AWS service lets you run containerized applications using Docker?",
  options: [
    { id: "A", text: "Amazon EFS" },
    { id: "B", text: "Amazon ECS" },
    { id: "C", text: "AWS CodeDeploy" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "B"
},
{
  id: 122,
  question: "Which service can you use to view AWS usage and billing information?",
  options: [
    { id: "A", text: "Amazon CloudWatch" },
    { id: "B", text: "AWS Billing Dashboard" },
    { id: "C", text: "AWS Config" },
    { id: "D", text: "AWS X-Ray" }
  ],
  correctAnswer: "B"
},
{
  id: 123,
  question: "Which AWS service provides a managed distributed database optimized for performance and scalability?",
  options: [
    { id: "A", text: "Amazon RDS" },
    { id: "B", text: "Amazon Redshift" },
    { id: "C", text: "Amazon DynamoDB" },
    { id: "D", text: "Amazon Aurora" }
  ],
  correctAnswer: "C"
},
{
  id: 124,
  question: "Which AWS tool helps track and log user activity in the AWS environment?",
  options: [
    { id: "A", text: "AWS CloudTrail" },
    { id: "B", text: "Amazon Inspector" },
    { id: "C", text: "AWS Shield" },
    { id: "D", text: "AWS Config" }
  ],
  correctAnswer: "A"
},
{
  id: 125,
  question: "Which storage class in Amazon S3 is best for data that is accessed infrequently?",
  options: [
    { id: "A", text: "S3 Standard" },
    { id: "B", text: "S3 Intelligent-Tiering" },
    { id: "C", text: "S3 One Zone-IA" },
    { id: "D", text: "S3 Glacier" }
  ],
  correctAnswer: "C"
},
{
  id: 126,
  question: "What feature of Amazon EC2 allows instances to recover automatically from failures?",
  options: [
    { id: "A", text: "Auto Recovery" },
    { id: "B", text: "Instance Store" },
    { id: "C", text: "Elastic Load Balancing" },
    { id: "D", text: "Auto Scaling" }
  ],
  correctAnswer: "A"
},
{
  id: 127,
  question: "Which AWS service allows you to use machine learning models without deep knowledge of ML algorithms?",
  options: [
    { id: "A", text: "Amazon Rekognition" },
    { id: "B", text: "Amazon SageMaker" },
    { id: "C", text: "Amazon Lex" },
    { id: "D", text: "Amazon Polly" }
  ],
  correctAnswer: "B"
},
{
  id: 128,
  question: "Which of the following is a benefit of using AWS Organizations?",
  options: [
    { id: "A", text: "Monitoring network traffic" },
    { id: "B", text: "Creating S3 buckets" },
    { id: "C", text: "Consolidated billing" },
    { id: "D", text: "Managing EC2 instances" }
  ],
  correctAnswer: "C"
},
{
  id: 129,
  question: "Which service helps you run code in response to events, such as changes to data in an S3 bucket?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "AWS Lambda" },
    { id: "C", text: "Amazon VPC" },
    { id: "D", text: "Amazon CloudWatch" }
  ],
  correctAnswer: "B"
},
{
  id: 130,
  question: "Which AWS service is best suited for storing session state data for web applications?",
  options: [
    { id: "A", text: "Amazon Aurora" },
    { id: "B", text: "Amazon ElastiCache" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "Amazon EBS" }
  ],
  correctAnswer: "B"
},
{
  id: 131,
  question: "Which AWS service is a managed domain name system (DNS) web service?",
  options: [
    { id: "A", text: "Amazon VPC" },
    { id: "B", text: "Amazon CloudFront" },
    { id: "C", text: "Amazon Route 53" },
    { id: "D", text: "Amazon Cognito" }
  ],
  correctAnswer: "C"
},
{
  id: 132,
  question: "Which AWS service offers a virtual desktop infrastructure (VDI) solution?",
  options: [
    { id: "A", text: "Amazon Elastic File System (EFS)" },
    { id: "B", text: "Amazon WorkSpaces" },
    { id: "C", text: "AWS Lambda" },
    { id: "D", text: "AWS X-Ray" }
  ],
  correctAnswer: "B"
},
{
  id: 133,
  question: "Which service provides a petabyte-scale data warehouse solution in AWS?",
  options: [
    { id: "A", text: "Amazon Aurora" },
    { id: "B", text: "Amazon DynamoDB" },
    { id: "C", text: "Amazon Redshift" },
    { id: "D", text: "Amazon RDS" }
  ],
  correctAnswer: "C"
},
{
  id: 134,
  question: "Which tool provides automated security assessments to help improve the security of applications deployed on AWS?",
  options: [
    { id: "A", text: "Amazon Inspector" },
    { id: "B", text: "AWS X-Ray" },
    { id: "C", text: "Amazon CloudWatch" },
    { id: "D", text: "AWS Config" }
  ],
  correctAnswer: "A"
},
{
  id: 135,
  question: "Which of the following best describes the AWS Shared Responsibility Model?",
  options: [
    { id: "A", text: "AWS is responsible for all security" },
    { id: "B", text: "Customer is responsible for physical security" },
    { id: "C", text: "AWS and customer share security responsibilities" },
    { id: "D", text: "Customer is responsible for everything in the cloud" }
  ],
  correctAnswer: "C"
},
{
  id: 136,
  question: "Which AWS service enables you to automate infrastructure deployment using code?",
  options: [
    { id: "A", text: "AWS CloudFormation" },
    { id: "B", text: "AWS CodeDeploy" },
    { id: "C", text: "AWS IAM" },
    { id: "D", text: "Amazon EC2 Auto Scaling" }
  ],
  correctAnswer: "A"
},
{
  id: 137,
  question: "Which AWS tool helps estimate the monthly cost of AWS usage?",
  options: [
    { id: "A", text: "AWS CloudTrail" },
    { id: "B", text: "AWS Pricing Calculator" },
    { id: "C", text: "AWS Organizations" },
    { id: "D", text: "AWS Trusted Advisor" }
  ],
  correctAnswer: "B"
},
{
  id: 138,
  question: "Which AWS service provides scalable file storage that multiple EC2 instances can access concurrently?",
  options: [
    { id: "A", text: "Amazon EBS" },
    { id: "B", text: "Amazon S3" },
    { id: "C", text: "Amazon EFS" },
    { id: "D", text: "Amazon Glacier" }
  ],
  correctAnswer: "C"
},
{
  id: 139,
  question: "Which AWS service is used for continuous integration and continuous delivery (CI/CD)?",
  options: [
    { id: "A", text: "AWS CodePipeline" },
    { id: "B", text: "Amazon Route 53" },
    { id: "C", text: "Amazon CloudFront" },
    { id: "D", text: "AWS X-Ray" }
  ],
  correctAnswer: "A"
},
{
  id: 140,
  question: "Which AWS service provides a scalable message queuing service?",
  options: [
    { id: "A", text: "Amazon SNS" },
    { id: "B", text: "Amazon SQS" },
    { id: "C", text: "Amazon MQ" },
    { id: "D", text: "AWS Step Functions" }
  ],
  correctAnswer: "B"
},
{
  id: 141,
  question: "Which AWS service helps to manage and enforce policies for multiple AWS accounts?",
  options: [
    { id: "A", text: "AWS IAM" },
    { id: "B", text: "AWS Organizations" },
    { id: "C", text: "AWS Config" },
    { id: "D", text: "AWS CloudFormation" }
  ],
  correctAnswer: "B"
},
{
  id: 142,
  question: "Which feature of Amazon S3 helps you prevent accidental deletion of data?",
  options: [
    { id: "A", text: "S3 Transfer Acceleration" },
    { id: "B", text: "S3 Object Lock" },
    { id: "C", text: "S3 Versioning" },
    { id: "D", text: "S3 Lifecycle Rules" }
  ],
  correctAnswer: "B"
},
{
  id: 143,
  question: "Which AWS service enables you to provision infrastructure across multiple AWS accounts and Regions using a single operation?",
  options: [
    { id: "A", text: "AWS CloudFormation StackSets" },
    { id: "B", text: "AWS Config" },
    { id: "C", text: "Amazon S3 Replication" },
    { id: "D", text: "AWS Batch" }
  ],
  correctAnswer: "A"
},
{
  id: 144,
  question: "Which AWS service offers low-cost, long-term storage for data archiving?",
  options: [
    { id: "A", text: "Amazon S3 Standard" },
    { id: "B", text: "Amazon EFS" },
    { id: "C", text: "Amazon S3 Glacier" },
    { id: "D", text: "Amazon EBS" }
  ],
  correctAnswer: "C"
},
{
  id: 145,
  question: "What does AWS Shield provide protection against?",
  options: [
    { id: "A", text: "Code injection attacks" },
    { id: "B", text: "Data loss" },
    { id: "C", text: "DDoS attacks" },
    { id: "D", text: "Phishing emails" }
  ],
  correctAnswer: "C"
},
{
  id: 146,
  question: "Which AWS service should you use to host a static website?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "Amazon RDS" },
    { id: "C", text: "Amazon S3" },
    { id: "D", text: "Amazon VPC" }
  ],
  correctAnswer: "C"
},
{
  id: 147,
  question: "Which feature of Amazon RDS helps manage backups, software patching, and automatic failover?",
  options: [
    { id: "A", text: "Multi-AZ deployment" },
    { id: "B", text: "Read Replicas" },
    { id: "C", text: "RDS Proxy" },
    { id: "D", text: "Database Migration Service" }
  ],
  correctAnswer: "A"
},
{
  id: 148,
  question: "What does the AWS Free Tier offer for new users?",
  options: [
    { id: "A", text: "Unlimited Amazon EC2 usage" },
    { id: "B", text: "Limited, free access to selected AWS services" },
    { id: "C", text: "Free usage of all AWS services" },
    { id: "D", text: "24/7 AWS support at no cost" }
  ],
  correctAnswer: "B"
},
{
  id: 149,
  question: "Which AWS service enables you to track resource changes and evaluate configurations?",
  options: [
    { id: "A", text: "AWS CloudTrail" },
    { id: "B", text: "AWS Config" },
    { id: "C", text: "Amazon GuardDuty" },
    { id: "D", text: "Amazon CloudWatch" }
  ],
  correctAnswer: "B"
},
{
  id: 150,
  question: "Which pricing model should you use if your application requires a predictable amount of computing capacity for a one-year or three-year term?",
  options: [
    { id: "A", text: "On-Demand Instances" },
    { id: "B", text: "Reserved Instances" },
    { id: "C", text: "Spot Instances" },
    { id: "D", text: "Savings Plans" }
  ],
  correctAnswer: "B"
},
{
  id: 151,
  question: "Which AWS service enables you to define your own domain name and direct internet traffic to your resources?",
  options: [
    { id: "A", text: "Amazon CloudFront" },
    { id: "B", text: "AWS Route 53" },
    { id: "C", text: "Amazon API Gateway" },
    { id: "D", text: "AWS Transit Gateway" }
  ],
  correctAnswer: "B"
},
{
  id: 152,
  question: "Which AWS service helps you collect and track metrics, logs, and events?",
  options: [
    { id: "A", text: "AWS X-Ray" },
    { id: "B", text: "AWS CloudTrail" },
    { id: "C", text: "Amazon CloudWatch" },
    { id: "D", text: "Amazon GuardDuty" }
  ],
  correctAnswer: "C"
},
{
  id: 153,
  question: "Which AWS service allows you to build conversational interfaces into applications?",
  options: [
    { id: "A", text: "Amazon Polly" },
    { id: "B", text: "Amazon Lex" },
    { id: "C", text: "Amazon Rekognition" },
    { id: "D", text: "Amazon Comprehend" }
  ],
  correctAnswer: "B"
},
{
  id: 154,
  question: "Which AWS service lets you transfer large amounts of data into AWS using a physical device?",
  options: [
    { id: "A", text: "AWS Snowball" },
    { id: "B", text: "Amazon S3 Transfer Acceleration" },
    { id: "C", text: "AWS Direct Connect" },
    { id: "D", text: "AWS DataSync" }
  ],
  correctAnswer: "A"
},
{
  id: 155,
  question: "What is the benefit of decoupling applications using Amazon SQS?",
  options: [
    { id: "A", text: "Reduces the amount of code required" },
    { id: "B", text: "Improves application performance by caching data" },
    { id: "C", text: "Increases fault tolerance and scalability" },
    { id: "D", text: "Automates deployment of application code" }
  ],
  correctAnswer: "C"
},
{
  id: 156,
  question: "Which AWS service is most appropriate for business analytics and BI (business intelligence)?",
  options: [
    { id: "A", text: "Amazon Athena" },
    { id: "B", text: "Amazon QuickSight" },
    { id: "C", text: "AWS Glue" },
    { id: "D", text: "Amazon Redshift" }
  ],
  correctAnswer: "B"
},
{
  id: 157,
  question: "Which service provides recommendations to help reduce costs and improve system performance?",
  options: [
    { id: "A", text: "AWS Inspector" },
    { id: "B", text: "AWS Trusted Advisor" },
    { id: "C", text: "AWS CloudFormation" },
    { id: "D", text: "AWS Config" }
  ],
  correctAnswer: "B"
},
{
  id: 158,
  question: "Which AWS service can be used to automatically distribute incoming traffic across multiple targets?",
  options: [
    { id: "A", text: "Amazon Route 53" },
    { id: "B", text: "AWS Global Accelerator" },
    { id: "C", text: "Elastic Load Balancing (ELB)" },
    { id: "D", text: "Amazon CloudFront" }
  ],
  correctAnswer: "C"
},
{
  id: 159,
  question: "Which AWS feature helps you recover resources in another AWS Region in case of a disaster?",
  options: [
    { id: "A", text: "Cross-Region Replication" },
    { id: "B", text: "Amazon S3 Lifecycle Policy" },
    { id: "C", text: "Elastic Load Balancing" },
    { id: "D", text: "Amazon CloudFront" }
  ],
  correctAnswer: "A"
},
{
  id: 160,
  question: "Which service is designed to run large-scale parallel and high-performance computing (HPC) applications?",
  options: [
    { id: "A", text: "Amazon EMR" },
    { id: "B", text: "Amazon EC2 Auto Scaling" },
    { id: "C", text: "AWS Batch" },
    { id: "D", text: "Amazon Lightsail" }
  ],
  correctAnswer: "C"
},

{
  id: 161,
  question: "Which AWS service can help you centrally view and manage AWS accounts, policies, and consolidated billing?",
  options: [
    { id: "A", text: "AWS IAM" },
    { id: "B", text: "AWS Control Tower" },
    { id: "C", text: "AWS Organizations" },
    { id: "D", text: "AWS Service Catalog" }
  ],
  correctAnswer: "C"
},
{
  id: 162,
  question: "Which AWS service helps you detect anomalies in your AWS account based on machine learning?",
  options: [
    { id: "A", text: "Amazon Macie" },
    { id: "B", text: "Amazon GuardDuty" },
    { id: "C", text: "AWS Config" },
    { id: "D", text: "Amazon Lookout for Metrics" }
  ],
  correctAnswer: "D"
},
{
  id: 163,
  question: "Which of the following is a benefit of the AWS Cloud?",
  options: [
    { id: "A", text: "High latency network connections" },
    { id: "B", text: "Manual provisioning of infrastructure" },
    { id: "C", text: "Increased capital expenditures" },
    { id: "D", text: "Go global in minutes" }
  ],
  correctAnswer: "D"
},
{
  id: 164,
  question: "Which AWS service allows developers to run code without provisioning or managing servers?",
  options: [
    { id: "A", text: "Amazon EC2" },
    { id: "B", text: "Amazon RDS" },
    { id: "C", text: "AWS Lambda" },
    { id: "D", text: "AWS Elastic Beanstalk" }
  ],
  correctAnswer: "C"
},
{
  id: 165,
  question: "What is the purpose of using Amazon CloudFront?",
  options: [
    { id: "A", text: "To deploy applications" },
    { id: "B", text: "To monitor network traffic" },
    { id: "C", text: "To deliver content with low latency" },
    { id: "D", text: "To store large amounts of data" }
  ],
  correctAnswer: "C"
},
{
  id: 166,
  question: "What is an Availability Zone in AWS?",
  options: [
    { id: "A", text: "A geographical area that consists of two or more data centers" },
    { id: "B", text: "A physical location where AWS clusters data centers" },
    { id: "C", text: "One or more discrete data centers with redundant power, networking, and connectivity" },
    { id: "D", text: "A virtual private network within AWS" }
  ],
  correctAnswer: "C"
},
{
  id: 167,
  question: "Which service enables you to prepare, transform, and load data for analytics?",
  options: [
    { id: "A", text: "AWS Glue" },
    { id: "B", text: "Amazon Redshift" },
    { id: "C", text: "Amazon Athena" },
    { id: "D", text: "Amazon EMR" }
  ],
  correctAnswer: "A"
},
{
  id: 168,
  question: "Which AWS feature provides an automated incident response for security threats?",
  options: [
    { id: "A", text: "Amazon Inspector" },
    { id: "B", text: "AWS Systems Manager" },
    { id: "C", text: "Amazon GuardDuty with AWS Lambda" },
    { id: "D", text: "Amazon Macie" }
  ],
  correctAnswer: "C"
},
{
  id: 169,
  question: "Which AWS support plan includes access to a Technical Account Manager (TAM)?",
  options: [
    { id: "A", text: "Basic" },
    { id: "B", text: "Developer" },
    { id: "C", text: "Business" },
    { id: "D", text: "Enterprise" }
  ],
  correctAnswer: "D"
},
{
  id: 170,
  question: "Which AWS service helps you automate software deployments to a variety of compute services including Amazon EC2, AWS Lambda, and on-premises servers?",
  options: [
    { id: "A", text: "AWS CodeDeploy" },
    { id: "B", text: "AWS CodeBuild" },
    { id: "C", text: "AWS CodePipeline" },
    { id: "D", text: "AWS CloudFormation" }
  ],
  correctAnswer: "A"
}
];

const SimpleAwsQuizApp = () => {
  const [mode, setMode] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [showAnswerCheck, setShowAnswerCheck] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (mode === 'exam' && timeLeft > 0 && !showFinalResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && mode === 'exam' && !showFinalResult) {
      finishExam();
    }
  }, [timeLeft, mode, showFinalResult]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // 전체 문제를 사용하는 퀴즈 모드 시작
  const handleStartFullQuiz = () => {
    setQuizQuestions([...questions]);
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setShowFinalResult(false);
    setShowAnswerCheck(false);
    setIsCorrect(null);
    setMode("quiz");
  };

  // 20문제만 랜덤으로 선택하는 퀴즈 모드 시작
  const handleStart20Quiz = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    setQuizQuestions(selected);
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setShowFinalResult(false);
    setShowAnswerCheck(false);
    setIsCorrect(null);
    setMode("quiz");
  };

  // 시험 모드 시작 (65문제, 90분)
  const handleStartExam = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 65);
    setQuizQuestions(selected);
    setTimeLeft(90 * 60);
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setShowFinalResult(false);
    setShowAnswerCheck(false);
    setIsCorrect(null);
    setMode("exam");
  };

  const handleOptionSelect = (optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuizIndex].id]: optionId
    }));
  };

  const goToNext = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else if (mode === "exam") {
      finishExam();
    }
    setShowAnswerCheck(false);
    setIsCorrect(null);
  };

  const goToPrevious = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setShowAnswerCheck(false);
      setIsCorrect(null);
    }
  };

  const finishExam = () => {
    setShowFinalResult(true);
  };

  const resetQuiz = () => {
    setMode(null);
    setQuizQuestions([]);
    setSelectedAnswers({});
    setCurrentQuizIndex(0);
    setShowFinalResult(false);
    setTimeLeft(90 * 60);
    setShowAnswerCheck(false);
    setIsCorrect(null);
  };

  const getScore = () => {
    return quizQuestions.reduce((score, q) => {
      const answer = selectedAnswers[q.id];
      if (!answer) return score;
      if (q.correctAnswer && q.correctAnswer.includes(',')) {
        const selectedSet = new Set(answer.split(',').map(a => a.trim()).sort());
        const correctSet = new Set(q.correctAnswer.split(',').map(a => a.trim()).sort());
        const isCorrect = [...correctSet].every(c => selectedSet.has(c)) && selectedSet.size === correctSet.size;
        return isCorrect ? score + 1 : score;
      }
      return answer === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  // 설명이 없는 문제에 대한 기본 설명 생성
  const generateDefaultExplanation = (question) => {
    const correctOption = question.options.find(opt => opt.id === question.correctAnswer);
    let explanation = '';
    
    // 여러 정답이 있는 경우 (Choose two)
    if (question.correctAnswer && question.correctAnswer.includes(',')) {
      const correctAnswers = question.correctAnswer.split(',');
      const correctOptions = question.options.filter(opt => correctAnswers.includes(opt.id));
      
      explanation = `이 문제의 정답은 ${correctAnswers.join(', ')}입니다. `;
      
      // 각 정답에 대한 설명 추가
      correctOptions.forEach(opt => {
        explanation += `${opt.id}(${opt.text})는 AWS의 ${getServiceCategory(opt.text)}에 관한 내용으로, 문제의 요구사항을 충족합니다. `;
      });
      
      // 오답에 대한 설명 추가
      explanation += `다른 옵션들은 문제에서 요구하는 정확한 요건을 충족하지 않습니다.`;
    } 
    // 단일 정답인 경우
    else if (correctOption) {
      explanation = `정답은 ${correctOption.id}(${correctOption.text})입니다. `;
      
      // AWS 서비스 관련 문제인 경우
      if (question.question.includes('AWS service')) {
        explanation += `이 서비스는 ${getServiceDescription(correctOption.text)}에 사용됩니다. `;
        explanation += `다른 옵션들은 이 문제의 특정 요구사항을 충족하지 않습니다.`;
      } 
      // 그 외 일반적인 문제
      else {
        explanation += `이 옵션이 문제의 요구사항을 가장 정확하게 충족시키는 답변입니다. `;
        explanation += `AWS 클라우드 환경에서 ${getConceptDescription(question.question)} 관련 질문에서는 주로 이 방식을 권장합니다.`;
      }
    }
    
    return explanation;
  };
  
  // AWS 서비스 분류 헬퍼 함수
  const getServiceCategory = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('s3') || lowerText.includes('storage') || lowerText.includes('glacier')) 
      return '스토리지 서비스';
    if (lowerText.includes('ec2') || lowerText.includes('compute') || lowerText.includes('lambda'))
      return '컴퓨팅 서비스';
    if (lowerText.includes('rds') || lowerText.includes('dynamodb') || lowerText.includes('database'))
      return '데이터베이스 서비스';
    if (lowerText.includes('iam') || lowerText.includes('security') || lowerText.includes('identity'))
      return '보안 및 자격 증명 서비스';
    if (lowerText.includes('cloudwatch') || lowerText.includes('monitor') || lowerText.includes('logging'))
      return '모니터링 서비스';
    return '클라우드 서비스';
  };
  
  // AWS 서비스 설명 헬퍼 함수
  const getServiceDescription = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('s3')) 
      return '객체 스토리지';
    if (lowerText.includes('ec2'))
      return '가상 서버';
    if (lowerText.includes('lambda'))
      return '서버리스 컴퓨팅';
    if (lowerText.includes('rds'))
      return '관계형 데이터베이스';
    if (lowerText.includes('dynamodb'))
      return 'NoSQL 데이터베이스';
    if (lowerText.includes('cloudfront'))
      return '콘텐츠 전송 네트워크(CDN)';
    if (lowerText.includes('iam'))
      return '자격 증명 및 액세스 관리';
    if (lowerText.includes('vpc'))
      return '가상 네트워크 구성';
    if (lowerText.includes('route 53'))
      return 'DNS 및 도메인 관리';
    return '클라우드 인프라 관리';
  };
  
  // 개념 설명 헬퍼 함수
  const getConceptDescription = (question) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('cost') || lowerQuestion.includes('pricing'))
      return '비용 최적화';
    if (lowerQuestion.includes('security') || lowerQuestion.includes('iam'))
      return '보안 관리';
    if (lowerQuestion.includes('high availability') || lowerQuestion.includes('failover'))
      return '고가용성';
    if (lowerQuestion.includes('scaling') || lowerQuestion.includes('elasticity'))
      return '확장성';
    if (lowerQuestion.includes('performance'))
      return '성능 최적화';
    if (lowerQuestion.includes('serverless'))
      return '서버리스 아키텍처';
    if (lowerQuestion.includes('migration'))
      return '마이그레이션 전략';
    if (lowerQuestion.includes('compliance') || lowerQuestion.includes('governance'))
      return '규정 준수 및 거버넌스';
    return 'AWS 서비스 선택 및 구성';
  };

  const checkAnswer = () => {
    const q = quizQuestions[currentQuizIndex];
    const selected = selectedAnswers[q.id];
    if (!selected) {
      alert("답안을 선택해주세요.");
      return;
    }

    if (q.correctAnswer && q.correctAnswer.includes(',')) {
      const selectedSet = new Set(selected.split(',').map(a => a.trim()).sort());
      const correctSet = new Set(q.correctAnswer.split(',').map(a => a.trim()).sort());
      const correct = [...correctSet].every(c => selectedSet.has(c)) && selectedSet.size === correctSet.size;
      setIsCorrect(correct);
    } else {
      setIsCorrect(selected === q.correctAnswer);
    }
    setShowAnswerCheck(true);
  };

  // 초기 화면 (모드 선택)
  if (mode === null) {
    return (
      <div style={{ fontFamily: 'Arial', maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
        <h2>AWS CLF 자격증 시험</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
          <button 
            onClick={handleStartFullQuiz} 
            style={{ 
              padding: '12px 15px', 
              backgroundColor: '#4caf50', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            전체 문제 풀기
          </button>
          <button 
            onClick={handleStart20Quiz} 
            style={{ 
              padding: '12px 15px', 
              backgroundColor: '#1976d2', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            20문제 퀴즈
          </button>
          <button 
            onClick={handleStartExam} 
            style={{ 
              padding: '12px 15px', 
              backgroundColor: '#d32f2f', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            시험 모드 (65문제, 90분)
          </button>
        </div>
      </div>
    );
  }

  // 결과 화면
  if (showFinalResult) {
    const score = getScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div style={{ fontFamily: 'Arial', maxWidth: 600, margin: '50px auto', textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#2e7d32' }}>시험 종료</h1>
        <div style={{ fontSize: '24px', margin: '20px 0', fontWeight: 'bold' }}>
          총 점수: {score} / {quizQuestions.length} ({percentage}%)
        </div>
        <div style={{ fontSize: '18px', marginBottom: '30px' }}>
          {percentage >= 70 ? 
            <span style={{ color: '#2e7d32' }}>🎉 합격입니다! 축하합니다!</span> : 
            <span style={{ color: '#d32f2f' }}>아쉽게도 합격 기준(70%)에 미치지 못했습니다.</span>}
        </div>
        <button 
          onClick={resetQuiz} 
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#388e3c', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          다시 시작
        </button>
      </div>
    );
  }

  // 현재 문제가 없는 경우
  if (!quizQuestions.length || !quizQuestions[currentQuizIndex]) {
    return (
      <div style={{ fontFamily: 'Arial', maxWidth: 600, margin: '100px auto', textAlign: 'center' }}>
        <h2>문제를 로딩 중입니다...</h2>
      </div>
    );
  }

  // 퀴즈/시험 진행 화면
  const current = quizQuestions[currentQuizIndex];
  const selected = selectedAnswers[current.id];

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>{mode === "exam" ? "AWS 자격증 시험 모드" : "AWS 퀴즈"}</h1>

      {mode === "exam" && (
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10, color: '#d32f2f', fontSize: '18px' }}>
          남은 시간: {formatTime(timeLeft)}
        </div>
      )}

      <div style={{
        backgroundColor: '#e0f7fa',
        padding: 10,
        marginBottom: 20,
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div>문제 {currentQuizIndex + 1} / {quizQuestions.length}</div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0 }}>{current.question}</h2>
        {current.options.map(opt => (
          <div key={opt.id} style={{ marginBottom: 10 }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="option"
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => handleOptionSelect(opt.id)}
                style={{ marginRight: '10px', cursor: 'pointer' }}
              />
              <span><strong>{opt.id}.</strong> {opt.text}</span>
            </label>
          </div>
        ))}

        {mode === 'quiz' && (
          <>
            <button
              onClick={checkAnswer}
              style={{
                marginTop: 15,
                width: '100%',
                padding: 12,
                backgroundColor: '#4caf50',
                color: '#fff',
                fontSize: '16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              정답 확인
            </button>
            {showAnswerCheck && (
              <div style={{
                marginTop: 15,
                padding: 10,
                backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
                borderRadius: 4,
                borderLeft: isCorrect ? '4px solid #2e7d32' : '4px solid #c62828'
              }}>
                <div style={{
                  fontWeight: 'bold',
                  color: isCorrect ? '#2e7d32' : '#c62828',
                  marginBottom: isCorrect ? 0 : 10
                }}>
                  {isCorrect ? "✅ 정답입니다!" : `❌ 오답입니다. 정답: ${current.correctAnswer}`}
                </div>
                
                {/* 설명 표시 (올바른 답이든 틀린 답이든 항상 표시) */}
                <div style={{ marginTop: 5 }}>
                  <strong>설명:</strong> {current.explanation ? current.explanation : generateDefaultExplanation(current)}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 20 }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {currentQuizIndex > 0 && (
            <button
              onClick={goToPrevious}
              style={{ 
                flex: 1, 
                padding: 12, 
                backgroundColor: '#9e9e9e', 
                color: '#fff', 
                fontSize: '16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              이전
            </button>
          )}
          <button
            onClick={goToNext}
            style={{ 
              flex: 1, 
              padding: 12, 
              backgroundColor: '#1976d2', 
              color: '#fff', 
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {currentQuizIndex === quizQuestions.length - 1 ? '결과 확인' : '다음'}
          </button>
        </div>
        {mode === 'exam' && (
          <button
            onClick={finishExam}
            style={{ 
              width: '100%', 
              padding: 12, 
              backgroundColor: '#d32f2f', 
              color: '#fff', 
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            시험 종료
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleAwsQuizApp;