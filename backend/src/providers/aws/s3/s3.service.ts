import { Injectable, UseFilters } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { GlobalFilter } from '@src/lib/global.filter';
import { v4 as uuidv4 } from 'uuid';

@UseFilters(new GlobalFilter())
@Injectable()
export class S3Service {
  constructor() {}

  awsConfig() {
    AWS.config.update({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  async s3Upload(fileUploadDto: any): Promise<string> {
    const { file } = fileUploadDto;

    this.awsConfig();
    const s3 = new AWS.S3();
    const { buffer } = file[0];
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `foods/${uuidv4()}`,
      ACL: 'public-read',
      Body: buffer,
    };
    const { Location } = await s3.upload(params).promise();
    return Location;
  }
}
