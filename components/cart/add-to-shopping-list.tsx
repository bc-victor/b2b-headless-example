import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import LoadingDots from 'components/loading-dots';
import { VercelProductVariant as ProductVariant } from 'lib/bigcommerce/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function AddToShoppingList({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const defaultProductId = variants.length === 1 ? variants[0]?.parentId : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const selectedProductId = variant?.parentId || defaultProductId;
  const title = !availableForSale
    ? 'Out of stock'
    : !selectedVariantId
    ? 'Please select options'
    : undefined;

  return (
    <button
      aria-label="Add item to shopping list"
      disabled={isPending || !availableForSale || !selectedVariantId}
      title={title}
      onClick={() => {
        if (!availableForSale || !selectedVariantId || !selectedProductId) return;
        startTransition(async () => {
          await window.b2b.utils.shoppingList.addProductFromPage({
            quantity: 1,
            productEntityId: +selectedProductId,
            variantEntityId: +selectedVariantId,
            selectedOptions: variant?.selectedOptions.map(
              ({ nameEntityId: optionEntityId, valueEntityId: optionValueEntityId }) => ({
                optionEntityId,
                optionValueEntityId
              })
            )
          });

          router.refresh();
        });
      }}
      className={clsx(
        'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90',
        {
          'cursor-not-allowed opacity-60 hover:opacity-60': !availableForSale || !selectedVariantId,
          'cursor-not-allowed': isPending
        }
      )}
    >
      <div className="absolute left-0 ml-4">
        {!isPending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
      </div>
      <span>{availableForSale ? 'Add To Shopping List' : 'Out Of Stock'}</span>
    </button>
  );
}
