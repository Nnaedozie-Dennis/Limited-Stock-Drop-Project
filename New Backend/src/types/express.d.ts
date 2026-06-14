import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email?: string;
    };
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         email?: string;
//       };
//     }
//   }
// }

// export {};
