"use server"

import { cookies } from "next/headers"
import { fetchFromStorefrontApi } from "./client"
import { redirect } from "next/navigation"

// Cookie name for storing the checkout ID
const CHECKOUT_ID_COOKIE = "shopify_checkout_id"

// GraphQL mutation to create a checkout
const CREATE_CHECKOUT_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

// GraphQL mutation to add line items to a checkout
const ADD_ITEMS_MUTATION = `
  mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
        lineItems(first: 100) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

// GraphQL mutation to update line items in a checkout
const UPDATE_ITEMS_MUTATION = `
  mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

// GraphQL mutation to remove line items from a checkout
const REMOVE_ITEMS_MUTATION = `
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

// GraphQL query to get checkout information
const GET_CHECKOUT_QUERY = `
  query getCheckout($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        id
        webUrl
        totalPrice {
          amount
          currencyCode
        }
        lineItems(first: 100) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

/**
 * Create a new Shopify checkout
 */
export async function createCheckout() {
  try {
    const data = await fetchFromStorefrontApi(CREATE_CHECKOUT_MUTATION, {
      input: {},
    })

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message)
    }

    const { id, webUrl } = data.checkoutCreate.checkout

    // Store the checkout ID in a cookie
    // const cookieStore = cookies()
    // cookieStore.set(CHECKOUT_ID_COOKIE, id, {
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // })

    return {
      id,
      webUrl,
    }
  } catch (error) {
    console.error("Error creating checkout:", error)
    throw error
  }
}

/**
 * Get the current checkout
 */
export async function getCheckout() {
  try {
    // const cookieStore = cookies()
    // const checkoutId = cookieStore.get(CHECKOUT_ID_COOKIE)?.value

    // if (!checkoutId) {
    //   return null
    // }

    // const data = await fetchFromStorefrontApi(GET_CHECKOUT_QUERY, {
    //   id: checkoutId,
    // })

    // if (!data.node) {
    //   // Checkout not found or expired, clear the cookie
    //   cookieStore.delete(CHECKOUT_ID_COOKIE)
    //   return null
    // }

    // return data.node
  } catch (error) {
    console.error("Error getting checkout:", error)
    // If there's an error, clear the cookie
    const cookieStore = cookies()
    // cookieStore.delete(CHECKOUT_ID_COOKIE)
    return null
  }
}

/**
 * Add items to the checkout
 */
export async function addItemsToCheckout(lineItems: { variantId: string; quantity: number }[]) {
  try {
    // let checkoutId = cookies().get(CHECKOUT_ID_COOKIE)?.value

    // If no checkout exists, create one
    // if (!checkoutId) {
    //   const checkout = await createCheckout()
    //   checkoutId = checkout.id
    // }

    // const data = await fetchFromStorefrontApi(ADD_ITEMS_MUTATION, {
    //   checkoutId,
    //   lineItems: lineItems.map((item) => ({
    //     variantId: item.variantId,
    //     quantity: item.quantity,
    //   })),
    // })

    // if (data.checkoutLineItemsAdd.checkoutUserErrors.length > 0) {
    //   throw new Error(data.checkoutLineItemsAdd.checkoutUserErrors[0].message)
    // }

    // return data.checkoutLineItemsAdd.checkout
  } catch (error) {
    console.error("Error adding items to checkout:", error)
    throw error
  }
}

/**
 * Update items in the checkout
 */
export async function updateCheckoutItems(lineItems: { id: string; quantity: number }[]) {
  try {
    // const checkoutId = cookies().get(CHECKOUT_ID_COOKIE)?.value

    // if (!checkoutId) {
    //   throw new Error("No checkout found")
    // }

    // const data = await fetchFromStorefrontApi(UPDATE_ITEMS_MUTATION, {
    //   checkoutId,
    //   lineItems: lineItems.map((item) => ({
    //     id: item.id,
    //     quantity: item.quantity,
    //   })),
    // })

    // if (data.checkoutLineItemsUpdate.checkoutUserErrors.length > 0) {
    //   throw new Error(data.checkoutLineItemsUpdate.checkoutUserErrors[0].message)
    // }

    // return data.checkoutLineItemsUpdate.checkout
  } catch (error) {
    console.error("Error updating checkout items:", error)
    throw error
  }
}

/**
 * Remove items from the checkout
 */
export async function removeCheckoutItems(lineItemIds: string[]) {
  try {
    // const checkoutId = cookies().get(CHECKOUT_ID_COOKIE)?.value

    // if (!checkoutId) {
    //   throw new Error("No checkout found")
    // }

    // const data = await fetchFromStorefrontApi(REMOVE_ITEMS_MUTATION, {
    //   checkoutId,
    //   lineItemIds,
    // })

    // if (data.checkoutLineItemsRemove.checkoutUserErrors.length > 0) {
    //   throw new Error(data.checkoutLineItemsRemove.checkoutUserErrors[0].message)
    // }

    // return data.checkoutLineItemsRemove.checkout
  } catch (error) {
    console.error("Error removing checkout items:", error)
    throw error
  }
}

/**
 * Proceed to Shopify checkout
 */
export async function proceedToCheckout() {
  try {
    const checkout = await getCheckout()

    if (!checkout) {
      // Create a new checkout if none exists
      const newCheckout = await createCheckout()
      return redirect(newCheckout.webUrl)
    }

    // return redirect(checkout.webUrl)
  } catch (error) {
    console.error("Error proceeding to checkout:", error)
    throw error
  }
}

/**
 * Clear the checkout
 */
export async function clearCheckout() {
  const cookieStore = cookies()
//   cookieStore.delete(CHECKOUT_ID_COOKIE)
}
