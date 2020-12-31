## Micro Frontend with react and vue

### AWS set up

- S3
  - S3 버킷을 만든다
  - property에서 static website hosting => enabled
  - index document => index.html error document => index.html
  - permission에서 block public access unchecked
  - bucket policy edit
    - S3 bucket policy
    - principal \*
    - actions getobject
    - bucket arn 뒤에서 보고 입력하고 뒤에 /\* 입력
    - genarate 하고 뒤에가서 붙여넣기
- CloudFront
  - web 생성
  - origin domain name => S3 버킷 선택
  - viewer protocol policy => redirect http to https
  - ssl 커스텀 도메인 있으면 적어주면 됨
  - general edit default root object => /container/latest/index.html
  - invalidation
    - create => /container/latest/index.html
  - error pages
    - 403
    - customize error response => /container/latest/index.html => 200
- IAM

  - create => programmartic access => check
  - attach existing policy
  - AmazonS3FullAccess
  - CloudFrontFullAccess
  - create => you can get access and secret key

- github actions
  - settings => secret key 생성 해서 환경변수 넣는다
