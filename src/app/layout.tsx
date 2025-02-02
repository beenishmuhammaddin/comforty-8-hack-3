import { CartProvider } from "@/contexts/cart-context"
import { SavedItemsProvider } from "@/contexts/saved-items-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Comforty",
  description: "Generated by create next app",
  icons: {
    icon: "/images/Logo Icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <CartProvider>
              <SavedItemsProvider>
                {children}
                <Toaster position="bottom-right" />
              </SavedItemsProvider>
            </CartProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
