import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Since aws-sdk v3 no need to declare all of these
// const SES_CONFIG = {
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
//   },
//   region: process.env.AWS_DEFAULT_REGION ?? '',
// };

const sesClient = new SESClient();

interface EmailData {
  toAddress: string;
  subject: string;
  firstName: string;
  userId: string;
  verifyToken: string;
}

export const sendEmail = async ({
  toAddress,
  subject,
  firstName,
  userId,
  verifyToken,
}: EmailData) => {
  const params = {
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        // Html: {
        //   Charset: 'UTF-8',
        //   Data: `Hello ${firstName},\n
        //   \nActivate your account by click on this link:\n
        //   \n${process.env.CLIENT_URL}/${userId}/${verifyToken}`,
        // },
        Text: {
          Charset: 'UTF-8',
          Data: `
          Hi ${firstName},

          Welcome to #!/blog/tatum, activate your account by click on this link:

          ${process.env.CLIENT_URL}/auth/verify/${userId}/${verifyToken}

          This link will be valid for 24 hours, verified accounts are deleted after a 24 hour period.
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: process.env.AWS_SES_SENDER,
  };
  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const response = await sesClient.send(sendEmailCommand);
    console.log('EMAIL response', response);
  } catch (e: unknown) {
    if (e instanceof Error) console.log(e.message);
  }
};
