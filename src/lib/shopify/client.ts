// lib/shopify/client.ts
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontApiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

async function fetchFromStorefrontApi(query: string, variables: any = {}) {
  const endpoint = `https://${domain}/api/${storefrontApiVersion}/graphql.json`

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken || "",
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!res.ok) {
      console.error("Shopify Storefront API error:", res.status, res.statusText)
      try {
        const errorBody = await res.text()
        console.error("Error Body:", errorBody)
      } catch (textError) {
        console.error("Failed to parse error body:", textError)
      }
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const json = await res.json()

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors)
      throw new Error(json.errors.map((error: any) => error.message).join("\n"))
    }

    return json.data
  } catch (error: any) {
    console.error("Error fetching from Shopify Storefront API:", error)
    throw error
  }
}

export { fetchFromStorefrontApi }
