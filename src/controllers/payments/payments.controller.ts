// src/controllers/paymentController.ts

import { NextFunction, Request, Response } from 'express';
import { createPaymentIntent } from '../../services/auth/payments/payments.service';
import { v4 as uuid } from 'uuid';
import { jwtVerification } from 'src/utility/jwtVerification';
 // Function to handle the payment creation request
export const handleCreatePaymentIntent = async (req: Request, res: Response, next:NextFunction) => {
  const { product, token } = req.body;

  try {
    // Call the service to create a payment intent
    const idempontencyKey = uuid();
    const user = jwtVerification(req,next);
    const clientSecret = await createPaymentIntent(user,product,idempontencyKey);

    // Send the client secret back to the frontend
    res.status(200).json({ clientSecret });
  } catch (error) {
    // Handle errors and send a response with status 500
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};
