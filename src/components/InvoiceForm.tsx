
"use client";

import { useState } from "react";
import { InvoiceData, LineItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

interface InvoiceFormProps {
  initialData: InvoiceData;
  onPreview: (data: InvoiceData) => void;
}

export function InvoiceForm({ initialData, onPreview }: InvoiceFormProps) {
  const [data, setData] = useState<InvoiceData>(initialData);

  const addItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      quantity: 1,
      unitPrice: 0,
    };
    setData({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    setData({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setData({
      ...data,
      items: data.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal * (data.taxRate || 0)) / 100;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-4 sm:px-0">
      <Card className="border-secondary shadow-sm">
        <CardHeader className="bg-[#F5F0E8]/50 border-b border-secondary">
          <CardTitle className="font-headline text-2xl text-primary">Invoice Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          {/* Top Row: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input 
                id="invoiceNumber"
                placeholder="INV-001"
                value={data.invoiceNumber}
                onChange={e => setData({...data, invoiceNumber: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input 
                id="invoiceDate"
                type="date"
                value={data.invoiceDate}
                onChange={e => setData({...data, invoiceDate: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Client Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-60">Client Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input 
                    id="clientName"
                    placeholder="Acme Corp"
                    value={data.client.name}
                    onChange={e => setData({...data, client: {...data.client, name: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input 
                    id="clientEmail"
                    type="email"
                    placeholder="billing@acme.com"
                    value={data.client.email}
                    onChange={e => setData({...data, client: {...data.client, email: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Client Address</Label>
                  <Textarea 
                    id="clientAddress"
                    placeholder="Street, City, Country"
                    rows={3}
                    value={data.client.address}
                    onChange={e => setData({...data, client: {...data.client, address: e.target.value}})}
                  />
                </div>
              </div>
            </div>

            {/* Tax & Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest opacity-60">Preferences</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input 
                    id="taxRate"
                    type="number"
                    placeholder="0"
                    value={data.taxRate || ''}
                    onChange={e => setData({...data, taxRate: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes / Payment Terms</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Payment terms, bank details, etc."
                    rows={5}
                    value={data.notes}
                    onChange={e => setData({...data, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-secondary shadow-sm">
        <CardHeader className="bg-[#F5F0E8]/50 border-b border-secondary flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-2xl text-primary">Line Items</CardTitle>
          <Button onClick={addItem} variant="outline" size="sm" className="bg-white border-secondary">
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-secondary text-left text-xs uppercase tracking-widest font-bold opacity-60">
                  <th className="pb-3 px-2">Description</th>
                  <th className="pb-3 px-2 w-20 text-center">Qty</th>
                  <th className="pb-3 px-2 w-32 text-right">Unit Price</th>
                  <th className="pb-3 px-2 w-32 text-right">Total</th>
                  <th className="pb-3 px-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/30">
                {data.items.map((item) => (
                  <tr key={item.id} className="group">
                    <td className="py-3 px-2">
                      <Input 
                        placeholder="Item description"
                        value={item.description}
                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                        className="border-none focus-visible:ring-1 focus-visible:ring-primary shadow-none bg-transparent"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="text-center border-none focus-visible:ring-1 shadow-none bg-transparent"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="text-right border-none focus-visible:ring-1 shadow-none bg-transparent"
                      />
                    </td>
                    <td className="py-3 px-2 text-right font-medium">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                    <td className="py-3 px-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {data.items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground italic">
                      No items added yet. Click "Add Item" to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col items-end border-t border-secondary pt-6 space-y-2">
            <div className="flex justify-between w-64 text-sm">
              <span className="opacity-60">Subtotal:</span>
              <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            {data.taxRate > 0 && (
              <div className="flex justify-between w-64 text-sm">
                <span className="opacity-60">Tax ({data.taxRate}%):</span>
                <span>${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between w-64 text-lg font-bold text-primary pt-2">
              <span>Grand Total:</span>
              <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={() => onPreview(data)}
          className="bg-primary text-white hover:bg-primary/90 px-12 h-14 text-lg shadow-md"
        >
          <Eye className="mr-2 h-5 w-5" /> Preview Invoice
        </Button>
      </div>
    </div>
  );
}
