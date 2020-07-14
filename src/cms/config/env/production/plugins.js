module.exports = ({ env }) => ({
    upload: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('ACCESS_KEY'),
        secretAccessKey: env('SECRET_KEY'),
        region: 'eu-west-1',
        params: {
          Bucket: 'static-jwnwilson.co.uk',
        },
      },
    }
  });