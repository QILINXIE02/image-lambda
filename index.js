import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';  

export const handler = async (event) => {
  const s3Client = new S3Client({region: 'us-west-2'});
  
  try {
    // Extracting image details from the S3 event
    const name = event.Records[0].s3.object.key;
    const size = event.Records[0].s3.object.size;
    const type = '.jpg';
    const newImageDetails = { name, size, type };
    console.log('New image details:', newImageDetails);
    
    // Retrieve existing image details from images.json file in S3 bucket
    const getObjectParams = {
      Bucket: 'qilinlab17',
      Key: 'images.json',
    };
    let imageDetails = [];
    try {
      const getObjectCommand = new GetObjectCommand(getObjectParams);
      const { Body } = await s3Client.send(getObjectCommand);
      imageDetails = JSON.parse(Buffer.from(Body).toString());
    } catch (error) {
      console.error('Failed to retrieve image details:', error);
    }
    
    // Add new image details to the array
    imageDetails.push(newImageDetails);
    console.log('Updated image details array:', imageDetails);
    
    // Save updated image details back to images.json file in S3 bucket
    const putObjectParams = {
      ...getObjectParams,
      Body: JSON.stringify(imageDetails),
      ContentType: 'application/json'
    };
    await s3Client.send(new PutObjectCommand(putObjectParams));
    
    return {
      statusCode: 200,
      body: JSON.stringify(imageDetails),
    };
  } catch (error) {
    console.error('Error processing S3 event:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
