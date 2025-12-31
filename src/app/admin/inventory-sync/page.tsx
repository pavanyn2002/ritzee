import InventorySyncForm from "@/components/inventory-sync-form";

export default function InventorySyncPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Inventory Sync Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Use AI to analyze and synchronize inventory between Odoo and Shopify.
        </p>
      </div>
      <InventorySyncForm />
    </div>
  );
}
