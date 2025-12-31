'use server';

import { inventorySyncAssistant } from '@/ai/flows/inventory-sync-assistant';
import { z } from 'zod';

const SyncSchema = z.object({
  odooInventory: z.string().min(1, { message: 'Odoo inventory data is required.' }),
  shopifyInventory: z.string().min(1, { message: 'Shopify inventory data is required.' }),
});

export async function getSyncSuggestions(prevState: any, formData: FormData) {
  const validatedFields = SyncSchema.safeParse({
    odooInventory: formData.get('odooInventory'),
    shopifyInventory: formData.get('shopifyInventory'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  
  // Basic JSON validation
  try {
    JSON.parse(validatedFields.data.odooInventory);
  } catch (error) {
    return {
      message: 'Invalid JSON in Odoo inventory data.',
      errors: { odooInventory: ['Must be valid JSON.'] },
      data: null,
    };
  }

  try {
    JSON.parse(validatedFields.data.shopifyInventory);
  } catch (error) {
    return {
      message: 'Invalid JSON in Shopify inventory data.',
      errors: { shopifyInventory: ['Must be valid JSON.'] },
      data: null,
    };
  }
  

  try {
    const result = await inventorySyncAssistant({
      odooInventoryData: validatedFields.data.odooInventory,
      shopifyInventoryData: validatedFields.data.shopifyInventory,
    });
    return { message: 'Success', errors: null, data: result };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred.', errors: null, data: null };
  }
}
