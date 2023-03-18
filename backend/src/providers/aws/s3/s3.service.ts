import { Injectable, UseFilters } from '@nestjs/common';
import AWS from 'aws-sdk';
import { GlobalFilter } from '@src/lib/global.filter';

@UseFilters(new GlobalFilter())
@Injectable()
export class S3Service {
  constructor() {}

  awsConfig() {
    AWS.config.update({
      region: process.env.S3_REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.S3_IDENTITY_POOL_ID,
      }),
    });
  }

  async s3Upload(fileUploadDto: any): Promise<string> {
    const { _id, file } = fileUploadDto;
    this.awsConfig();

    const s3 = new AWS.S3();
    const { originalname } = file;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `4u-recipe/foods/${originalname}`,
      ACL: 'public-read',
      Body: file.buffer,
    };
    const { Location } = await s3.upload(params).promise();
    return Location;
  }
}
