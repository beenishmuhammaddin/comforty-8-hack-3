import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not defined in environment variables")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
})

export async function POST(request: Request) {
  try {
    // Parse the request body for the amount (or other required data)
    const { amount } = await request.json()

    // Validate amount and ensure it's a valid number
    if (!amount || isNaN(amount) || amount <= 0) {
      console.error("Invalid amount provided:", amount)
      return NextResponse.json(
        { error: "Invalid or missing amount" },
        { status: 400 }
      )
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd", // Adjust currency as needed
    })

    // Return the client secret needed for the frontend to confirm the payment
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    // Catch any errors that occur during the payment intent creation process
    if (error instanceof Error) {
      console.error("Error creating payment intent:", error.message)
    } else {
      console.error("Error creating payment intent:", error)
    }

    // Handle different error types (e.g., Stripe API issues)
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: "Stripe payment processing error" },
        { status: 500 }
      )
    }

    // Catch all other errors and return a generic internal server error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
