# Setup guide


## Prerequisites

Before we get started, you will need to create an API token for your BigCommerce store. They have different permissions required, so please pay attention to which one is used for the step you are working on. Refer to this support article for more information on how to create [API Accounts.](https://support.bigcommerce.com/s/article/Store-API-Accounts?language=en_US#:~:text=Level%20API%20Accounts-,1.,to%20use%20the%20API%20account.)

Create a token (**TOKEN\_A**) with modify permissions for the following resources:

  - Channel listings

  - Channel settings

  - Sites & routes

Tokens are created on `https://store-<storehash>.mybigcommerce.com/manage/settings/api-accounts`


## Steps

1. ### [Click here](https://vercel.com/new/clone?demo-title=Next.js%20%2B%20B2B%20BigCommerce\&demo-description=An%20all-in-one%20starter%20kit%20for%20high-performance%20BigCommerce%20storefronts.\&demo-url=https%3A%2F%2Fnext-commerce-v2.vercel.app%2F\&demo-image=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F1RzhtOHEvW7xyn9qAsdr5E%2F783c7bbd498d0f3b752637d2efa0bb6e%2FNew_Project__5_.png\&repository-url=https%3A%2F%2Fgithub.com%2FB3BC%2Fb2b-headless-example\&project-name=nextjs-b2b-commerce\&repository-name=nextjs-b2b-commerce\&integration-ids=oac_nsrwzogJLEFglVwt2060kB0y) to create your codebase

With this you’re creating a fork from our template, so make sure you download your fork as you will need it in the next steps

2. ### Install BigCommerce <-> Vercel integration

Click on “Add” on Add Integrations and install Nextjs app on your store

![](https://lh7-us.googleusercontent.com/zNfXkT6DOY0lsEudPfg82mdE7PyU0V9ZbLJWTAdp08eKhQZ0Uzhn_igQt44WBPneHNDDZ098WlNCxeLJrJBsk6rSaLenXRIIr3ko-r7Xmad2lKU8bCiRVUpMRGMUb5u8rp5Waww7v0kPXLzAb8yT_JQ)

![](https://lh7-us.googleusercontent.com/lpCBwoK8jZGD3r_42gmsk_B7-_SbFyIRFuhG5ZYqiEwgm1bH-mFy40cWynbHzkr-C9SUEQFUdnIjV2uzcz1PaaaoCUR2Kk04J_2cL1gUdNVukesPJ7j0e9BT48HbzaZuGY15x9PwBblOEuau8JPadZA)

3. ### Deploy it

After that it will deploy automatically and create the repo

![](https://lh7-us.googleusercontent.com/JqGt6NqWCKZH5I9MPxilT27dW1xqnJGl1TarjrzAr_hgOOkxyh1gtLKocWCfgOl5iHIb2uvpYerYVN1wJZqmS5GW_rNxjt61keimitGE9BE1ZW8JqLjLMR31t-RzslYIfuE5B5wrlfxiuYzOKMdSA0g)

4. ### Enable headless channel on dashboard

![](https://lh7-us.googleusercontent.com/WNzALR6h4gtT3RRF2inuz4MCT2Sr_ZOGOzrxAa4HHAWTGft0g4pFXH3a1TKkrDl3JbO6N1w4_CVS4cGke4t2Cvw8pps4F9blVpzJ5yZ17p7JGjpcfPpPVHayttFbbslRwYClLySjDF_3w6vCGAI8zU8)

5. ### Update url on BigCommerce site

Fist get sites linked to a headless storefront sales channels with this cURL using **TOKEN\_A**:

```bash
curl --request GET \
  --url 'https://api.bigcommerce.com/stores/[store_hash]/v3/sites' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Token: <TOKEN_A>'
```
It will return an array of channels, you should verify which match with the recent one, copy the `id` value

The url it’s provided by Vercel page, just copy and paste it on the body

![](https://lh7-us.googleusercontent.com/SmBLwIrd4xiDh6H2D0W1Kr97X30PJFQFtUtdwd__Y08GQMyav4vZONvbe-wHxR_pBxVi5teHLkEK2CpXeC9Ag4Jcb7kkmNfE1nKxX54-x9l2hEkKqrs7LEAg70a8ci_XdV1rEXN6DkbWbiCYsF4o0V0)

The `site_id` on the url it’s the value that we get from listed sites

```bash
curl --location --request PUT 'https://api.bigcommerce.com/stores/[store_hash]/v3/sites/[site_id]' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'X-Auth-Token: <TOKEN_A>' \
--data '{
    "url": "<url provided by vercel>"
}'
```

This will applies to internal Vercel links or production urls

6. ## Update information on script tag

Go to -> [`app/layout.tsx`](https://github.com/B3BC/b2b-headless-example/blob/main/app/layout.tsx#L48) and update your data, **push this to your fork or run it locally to see the changes**

You can get these values from the view on [step 4](https://docs.google.com/document/d/1qy4J1LdbZhV5Mv3o6syPz1-pejFkqO2ZxaySxvUigXU/edit#heading=h.v7b9d8vhinnq) by clicking on deploy script option

```html
<script
  type="module"
  data-storehash="yourStoreHash"
  data-channelid="yourChannelId"
  src="https://cdn.bundleb2b.net/b2b/production/storefront/headless.js"
></script>
```

7. ## Make available your desired products on the new channel

Go to Products -> View, select all the products you want to make available on the new channel, then click on Bulk Actions -> Add to channels

![](https://lh7-us.googleusercontent.com/UJc7H4kHwsUtIDNO6ZC5J_YKgzv2j_xTx1G-lE3LuG-I9S_9ueITKQjFqG4PTb7OBnutcqc6fn7WPaWLRo1rqHQWhv2CetXHwpm2ZZRmNb6YxuqAcpomLCvLmB8cFXs1HwvXfPVxXF2CS09_Kndu2OI)

Select the desired channels and click on add

![](https://lh7-us.googleusercontent.com/mbETtT75jEKo8cc9v1PgHNjnhqvYPeqFI_hXvStDF8HWMb9orOH0Jru8Wg3Ka8lpA6FK7L9SLMIPUceH739HETauKjyQhYCqiSn2FPiZx8ZPwk5tlBI01wZqynub0KyvM0rzphMsk1P8EL21RcLTKm4)


## Customization of environment variables (optional)

You can go to your store deployment on Vercel -> settings -> Environment Variables, to modify the values of COMPANY\_NAME, TWITTER\_CREATOR, TWITTER\_SITE and SITE\_NAME

![](https://lh7-us.googleusercontent.com/xsSzl6rnF-3IlK5qr6bsL3WT6-gMuOLsk0ZEf0c22D7io392RxZiMsnYGJILcz9ZpGxVzL5Zkyc7IXI48f_nsce_SYF-ftukaapTQVCetlZqTDfW6lLFCrOTrMs5a3ARdI09cYn8X0hbX0B2K99ir_k)


## Staging environment

If you are targeting the B2B Edition staging environment, you can use this script instead on the src attribute:

    https://cdn.bundleb2b.net/b2b/staging/storefront/assets/headless.js
