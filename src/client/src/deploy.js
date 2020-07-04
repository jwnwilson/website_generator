const awsCli = require('aws-cli-js');
const config = require('dotenv').config()
const Options = awsCli.Options;
const Aws = awsCli.Aws;
const region = 'us-west-2';
const staticFolder = '../client/public';
const s3Bucket = "jwnwilson.co.uk";
const options = new Options(
/* accessKey */ process.env.ACCESS_KEY,
/* secretKey */ process.env.SECRET_KEY,
);

const copyToS3 = () => {
    console.log(`deploying to: ${s3Bucket}`);
    const aws = new Aws(options);

    aws.command(`s3 cp ${staticFolder} s3://${s3Bucket} --recursive`)
    .then(function (data) {
        console.log(JSON.stringify(data.raw));
    });
}

copyToS3();