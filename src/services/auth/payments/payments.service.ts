// src/services/stripeService.ts
// import STRIPE_SECRET_KEY from '../../../models/database/secrets'
import Stripe from "stripe";

// Initialize the Stripe instance with your secret key
const stripe = new Stripe(
  "sk_test_51Pq6gg02sIOCfuMRLR2mRghqfCf5yZRPkwIgMlJKiOsOf2odI0kRDDvYtJRAs5uBjUzMq9cqXPDxNnVBZuzPDGn700DLKbojqz",
  {
    apiVersion: "2024-06-20", // Use the latest API version
  }
);

// Function to create a payment intent
export const createPaymentIntent = async (user:any,products:any,idempotencyKey:string) => {
  try {
    const paymentIntent = await stripe.charges.create({
      amount: products.amount * 100 ,
      currency: 'INR',
      customer: user.id,
      receipt_email: user.email,
      description: products.description,
      shipping: products.shipping
    },{
      idempotencyKey
    });

    return paymentIntent; // Return the client secret to be used in the frontend
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error; // Throw error to be handled in the controller
  }
};
