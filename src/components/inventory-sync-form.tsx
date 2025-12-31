'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getSyncSuggestions } from '@/app/admin/inventory-sync/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, BotMessageSquare, Check, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Get Sync Suggestions'
      )}
    </Button>
  );
}

const exampleJson = JSON.stringify(
    [
        { "product_id": "P001", "name": "Astral Projection Tee", "quantity": 100 },
        { "product_id": "P002", "name": "Glitch in Reality Hoodie", "quantity": 50 }
    ], null, 2
);

export default function InventorySyncForm() {
  const [state, formAction] = useActionState(getSyncSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div>
      <form action={formAction} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="odoo-inventory">Odoo Inventory Data (JSON)</Label>
            <Textarea
              id="odoo-inventory"
              name="odooInventory"
              rows={10}
              placeholder={exampleJson}
              className="font-code"
              aria-invalid={!!state.errors?.odooInventory}
            />
            {state.errors?.odooInventory && (
              <p className="text-sm text-destructive">{state.errors.odooInventory[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopify-inventory">Shopify Inventory Data (JSON)</Label>
            <Textarea
              id="shopify-inventory"
              name="shopifyInventory"
              rows={10}
              placeholder={exampleJson}
              className="font-code"
              aria-invalid={!!state.errors?.shopifyInventory}
            />
            {state.errors?.shopifyInventory && (
              <p className="text-sm text-destructive">{state.errors.shopifyInventory[0]}</p>
            )}
          </div>
        </div>
        <SubmitButton />
      </form>

      {state.data && (
        <div className="mt-12 space-y-8">
            <Alert variant="default" className="bg-green-500/10 border-green-500/50 text-green-300">
                <Check className="h-4 w-4 !text-green-400" />
                <AlertTitle className="font-bold text-green-300">Analysis Complete</AlertTitle>
                <AlertDescription>
                    AI has successfully analyzed the inventory data and provided the following suggestions.
                </AlertDescription>
            </Alert>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BotMessageSquare className="text-primary"/> Sync Suggestions</CardTitle>
                <CardDescription>Actions to take to resolve discrepancies.</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert prose-sm max-w-none text-muted-foreground whitespace-pre-wrap font-code">
                {state.data.syncSuggestions}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertCircle className="text-primary"/> Discrepancy Analysis</CardTitle>
                 <CardDescription>A breakdown of the differences found.</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert prose-sm max-w-none text-muted-foreground whitespace-pre-wrap font-code">
                 {state.data.discrepancyAnalysis}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
