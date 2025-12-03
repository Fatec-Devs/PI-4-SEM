// /**
//  * Lambda Function para rotação automática de senhas a cada 50 dias
//  * 
//  * Este arquivo deve ser empacotado e implantado como AWS Lambda Function
//  * com a policy: arn:aws:iam::503329406832:policy/lambda-pi-fatec
//  * 
//  * Configurar EventBridge (CloudWatch Events) para executar diariamente
//  * 
//  * Dependências necessárias:
//  * - @aws-sdk/client-secrets-manager
//  * - @prisma/client
//  * - pg
//  */

// import {
//   SecretsManagerClient,
//   UpdateSecretCommand,
// } from '@aws-sdk/client-secrets-manager';
// import { PrismaClient } from '@prisma/client';
// import crypto from 'crypto';

// const prisma = new PrismaClient();
// const secretsClient = new SecretsManagerClient({
//   region: process.env.AWS_REGION || 'us-east-1',
// });

// function generateStrongPassword(length: number = 24): string {
//   const lowercase = 'abcdefghijklmnopqrstuvwxyz';
//   const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const numbers = '0123456789';
//   const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';
//   const allChars = lowercase + uppercase + numbers + symbols;

//   let password = '';
//   password += lowercase[crypto.randomInt(lowercase.length)];
//   password += uppercase[crypto.randomInt(uppercase.length)];
//   password += numbers[crypto.randomInt(numbers.length)];
//   password += symbols[crypto.randomInt(symbols.length)];

//   for (let i = password.length; i < length; i++) {
//     password += allChars[crypto.randomInt(allChars.length)];
//   }

//   return password
//     .split('')
//     .sort(() => crypto.randomInt(3) - 1)
//     .join('');
// }

// async function updateSecret(secretName: string, newPassword: string): Promise<void> {
//   const command = new UpdateSecretCommand({
//     SecretId: secretName,
//     SecretString: JSON.stringify({ password: newPassword }),
//   });

//   await secretsClient.send(command);
// }

// function getSecretName(userId: string): string {
//   return `app-user-${userId}`;
// }

// export const handler = async (event: any) => {
//   console.log('Starting password rotation job...');

//   const results = {
//     total: 0,
//     rotated: 0,
//     failed: 0,
//     errors: [] as string[],
//   };

//   try {
//     // Find users whose passwords expired (50 days since last rotation)
//     const fiftyDaysAgo = new Date();
//     fiftyDaysAgo.setDate(fiftyDaysAgo.getDate() - 50);

//     const usersToRotate = await prisma.applicationUser.findMany({
//       where: {
//         status: 'ACTIVE',
//         OR: [
//           { lastRotation: { lte: fiftyDaysAgo } },
//           { lastRotation: null },
//         ],
//       },
//     });

//     results.total = usersToRotate.length;
//     console.log(`Found ${results.total} users requiring password rotation`);

//     for (const user of usersToRotate) {
//       try {
//         const newPassword = generateStrongPassword();
//         const secretName = getSecretName(user.id);

//         // Update secret in AWS Secrets Manager
//         await updateSecret(secretName, newPassword);

//         // Update user in database
//         await prisma.applicationUser.update({
//           where: { id: user.id },
//           data: {
//             lastRotation: new Date(),
//             passwordExpiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
//           },
//         });

//         // Create audit log
//         await prisma.auditLog.create({
//           data: {
//             action: 'PASSWORD_CHANGE',
//             entity: 'APP_USER',
//             entityId: user.id,
//             performedBy: 'SYSTEM_AUTO_ROTATION',
//             details: {
//               username: user.username,
//               automated: true,
//               reason: 'Password expired (50 days)',
//             },
//           },
//         });

//         results.rotated++;
//         console.log(`Successfully rotated password for user: ${user.username}`);
//       } catch (error: any) {
//         results.failed++;
//         const errorMsg = `Failed to rotate password for ${user.username}: ${error.message}`;
//         results.errors.push(errorMsg);
//         console.error(errorMsg);
//       }
//     }

//     console.log('Password rotation job completed', results);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: 'Password rotation completed',
//         results,
//       }),
//     };
//   } catch (error: any) {
//     console.error('Error in password rotation job:', error);

//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: 'Password rotation failed',
//         error: error.message,
//         results,
//       }),
//     };
//   } finally {
//     await prisma.$disconnect();
//   }
// };
