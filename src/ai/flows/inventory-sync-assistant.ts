'use server';

/**
 * @fileOverview This file defines a Genkit flow for synchronizing inventory levels between Odoo and Shopify.
 *
 * - `inventorySyncAssistant`: A function that orchestrates the inventory synchronization process.
 * - `InventorySyncAssistantInput`: The input type for the `inventorySyncAssistant` function, including Odoo and Shopify inventory data.
 * - `InventorySyncAssistantOutput`: The output type for the `inventorySyncAssistant` function, providing synchronization suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the inventory synchronization assistant
const InventorySyncAssistantInputSchema = z.object({
  odooInventoryData: z.string().describe('Inventory data from Odoo, in JSON format.'),
  shopifyInventoryData: z.string().describe('Inventory data from Shopify, in JSON format.'),
});
export type InventorySyncAssistantInput = z.infer<
  typeof InventorySyncAssistantInputSchema
>;

// Output schema for the inventory synchronization assistant
const InventorySyncAssistantOutputSchema = z.object({
  syncSuggestions: z
    .string()
    .describe(
      'Suggestions for synchronizing inventory levels, including specific products and quantities to adjust.'
    ),
  discrepancyAnalysis: z
    .string()
    .describe(
      'Analysis of any discrepancies found between Odoo and Shopify inventory data.'
    ),
});
export type InventorySyncAssistantOutput = z.infer<
  typeof InventorySyncAssistantOutputSchema
>;

// Wrapper function for the inventory synchronization flow
export async function inventorySyncAssistant(
  input: InventorySyncAssistantInput
): Promise<InventorySyncAssistantOutput> {
  return inventorySyncAssistantFlow(input);
}

// Define the prompt for the inventory synchronization assistant
const inventorySyncAssistantPrompt = ai.definePrompt({
  name: 'inventorySyncAssistantPrompt',
  input: {schema: InventorySyncAssistantInputSchema},
  output: {schema: InventorySyncAssistantOutputSchema},
  prompt: `You are an AI assistant designed to help synchronize inventory levels between Odoo and Shopify.

  Analyze the inventory data from both systems and provide suggestions for resolving any discrepancies.

  Odoo Inventory Data: {{{odooInventoryData}}}
  Shopify Inventory Data: {{{shopifyInventoryData}}}

  Based on this data, provide clear and actionable suggestions for synchronizing the inventory levels.
  Also, analyze the data and provide an analysis of the discrepancies found between Odoo and Shopify.
  Make sure the suggestions include the product and quantities to adjust.
  `,
});

// Define the Genkit flow for the inventory synchronization assistant
const inventorySyncAssistantFlow = ai.defineFlow(
  {
    name: 'inventorySyncAssistantFlow',
    inputSchema: InventorySyncAssistantInputSchema,
    outputSchema: InventorySyncAssistantOutputSchema,
  },
  async input => {
    const {output} = await inventorySyncAssistantPrompt(input);
    return output!;
  }
);
