'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import { AddToDraftQuote } from 'components/cart/add-to-draft-quote';
import { AddToShoppingList } from 'components/cart/add-to-shopping-list';
import Price from 'components/price';
import Prose from 'components/prose';
import { VercelProduct as Product } from 'lib/bigcommerce/types';
import { ReactElement, useEffect, useState } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const [buttonsToAddProduct, setButtonsToAddProduct] = useState<ReactElement[]>([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!window.b2b?.initializationEnvironment.isInit) {
        return;
      }

      clearInterval(intervalId);
      const buttons: ReactElement[] = [];
      if (window.b2b.utils.quote.getButtonInfo().enabled) {
        buttons.push(
          <AddToDraftQuote
            key="add-to-draft-quote"
            variants={product.variants}
            availableForSale={product.availableForSale}
          />
        );
      }
      if (window.b2b.utils.shoppingList.getButtonInfo().enabled) {
        buttons.push(
          <AddToShoppingList
            key="add-to-shopping-list"
            variants={product.variants}
            availableForSale={product.availableForSale}
          />
        );
      }
      setButtonsToAddProduct(buttons);
    }, 50);
  }, []);
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <div className="flex flex-col gap-y-3">
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
        {buttonsToAddProduct}
      </div>
    </>
  );
}
