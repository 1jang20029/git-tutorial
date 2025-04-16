  import React, { useState, useEffect } from 'react';


  // 실제 질문과 선택지를 반영한 배열
  const questions = [
    {
      id: 1,
      question: "한 회사가 아마존 스노우볼 엣지 디바이스를 사용하여 AWS 클라우드로 파일을 전송할 계획입니다. 스노우볼 엣지 디바이스와 관련된 활동 중 무료로 이용할 수 있는 것은 무엇인가요?",
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
      question: "한 회사가 Amazon EC2 인스턴스에 애플리케이션을 배포했습니다. 회사는 애플리케이션 취약성을 평가하고 모범 사례를 충족하지 않는 인프라 배포를 식별해야 합니다. 이러한 요구 사항을 충족하기 위해 어떤 AWS 서비스를 사용할 수 있나요?",
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
      question: "대규모 파일 저장 요구사항이 있는 중앙 집중식 사용자 그룹이 있는 회사는 현재 가용 공간을 초과했습니다. 회사는 이 그룹을 위해 파일 저장 기능을 확장하면서도 콘텐츠를 로컬로 공유할 때의 성능 이점을 유지하고자 합니다. 이 시나리오에 가장 운영 효율적인 AWS 솔루션은 무엇인가요?",
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
      question: "보안 모범 사례에 따라 Amazon EC2 인스턴스에서 Amazon S3 버킷에 액세스하려면 어떻게 해야 하나요?",
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
      question: "AWS 공유 책임 모델에 따라 Amazon DynamoDB를 사용할 때 고객의 책임은 무엇인가요?",
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
      question: "AWS 클라우드 채택 프레임워크(AWS CAF)의 기본 기능에 포함되는 관점은 무엇인가요?",
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
      question: "한 회사가 Amazon EC2 인스턴스에서 자체 Docker 환경을 운영 및 관리하고 있습니다. 클러스터 크기, 스케줄링, 환경 유지 관리를 돕기 위한 대안을 원하고 있습니다. 이러한 요구 사항을 충족하는 AWS 서비스는 무엇인가요?",
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
      question: "한 회사가 Amazon EC2 인스턴스에서 NoSQL 데이터베이스를 실행하려고 합니다. 이 시나리오에서 AWS의 책임은 무엇인가요?",
      options: [
        { id: "A", text: "Update the guest operating system of the EC2 instances." },
        { id: "B", text: "Maintain high availability at the database layer." },
        { id: "C", text: "Patch the physical infrastructure that hosts the EC2 instances." },
        { id: "D", text: "Configure the security group firewall." }
      ],
      correctAnswer: "C"
    },
    {
      id: 9,
      question: "Amazon EC2 인스턴스의 규모 조정 기회를 식별할 수 있는 AWS 서비스 또는 도구는 무엇입니까? (두 개 선택)",
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
      question: "AWS Trusted Advisor의 이점은 무엇입니까? (두 개 선택)",
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
      question: "온프레미스 워크로드를 AWS 클라우드로 마이그레이션할 때 사용자가 경험하는 이점은 무엇인가요?",
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
      question: "한 회사가 배포된 IT 서비스를 관리하고 인프라를 코드(IaC) 템플릿으로 관리하고자 합니다. 이러한 요구 사항을 충족하는 AWS 서비스는 무엇인가요?",
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
      question: "사용자가 AWS 지출 및 사용량을 시각화, 이해, 관리하는 데 도움을 주는 AWS 서비스 또는 도구는 무엇인가요?",
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
      question: "한 회사가 고객을 위한 여러 유형의 데이터를 관리하는 중앙 데이터 플랫폼을 사용하고 있습니다. 회사는 데이터를 검색, 변환 및 시각화하기 위해 AWS 서비스를 사용하고자 합니다. 이러한 요구 사항을 충족하기 위해 어떤 AWS 서비스 조합을 사용해야 하나요? (두 개 선택)",
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
      question: "글로벌 기업이 서드파티 애플리케이션을 AWS 클라우드로 마이그레이션하려고 합니다. 회사는 AWS 내부 모범 사례에 따라 마이그레이션을 더 빠르고 안정적으로 완료하기 위해 글로벌 전문가 팀의 도움을 원하고 있습니다. 이러한 요구 사항을 충족하는 AWS 서비스 또는 리소스는 무엇인가요?",
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
      question: "전자 학습 플랫폼이 매년 2개월 동안 애플리케이션을 실행해야 합니다. 애플리케이션은 Amazon EC2 인스턴스에 배포됩니다. 해당 2개월 동안 애플리케이션 다운타임을 방지해야 합니다. 이러한 요구 사항을 가장 비용 효율적으로 충족하는 EC2 구매 옵션은 무엇인가요?",
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
      question: "개발자가 AWS에서 필요한 리소스를 수동으로 생성하지 않고 신속하게 애플리케이션을 배포하고자 합니다. 이러한 요구 사항을 충족하는 AWS 서비스는 무엇인가요?",
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
      question: "한 회사가 Amazon S3 버킷에 민감한 고객 데이터를 저장하고 있습니다. 회사는 데이터를 실수로 삭제하거나 덮어쓰는 것을 방지하고자 합니다. 이러한 요구 사항을 충족하기 위해 어떤 S3 기능을 사용해야 하나요?",
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
      question: "인프라를 코드로 관리할 수 있는 기능을 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "온라인 게임 회사가 1년 동안 Amazon EC2 인스턴스를 실행할 구매 옵션을 선택해야 합니다. 웹 트래픽이 일정하고 트래픽 증가를 예측할 수 있습니다. EC2 인스턴스는 중단 없이 온라인 상태여야 합니다. 이러한 요구 사항을 가장 비용 효율적으로 충족하는 EC2 인스턴스 구매 옵션은 무엇인가요?",
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
      question: "사용자가 회사의 온프레미스 데이터 센터와 AWS 클라우드 간에 전용 네트워크 연결을 설정할 수 있는 AWS 서비스 또는 기능은 무엇인가요?",
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
      question: "AWS 글로벌 인프라의 물리적 위치는 무엇인가요?",
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
      question: "한 회사가 위험 평가 및 완화 작업을 수행하면서 AWS 클라우드의 정보, 시스템 및 자산을 보호하고자 합니다. 이러한 목표를 지원하는 AWS Well-Architected 프레임워크의 핵심 요소는 무엇인가요?",
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
      question: "VPC 내부에 인터넷 게이트웨이를 두는 목적은 무엇인가요?",
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
      question: "한 회사가 확장성이 없고 유지 관리가 어려운 모놀리식 온프레미스 애플리케이션을 실행하고 있습니다. 회사는 애플리케이션을 AWS로 마이그레이션하고 마이크로서비스로 분할할 계획입니다. 이 계획은 AWS Well-Architected 프레임워크의 어떤 모범 사례를 따르고 있나요?",
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
      question: "한 회사에 AWS 계정이 있습니다. 회사는 규정 준수를 위해 비밀번호 및 액세스 키 순환 세부 정보를 감사하고자 합니다. 이러한 요구 사항을 충족하는 AWS 서비스 또는 도구는 무엇인가요?",
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
      question: "한 회사가 특정 AWS 비용 임계값에 도달했을 때 알림을 받고자 합니다. 이러한 요구 사항을 충족하기 위해 회사가 사용할 수 있는 AWS 서비스 또는 도구는 무엇입니까? (두 개 선택)",
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
      question: "AWS 사용자들로부터 가장 자주 받는 보안 관련 질문에 대한 답변을 제공하는 AWS 서비스 또는 리소스는 무엇인가요?",
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
      question: "AWS 공유 책임 모델에 따라 고객의 책임인 작업은 무엇입니까? (두 개 선택)",
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
      question: "다음 중 AWS Well-Architected 프레임워크의 핵심 요소는 무엇입니까? (두 개 선택)",
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
      question: "분산 애플리케이션에서 텍스트 및 이메일 메시지를 보내는 데 사용되는 AWS 서비스 또는 기능은 무엇인가요?",
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
      question: "사용자가 AWS CLI 또는 AWS API를 통해 AWS 리소스에 프로그래밍 방식으로 액세스해야 합니다. 사용자에게 적절한 액세스를 제공할 옵션은 무엇인가요?",
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
      question: "한 회사가 AWS Batch를 사용하여 수천 개의 동시 시뮬레이션을 실행합니다. 각 시뮬레이션은 상태 비저장이며 결함 허용성이 있고 최대 3시간 동안 실행됩니다. 이러한 요구 사항을 최적화하고 충족하는 가격 모델은 무엇인가요?",
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
      question: "AWS 클라우드 컴퓨팅에서 민첩성(Agility)의 개념은 무엇을 의미합니까? (두 개 선택)",
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
      question: "한 회사가 SQL 주입 공격을 차단해야 합니다. 이러한 요구 사항을 충족할 수 있는 AWS 서비스 또는 기능은 무엇인가요?",
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
      question: "Amazon S3 버킷 또는 IAM 역할이 외부 엔터티와 공유되었는지 식별할 수 있는 AWS 서비스 또는 기능은 무엇인가요?",
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
      question: "클라우드 실무자가 AWS 클라우드로 환경을 마이그레이션하기 전에 AWS 규정 준수 보고서를 확보해야 합니다. 이러한 보고서는 어떻게 생성할 수 있나요?",
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
      question: "전자상거래 회사가 온프레미스 데이터 센터에서 AWS 클라우드로 IT 인프라를 마이그레이션했습니다. 회사의 직접적인 비용 책임은 무엇인가요?",
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
      question: "한 회사가 AWS 계정에서 AWS Identity and Access Management(IAM)를 설정하고 있습니다. IAM 보안 모범 사례를 준수하는 권장 사항은 무엇인가요?",
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
      question: "AWS 클라우드의 탄력성(Elasticity)은 다음 중 무엇을 의미합니까? (두 개 선택)",
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
      question: "AWS 계정에서 API 호출을 감사할 수 있는 서비스는 무엇인가요?",
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
      question: "AWS 공유 책임 모델에 따라 AWS Lambda를 사용할 때 고객의 책임은 무엇인가요?",
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
      question: "한 회사가 Amazon S3에 5TB의 데이터를 저장하고 있으며, 분석을 위해 간헐적으로 쿼리를 실행할 계획입니다. 이러한 쿼리를 가장 비용 효율적으로 실행할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "추가 비용 없이 사용할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 클라우드 채택 프레임워크(AWS CAF)에서 사람(People) 관점에 속하는 역량은 무엇인가요?",
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
      question: "한 회사가 프로덕션 Amazon EC2 인스턴스의 지속적인 사용을 위해 선불 약정을 하고 전체 비용을 절감하고자 합니다. 가장 낮은 비용으로 이러한 요구 사항을 충족하는 가격 옵션은 무엇입니까? (두 개 선택)",
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
      question: "한 회사가 온프레미스 관계형 데이터베이스를 AWS 클라우드로 마이그레이션하려고 합니다. 회사는 현재 지리적 위치와 최대한 가까운 인프라를 사용하고자 합니다. Amazon RDS 배포 영역을 선택하기 위해 어떤 AWS 서비스 또는 리소스를 사용해야 하나요?",
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
      question: "한 회사가 AWS 클라우드 사용을 탐색하고 있으며, 인프라를 프로비저닝하기 전에 프로젝트에 대한 비용 견적을 생성해야 합니다. 배포 전 비용을 추정하는 데 사용할 수 있는 AWS 서비스 또는 기능은 무엇인가요?",
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
      question: "한 회사가 최소 대기 시간으로 전 세계에 이미지와 비디오를 전달해야 하는 애플리케이션을 구축하고 있습니다. 이를 비용 효율적으로 달성할 수 있는 접근 방식은 무엇인가요?",
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
      question: "클라우드 컴퓨팅의 규모의 경제 이점 중 하나는 무엇인가요?",
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
      question: "회사가 클라우드 리소스를 코드로 정의하고 AWS CloudFormation을 통해 리소스를 프로비저닝하는 데 사용할 수 있는 소프트웨어 개발 프레임워크는 무엇인가요?",
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
      question: "한 회사가 여러 AWS 서비스를 사용하는 애플리케이션을 개발하고 있습니다. 애플리케이션은 다른 AWS API와 인증하기 위해 일시적이고 제한된 권한의 자격 증명을 사용해야 합니다. 이러한 인증 요구 사항을 충족하기 위해 어떤 AWS 서비스 또는 기능을 사용해야 하나요?",
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
      question: "다양한 AWS 서비스 및 파트너 제품의 알림을 표준화된 형식으로 집계하는 클라우드 보안 태세 관리(CSPM) 서비스는 무엇인가요?",
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
      question: "항상 무료로 제공되는 AWS 서비스는 무엇인가요?",
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
      question: "비용을 절감하기 위해 NoSQL 데이터베이스를 AWS로 마이그레이션하려는 회사는 어떤 AWS 서비스를 선택해야 하나요? 이 서비스는 데이터베이스 워크로드 요구 사항에 맞춰 처리량 용량을 자동으로 확장할 수 있는 완전 관리형 서비스입니다.",
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
      question: "한 회사가 Amazon DynamoDB를 사용하고 있습니다. AWS 공유 책임 모델에 따라 회사의 책임은 무엇인가요?",
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
      question: "한 회사에 테스트 AWS 환경이 있습니다. 회사는 AWS 내에서 애플리케이션을 테스트할 계획입니다. 테스트 애플리케이션은 중단될 수 있으며 지속적으로 실행될 필요가 없습니다. 이러한 요구 사항을 가장 비용 효율적으로 충족하는 Amazon EC2 구매 옵션은 무엇인가요?",
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
      question: "Amazon S3 버킷에 저장된 민감한 데이터를 발견하고 보호할 수 있는 능력을 사용자에게 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "인스턴스로의 네트워크 트래픽을 차단하는 데 사용할 수 있는 서비스는 무엇입니까? (두 개 선택)",
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
      question: "Amazon EC2 인스턴스가 종료된 시점을 식별할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "고객이 AWS 환경의 보안을 평가하고 감사하며 잠재적인 보안 위험을 식별할 수 있도록 도와주는 AWS 서비스는 무엇인가요?",
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
      question: "원자 규모에서 재료를 모델링하고 시뮬레이션하는 데 필요한 시간을 줄이는 데 도움을 주는 AWS 서비스는 무엇인가요?",
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
      question: "분산 서비스 거부(DDoS) 공격으로부터 보호하는 데 도움을 주는 AWS 서비스 또는 기능은 무엇인가요?",
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
      question: "개발자가 코드를 빠르고 안정적으로 빌드, 테스트 및 배포할 수 있도록 도와주는 AWS 서비스는 무엇인가요?",
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
      question: "사용자가 거의 액세스하지 않는 Amazon S3의 아카이브된 데이터에 대한 접근을 유지해야 합니다. 이 사용 사례에 가장 비용 효율적인 스토리지 클래스는 무엇인가요?",
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
      question: "서버를 관리하지 않고 컨테이너화된 애플리케이션을 실행할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "한 회사가 언제든지 모든 크기의 데이터를 저장하고 검색해야 합니다. 어떤 AWS 서비스를 사용해야 하나요?",
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
      question: "페타바이트 규모의 데이터를 AWS로 이동하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
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
      question: "애플리케이션 업데이트의 지속적인 전달 및 통합을 가능하게 하는 AWS 서비스는 무엇인가요?",
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
      question: "SSL/TLS 인증서의 생성 및 관리를 간소화하는 AWS 서비스는 무엇인가요?",
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
      question: "컨테이너화된 애플리케이션을 실행하기 위한 관리형 보안 환경을 제공하는 서비스는 무엇인가요?",
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
      question: "AWS 리소스 및 애플리케이션의 실시간 모니터링 및 가시성을 가능하게 하는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 리소스의 구성 및 관리를 자동화하는 데 사용할 수 있는 것은 무엇인가요?",
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
      question: "서버를 프로비저닝하거나 관리하지 않고 애플리케이션을 빌드 및 실행할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "완전 관리형의 페타바이트 규모 데이터 웨어하우스 솔루션인 AWS 서비스는 무엇인가요?",
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
      question: "사용자 ID와 액세스 권한을 안전하게 관리할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "한 회사가 여러 AWS 리전에서 웹 애플리케이션을 실행하려고 합니다. 사용자 트래픽을 가장 가까운 AWS 리전으로 라우팅하는 데 도움을 줄 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "코드 작성 없이 AWS 리소스를 생성 및 관리할 수 있는 시각적 인터페이스를 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "사용자가 여러 AWS 계정을 중앙에서 관리할 수 있게 해주는 AWS 기능은 무엇인가요?",
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
      question: "사용자가 Amazon S3의 데이터를 표준 SQL을 사용하여 쿼리할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 리소스의 비용과 성능을 최적화하는 데 도움을 주는 권장 사항을 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "이메일 메시지를 보내는 데 사용되는 AWS 서비스는 무엇인가요?",
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
      question: "클라우드에서 관계형 데이터베이스를 실행하기 위한 관리형 환경을 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "수요에 따라 EC2 인스턴스의 자동 확장을 가능하게 하는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 서비스 사용에 대한 월간 비용을 추정할 수 있는 AWS 도구는 무엇인가요?",
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
      question: "스트리밍 데이터의 실시간 분석을 허용하는 AWS 서비스는 무엇인가요?",
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
      question: "회사가 클라우드에 파일과 객체를 저장하는 데 사용해야 하는 AWS 서비스는 무엇인가요?",
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
      question: "사용자 ID를 기반으로 리소스에 대한 액세스를 제한하는 데 사용할 수 있는 AWS 기능은 무엇인가요?",
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
      question: "개발자가 Git 기반 소스 코드 저장소를 저장 및 관리할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "Amazon Route 53이 제공하는 서비스는 무엇인가요?",
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
      question: "코드를 사용하여 인프라를 프로비저닝 및 관리하는 데 사용되는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 환경에서 보안 검색 결과를 식별하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
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
      question: "24시간 Cloud Support 엔지니어에 대한 액세스를 제공하는 AWS 지원 플랜은 무엇인가요?",
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
      question: "여러 AWS 계정에 대한 정책을 설정할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "공유 책임 모델에 따라 AWS의 책임인 항목은 무엇인가요?",
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
      question: "여러 소스의 로그를 분석하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
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
      question: "데이터 센터와 AWS 간에 개인 네트워크 연결을 생성할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "정적 웹 콘텐츠를 낮은 대기 시간으로 전송하는 데 가장 적합한 AWS 서비스는 무엇인가요?",
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
      question: "AWS 서비스의 사용 및 비용 세부 정보가 포함된 상세 청구 보고서를 제공하는 도구는 무엇인가요?",
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
      question: "애플리케이션의 보안 및 규정 준수를 개선하기 위해 보안 평가를 자동화할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 클라우드에서 가상 서버를 시작하고 관리하는 데 사용할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "서버를 프로비저닝하거나 관리하지 않고 코드를 실행할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "Amazon RDS의 어떤 기능이 자동 백업, 데이터베이스 스냅샷 및 특정 시점 복구에 도움을 줍니까?",
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
      question: "악의적인 웹 트래픽을 필터링하여 애플리케이션을 보호하는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 글로벌 인프라 사용의 이점 중 하나는 무엇인가요?",
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
      question: "AWS 지출을 이해하고 비용 최적화 기회를 식별하는 데 도움을 주는 AWS 도구는 무엇인가요?",
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
      question: "높은 내구성, 가용성 및 확장성을 갖춘 객체 스토리지용으로 설계된 AWS 서비스는 무엇인가요?",
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
      question: "지정된 기술 지원 관리자(TAM)를 제공하는 AWS 지원 플랜은 무엇인가요?",
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
      question: "AWS에서 가용성 영역(Availability Zone)이란 무엇인가요?",
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
      question: "메시징을 통해 애플리케이션 구성 요소를 분리할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "데이터베이스를 AWS로 빠르고 안전하게 마이그레이션하는 것을 더 쉽게 만드는 AWS 서비스는 무엇인가요?",
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
      question: "관리형 Kubernetes 클러스터를 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "낮은 대기 시간과 높은 전송 속도로 콘텐츠 전송을 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "서버나 클러스터를 관리하지 않고 컨테이너화된 애플리케이션을 실행할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "Amazon VPC가 할 수 있는 일은 무엇인가요?",
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
      question: "Apache Hadoop 및 Spark와 같은 빅데이터 프레임워크를 실행할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "사용자 ID와 권한을 안전하게 관리하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
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
      question: "다양한 컴퓨팅 서비스에 소프트웨어 배포를 자동화할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "데이터 웨어하우징 및 분석에 적합한 AWS 서비스는 무엇인가요?",
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
      question: "AWS 리소스 및 애플리케이션에 대한 알람을 설정하고 모니터링할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "Docker를 사용하여 컨테이너화된 애플리케이션을 실행할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 사용량 및 청구 정보를 확인하는 데 사용할 수 있는 서비스는 무엇인가요?",
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
      question: "성능과 확장성에 최적화된 관리형 분산 데이터베이스를 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 환경에서 사용자 활동을 추적하고 로깅하는 데 도움을 주는 AWS 도구는 무엇인가요?",
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
      question: "자주 액세스되지 않는 데이터에 가장 적합한 Amazon S3 스토리지 클래스는 무엇인가요?",
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
      question: "Amazon EC2의 어떤 기능이 인스턴스가 장애로부터 자동으로 복구할 수 있게 해줍니까?",
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
      question: "ML 알고리즘에 대한 깊은 지식 없이 머신러닝 모델을 사용할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "AWS Organizations 사용의 이점 중 하나는 무엇인가요?",
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
      question: "S3 버킷의 데이터 변경과 같은 이벤트에 대응하여 코드를 실행할 수 있게 해주는 서비스는 무엇인가요?",
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
      question: "웹 애플리케이션의 세션 상태 데이터를 저장하는 데 가장 적합한 AWS 서비스는 무엇인가요?",
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
      question: "관리형 도메인 이름 시스템(DNS) 웹 서비스인 AWS 서비스는 무엇인가요?",
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
      question: "가상 데스크톱 인프라(VDI) 솔루션을 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "AWS에서 페타바이트 규모의 데이터 웨어하우스 솔루션을 제공하는 서비스는 무엇인가요?",
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
      question: "AWS에 배포된 애플리케이션의 보안을 개선하기 위해 자동화된 보안 평가를 제공하는 도구는 무엇인가요?",
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
      question: "다음 중 AWS 공유 책임 모델을 가장 잘 설명하는 것은 무엇인가요?",
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
      question: "코드를 사용하여 인프라 배포를 자동화할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 사용량의 월간 비용을 추정하는 데 도움을 주는 AWS 도구는 무엇인가요?",
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
      question: "여러 EC2 인스턴스가 동시에 액세스할 수 있는 확장 가능한 파일 스토리지를 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "지속적 통합 및 지속적 전달(CI/CD)에 사용되는 AWS 서비스는 무엇인가요?",
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
      question: "확장 가능한 메시지 대기열 서비스를 제공하는 AWS 서비스는 무엇인가요?",
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
      question: "AWS 계정, 정책 및 통합 청구를 중앙에서 보고 관리할 수 있게 해주는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS IAM" },
        { id: "B", text: "AWS Control Tower" },
        { id: "C", text: "AWS Organizations" },
        { id: "D", text: "AWS Service Catalog" }
      ],
      correctAnswer: "C"
    },
    {
      id: 142,
      question: "머신러닝 기반으로 AWS 계정의 이상 현상을 감지하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon Macie" },
        { id: "B", text: "Amazon GuardDuty" },
        { id: "C", text: "AWS Config" },
        { id: "D", text: "Amazon Lookout for Metrics" }
      ],
      correctAnswer: "D"
    },
    {
      id: 143,
      question: "다음 중 AWS 클라우드의 이점은 무엇인가요?",
      options: [
        { id: "A", text: "High latency network connections" },
        { id: "B", text: "Manual provisioning of infrastructure" },
        { id: "C", text: "Increased capital expenditures" },
        { id: "D", text: "Go global in minutes" }
      ],
      correctAnswer: "D"
    },
    {
      id: 144,
      question: "개발자가 서버를 프로비저닝하거나 관리하지 않고 코드를 실행할 수 있게 해주는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon EC2" },
        { id: "B", text: "Amazon RDS" },
        { id: "C", text: "AWS Lambda" },
        { id: "D", text: "AWS Elastic Beanstalk" }
      ],
      correctAnswer: "C"
    },
    {
      id: 145,
      question: "Amazon CloudFront를 사용하는 목적은 무엇인가요?",
      options: [
        { id: "A", text: "To deploy applications" },
        { id: "B", text: "To monitor network traffic" },
        { id: "C", text: "To deliver content with low latency" },
        { id: "D", text: "To store large amounts of data" }
      ],
      correctAnswer: "C"
    },
    {
      id: 146,
      question: "AWS에서 가용성 영역(Availability Zone)이란 무엇인가요?",
      options: [
        { id: "A", text: "A geographical area that consists of two or more data centers" },
        { id: "B", text: "A physical location where AWS clusters data centers" },
        { id: "C", text: "One or more discrete data centers with redundant power, networking, and connectivity" },
        { id: "D", text: "A virtual private network within AWS" }
      ],
      correctAnswer: "C"
    },
    {
      id: 147,
      question: "데이터 분석을 위해 데이터를 준비, 변환 및 로드할 수 있게 해주는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Glue" },
        { id: "B", text: "Amazon Redshift" },
        { id: "C", text: "Amazon Athena" },
        { id: "D", text: "Amazon EMR" }
      ],
      correctAnswer: "A"
    },
    {
      id: 148,
      question: "보안 위협에 대한 자동화된 인시던트 대응을 제공하는 AWS 기능은 무엇인가요?",
      options: [
        { id: "A", text: "Amazon Inspector" },
        { id: "B", text: "AWS Systems Manager" },
        { id: "C", text: "Amazon GuardDuty with AWS Lambda" },
        { id: "D", text: "Amazon Macie" }
      ],
      correctAnswer: "C"
    },
    {
      id: 149,
      question: "기술 지원 관리자(TAM)에 대한 액세스를 포함하는 AWS 지원 플랜은 무엇인가요?",
      options: [
        { id: "A", text: "Basic" },
        { id: "B", text: "Developer" },
        { id: "C", text: "Business" },
        { id: "D", text: "Enterprise" }
      ],
      correctAnswer: "D"
    },
    {
      id: 150,
      question: "1년 또는 3년 동안 예측 가능한 컴퓨팅 용량이 필요한 애플리케이션에 사용해야 하는 가격 모델은 무엇인가요?",
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
      question: "고유한 도메인 이름을 정의하고 인터넷 트래픽을 리소스로 라우팅할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "지표, 로그 및 이벤트를 수집하고 추적할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "애플리케이션에 대화형 인터페이스를 구축할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "물리적 장치를 사용하여 대용량 데이터를 AWS로 전송할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "Amazon SQS를 사용하여 애플리케이션을 분리함으로써 얻을 수 있는 이점은 무엇인가요?",
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
      question: "비즈니스 분석 및 비즈니스 인텔리전스(BI)에 가장 적합한 AWS 서비스는 무엇인가요?",
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
      question: "비용을 절감하고 시스템 성능을 개선하는 데 도움을 주는 권장 사항을 제공하는 서비스는 무엇인가요?",
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
      question: "여러 대상에 걸쳐 들어오는 트래픽을 자동으로 분산할 수 있는 AWS 서비스는 무엇인가요?",
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
      question: "재해 발생 시 다른 AWS 리전의 리소스를 복구할 수 있게 해주는 AWS 기능은 무엇인가요?",
      options: [
        { id: "A", text: "Cross-Region Replication" },
        { id: "B", text: "Amazon S3 Lifecycle Policy" },
        { id: "C", text: "Elastic Load Balancing" },
        { id: "D", text: "Amazon CloudFront" }
      ],
      correctAnswer: "A"
    },
    {
      id: 161,
      question: "AWS 계정, 정책 및 통합 청구를 중앙에서 보고 관리할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "머신러닝 기반으로 AWS 계정의 이상 현상을 감지하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
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
      question: "다음 중 AWS 클라우드의 이점은 무엇인가요?",
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
      question: "개발자가 서버를 프로비저닝하거나 관리하지 않고 코드를 실행할 수 있게 해주는 AWS 서비스는 무엇인가요?",
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
      question: "Amazon CloudFront를 사용하는 목적은 무엇인가요?",
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
      question: "AWS에서 가용성 영역(Availability Zone)이란 무엇인가요?",
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
      question: "데이터 분석을 위해 데이터를 준비, 변환 및 로드할 수 있게 해주는 서비스는 무엇인가요?",
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
      question: "보안 위협에 대한 자동화된 인시던트 대응을 제공하는 AWS 기능은 무엇인가요?",
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
      question: "기술 지원 관리자(TAM)에 대한 액세스를 포함하는 AWS 지원 플랜은 무엇인가요?",
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
      question: "Amazon EC2, AWS Lambda, 온프레미스 서버를 포함한 다양한 컴퓨팅 서비스에 소프트웨어 배포를 자동화하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS CodeDeploy" },
        { id: "B", text: "AWS CodeBuild" },
        { id: "C", text: "AWS CodePipeline" },
        { id: "D", text: "AWS CloudFormation" }
      ],
      correctAnswer: "A"
    },
    {
      id: 171,
      question: "컨테이너화된 애플리케이션을 실행하는 관리형 Kubernetes 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon EC2" },
        { id: "B", text: "Amazon ECS" },
        { id: "C", text: "Amazon EKS" },
        { id: "D", text: "AWS Fargate" }
      ],
      correctAnswer: "C"
    },
    {
      id: 172,
      question: "AWS 리소스의 상태와 성능을 모니터링하는 데 사용되는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS CloudTrail" },
        { id: "B", text: "Amazon CloudWatch" },
        { id: "C", text: "AWS Config" },
        { id: "D", text: "AWS X-Ray" }
      ],
      correctAnswer: "B"
    },
    {
      id: 173,
      question: "DNS 라우팅 및 상태 확인을 제공하는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon VPC" },
        { id: "B", text: "Amazon CloudFront" },
        { id: "C", text: "Amazon Route 53" },
        { id: "D", text: "AWS Transit Gateway" }
      ],
      correctAnswer: "C"
    },
    {
      id: 174,
      question: "정적 웹 사이트 호스팅에 가장 적합한 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon EC2" },
        { id: "B", text: "Amazon RDS" },
        { id: "C", text: "Amazon S3" },
        { id: "D", text: "Amazon VPC" }
      ],
      correctAnswer: "C"
    },
    {
      id: 175,
      question: "클라우드 마이그레이션을 계획하는 기업을 위한 지침을 제공하는 프레임워크는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Well-Architected Framework" },
        { id: "B", text: "AWS CAF (Cloud Adoption Framework)" },
        { id: "C", text: "AWS Migration Acceleration Program" },
        { id: "D", text: "AWS Professional Services" }
      ],
      correctAnswer: "B"
    },
    {
      id: 176,
      question: "애플리케이션의 성능과 사용량을 분석할 수 있는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS X-Ray" },
        { id: "B", text: "Amazon CloudWatch" },
        { id: "C", text: "AWS CloudTrail" },
        { id: "D", text: "AWS Config" }
      ],
      correctAnswer: "A"
    },
    {
      id: 177,
      question: "AWS 보안 모범 사례에 따라 S3 버킷의 데이터를 보호하는 방법은 무엇인가요?",
      options: [
        { id: "A", text: "Use public access settings" },
        { id: "B", text: "Use S3 Versioning" },
        { id: "C", text: "Use bucket policy" },
        { id: "D", text: "Use server-side encryption" }
      ],
      correctAnswer: "B"
    },
    {
      id: 178,
      question: "AWS 리소스의 구성을 추적하고 변경 사항을 평가하는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS CloudTrail" },
        { id: "B", text: "AWS Config" },
        { id: "C", text: "Amazon CloudWatch" },
        { id: "D", text: "AWS IAM" }
      ],
      correctAnswer: "B"
    },
    {
      id: 179,
      question: "EC2 인스턴스의 관리 및 자동화를 지원하는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS CloudFormation" },
        { id: "B", text: "AWS Systems Manager" },
        { id: "C", text: "AWS OpsWorks" },
        { id: "D", text: "Amazon EC2 Auto Scaling" }
      ],
      correctAnswer: "B"
    },
    {
      id: 180,
      question: "사용자 정의 도메인 이름을 사용하여 웹 애플리케이션에 대한 DNS 라우팅을 구성할 수 있는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon CloudFront" },
        { id: "B", text: "AWS Route 53" },
        { id: "C", text: "Amazon API Gateway" },
        { id: "D", text: "AWS Certificate Manager" }
      ],
      correctAnswer: "B"
    },
    {
      id: 181,
      question: "AWS 리소스의 구성을 중앙에서 관리하고 모니터링할 수 있게 해주는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS IAM" },
        { id: "B", text: "AWS Organizations" },
        { id: "C", text: "AWS Control Tower" },
        { id: "D", text: "AWS Resource Groups" }
      ],
      correctAnswer: "C"
    },
    {
      id: 182,
      question: "AWS에서 데이터베이스 마이그레이션을 지원하고 가속화하는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Database Migration Service (DMS)" },
        { id: "B", text: "Amazon RDS" },
        { id: "C", text: "AWS Schema Conversion Tool" },
        { id: "D", text: "Amazon Redshift" }
      ],
      correctAnswer: "A"
    },
    {
      id: 183,
      question: "컨테이너화된 애플리케이션의 배포, 관리 및 확장을 자동화하는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Lambda" },
        { id: "B", text: "Amazon ECS" },
        { id: "C", text: "Amazon EC2" },
        { id: "D", text: "AWS Fargate" }
      ],
      correctAnswer: "B"
    },
    {
      id: 184,
      question: "중요한 애플리케이션의 안정성과 가용성을 보장하기 위해 여러 가용 영역에 걸쳐 리소스를 배포하는 AWS 기능은 무엇인가요?",
      options: [
        { id: "A", text: "Auto Scaling" },
        { id: "B", text: "Multi-AZ Deployment" },
        { id: "C", text: "Cross-Region Replication" },
        { id: "D", text: "Elastic Load Balancing" }
      ],
      correctAnswer: "B"
    },
    {
      id: 185,
      question: "보안 모범 사례에 따라 AWS 리소스에 대한 액세스를 제한하는 가장 좋은 방법은 무엇인가요?",
      options: [
        { id: "A", text: "Use root account credentials" },
        { id: "B", text: "Grant broad permissions to all users" },
        { id: "C", text: "Apply least privilege principle" },
        { id: "D", text: "Share access keys publicly" }
      ],
      correctAnswer: "C"
    },
    {
      id: 186,
      question: "다양한 소스의 로그를 분석하고 통합할 수 있는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS CloudTrail" },
        { id: "B", text: "Amazon CloudWatch Logs" },
        { id: "C", text: "AWS Config" },
        { id: "D", text: "Amazon S3" }
      ],
      correctAnswer: "B"
    },
    {
      id: 187,
      question: "클라우드 리소스의 비용을 추적하고 관리하는 데 도움을 주는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Budgets" },
        { id: "B", text: "AWS Cost Explorer" },
        { id: "C", text: "AWS Pricing Calculator" },
        { id: "D", text: "AWS Organizations" }
      ],
      correctAnswer: "B"
    },
    {
      id: 188,
      question: "대규모 데이터 세트에 대해 복잡한 분석 쿼리를 실행할 수 있는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon Athena" },
        { id: "B", text: "Amazon Redshift" },
        { id: "C", text: "Amazon EMR" },
        { id: "D", text: "AWS Glue" }
      ],
      correctAnswer: "B"
    },
    {
      id: 189,
      question: "DevOps 팀이 애플리케이션 배포를 자동화할 수 있는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS CodePipeline" },
        { id: "B", text: "AWS CodeDeploy" },
        { id: "C", text: "AWS CodeBuild" },
        { id: "D", text: "AWS CodeCommit" }
      ],
      correctAnswer: "A"
    },
    {
      id: 190,
      question: "AWS에서 서버리스 워크플로우를 오케스트레이션할 수 있는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Lambda" },
        { id: "B", text: "AWS Step Functions" },
        { id: "C", text: "Amazon EventBridge" },
        { id: "D", text: "Amazon SQS" }
      ],
      correctAnswer: "B"
    },
    {
      id: 191,
      question: "AWS 환경에서 AI 기반 머신러닝 모델을 쉽게 개발하고 배포할 수 있게 해주는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon Rekognition" },
        { id: "B", text: "Amazon SageMaker" },
        { id: "C", text: "Amazon Comprehend" },
        { id: "D", text: "Amazon Lex" }
      ],
      correctAnswer: "B"
    },
    {
      id: 192,
      question: "AWS 리소스의 보안 취약점을 지속적으로 평가하는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Config" },
        { id: "B", text: "Amazon Inspector" },
        { id: "C", text: "AWS Security Hub" },
        { id: "D", text: "Amazon GuardDuty" }
      ],
      correctAnswer: "B"
    },
    {
      id: 193,
      question: "여러 AWS 계정에 걸쳐 중앙 집중식 거버넌스를 제공하는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS IAM" },
        { id: "B", text: "AWS Organizations" },
        { id: "C", text: "AWS Control Tower" },
        { id: "D", text: "AWS Service Catalog" }
      ],
      correctAnswer: "B"
    },
    {
      id: 194,
      question: "AWS 클라우드에서 파일 공유 및 협업을 지원하는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon WorkDocs" },
        { id: "B", text: "Amazon S3" },
        { id: "C", text: "Amazon EFS" },
        { id: "D", text: "AWS Storage Gateway" }
      ],
      correctAnswer: "A"
    },
    {
      id: 195,
      question: "웹 및 모바일 애플리케이션을 위한 사용자 인증 및 권한 부여를 관리하는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Cognito" },
        { id: "B", text: "AWS IAM" },
        { id: "C", text: "AWS Single Sign-On" },
        { id: "D", text: "AWS Directory Service" }
      ],
      correctAnswer: "A"
    },
    {
      id: 196,
      question: "글로벌 애플리케이션의 성능을 개선하기 위해 DNS 라우팅을 최적화하는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon CloudFront" },
        { id: "B", text: "AWS Global Accelerator" },
        { id: "C", text: "Amazon Route 53" },
        { id: "D", text: "AWS Transit Gateway" }
      ],
      correctAnswer: "B"
    },
    {
      id: 197,
      question: "실시간 스트리밍 데이터 처리를 지원하는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon Kinesis" },
        { id: "B", text: "AWS Lambda" },
        { id: "C", text: "Amazon SQS" },
        { id: "D", text: "Amazon SNS" }
      ],
      correctAnswer: "A"
    },
    {
      id: 198,
      question: "비즈니스 인텔리전스와 데이터 시각화를 위한 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "Amazon QuickSight" },
        { id: "B", text: "Amazon Redshift" },
        { id: "C", text: "AWS Glue" },
        { id: "D", text: "Amazon Athena" }
      ],
      correctAnswer: "A"
    },
    {
      id: 199,
      question: "AWS에서 마이크로서비스 아키텍처를 구현하는 데 도움을 주는 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Lambda" },
        { id: "B", text: "Amazon ECS" },
        { id: "C", text: "Amazon API Gateway" },
        { id: "D", text: "AWS Step Functions" }
      ],
      correctAnswer: "C"
    },
    {
      id: 200,
      question: "보안 규정 준수 및 감사 요구 사항을 지원하는 AWS 서비스는 무엇인가요?",
      options: [
        { id: "A", text: "AWS Artifact" },
        { id: "B", text: "AWS Security Hub" },
        { id: "C", text: "AWS Audit Manager" },
        { id: "D", text: "AWS Config" }
      ],
      correctAnswer: "A"
    }
  ];

  
function AwsQuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerRunning) setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const styles = {
    container: { maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' },
    timer: { position: 'absolute', top: '10px', right: '20px', fontWeight: 'bold', color: '#4361ee' },
    header: { fontSize: '24px', fontWeight: 'bold' },
    progressBar: { height: '8px', background: '#e0e0e0', borderRadius: '4px', margin: '10px 0', overflow: 'hidden' },
    progressFill: percent => ({ height: '100%', width: `${percent}%`, backgroundColor: '#4361ee', transition: 'width 0.3s ease' }),
    option: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' },
    selected: { backgroundColor: '#e6f0ff', borderColor: '#4361ee' },
    correct: { backgroundColor: '#d4edda', borderColor: '#28a745' },
    incorrect: { backgroundColor: '#f8d7da', borderColor: '#dc3545' },
    explanation: { fontSize: '14px', marginTop: '8px', color: '#333' },
    questionExplanation: {
      backgroundColor: '#f5f5f5',
      borderLeft: '6px solid #4361ee',
      padding: '12px',
      borderRadius: '6px',
      marginTop: '20px',
      fontSize: '14px'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    prev: { backgroundColor: '#6c757d', color: 'white' },
    next: { backgroundColor: '#4361ee', color: 'white' },
    submit: { backgroundColor: '#38b000', color: 'white' },
    check: { backgroundColor: '#ffb703', color: 'black' }
  };

  const handleOptionSelect = (qid, oid) => {
    if (showAnswer || showResults) return;
    const isMulti = questions.find(q => q.id === qid).correctAnswer.includes(',');
    setSelections(prev => {
      const current = prev[qid] || [];
      if (isMulti) {
        return {
          ...prev,
          [qid]: current.includes(oid)
            ? current.filter(o => o !== oid)
            : [...current, oid]
        };
      } else {
        return { ...prev, [qid]: [oid] };
      }
    });
  };

  const isSelected = (qid, oid) => selections[qid]?.includes(oid);

  const handleNext = () => {
    setCurrentQuestionIndex(i => i + 1);
    setShowAnswer(false);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(i => i - 1);
    setShowAnswer(false);
  };

  const handleSubmit = () => {
    let correct = 0, incorrect = 0;
    questions.forEach(q => {
      const user = selections[q.id] || [];
      const answer = q.correctAnswer.split(',');
      const isCorrect = answer.length === user.length && answer.every(a => user.includes(a));
      isCorrect ? correct++ : incorrect++;
    });
    setResults({ correct, incorrect, total: questions.length });
    setShowResults(true);
    setIsTimerRunning(false);
  };

  const resetQuiz = () => {
    setSelections({});
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setShowResults(false);
    setElapsedTime(0);
    setIsTimerRunning(true);
  };

  const q = questions[currentQuestionIndex];

  return (
    <div style={styles.container}>
      <div style={styles.timer}>{formatTime(elapsedTime)}</div>

      <h1 style={styles.header}>AWS 자격증 시험 준비 퀴즈</h1>
      <div>문제 {currentQuestionIndex + 1} / {questions.length}</div>

      <div style={styles.progressBar}>
        <div style={styles.progressFill(((currentQuestionIndex + 1) / questions.length) * 100)} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <strong>{q.id}. </strong>{q.question}
      </div>

      {q.options.map(opt => {
        const selected = isSelected(q.id, opt.id);
        const isCorrect = q.correctAnswer.split(',').includes(opt.id);
        const style = {
          ...styles.option,
          ...(selected && !showAnswer ? styles.selected : {}),
          ...(showAnswer && isCorrect ? styles.correct : {}),
          ...(showAnswer && selected && !isCorrect ? styles.incorrect : {})
        };
        return (
          <div key={opt.id} onClick={() => handleOptionSelect(q.id, opt.id)} style={style}>
            <strong>{opt.id}. </strong>{opt.text}
            {showAnswer && opt.explanation && (
              <div style={styles.explanation}>💬 {opt.explanation}</div>
            )}
          </div>
        );
      })}

      {/* ✅ 문제 해설 표시 */}
      {showAnswer && q.explanation && (
        <div style={styles.questionExplanation}>
          📘 <strong>문제 해설:</strong> {q.explanation}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0} style={{ ...styles.button, ...styles.prev }}>이전 문제</button>
        <button onClick={() => setShowAnswer(true)} style={{ ...styles.button, ...styles.check }}>정답 확인</button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} style={{ ...styles.button, ...styles.next }}>다음 문제</button>
        ) : (
          <button onClick={handleSubmit} style={{ ...styles.button, ...styles.submit }}>제출하기</button>
        )}
      </div>

      {showResults && (
        <div style={{ marginTop: '40px' }}>
          <h2>퀴즈 결과</h2>
          <p>정답: {results.correct}개 / 오답: {results.incorrect}개 / 총 {results.total}문제</p>
          <p>총 소요 시간: {formatTime(elapsedTime)}</p>
          <button style={{ ...styles.button, ...styles.next }} onClick={resetQuiz}>다시 시작하기</button>
        </div>
      )}
    </div>
  );
}

export default AwsQuizApp;