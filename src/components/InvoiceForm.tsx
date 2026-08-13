"use client";

import { useState } from "react";
import { InvoiceData, LineItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Eye } from "lucide-react";

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
    setData({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    setData({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const subtotal = data.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  const discount = Math.min(Math.max(data.discount || 0, 0), subtotal);
  const total = Math.max(subtotal - discount, 0);
  const taxAmount = (total * (data.taxRate || 0)) / 100;
  const netTotal = total + taxAmount;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-4 sm:px-0">
      {/* Invoice Information */}
      <Card className="border-secondary shadow-sm">
        <CardHeader className="bg-[#F5F0E8]/50 border-b border-secondary">
          <CardTitle className="font-headline text-2xl text-primary">
            Invoice Information
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                placeholder="INV-001"
                value={data.invoiceNumber}
                onChange={(e) =>
                  setData({ ...data, invoiceNumber: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={data.invoiceDate}
                onChange={(e) =>
                  setData({ ...data, invoiceDate: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Details */}
      <Card className="border-secondary shadow-sm">
        <CardHeader className="bg-[#F5F0E8]/50 border-b border-secondary">
          <CardTitle className="font-headline text-2xl text-primary">
            Client Details
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="Client/Company Name"
                value={data.client.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    client: {
                      ...data.client,
                      name: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientAddress">Client Address</Label>
              <Input
                id="clientAddress"
                placeholder="Full Address"
                value={data.client.address}
                onChange={(e) =>
                  setData({
                    ...data,
                    client: {
                      ...data.client,
                      address: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="border-secondary shadow-sm">
        <CardHeader className="bg-[#F5F0E8]/50 border-b border-secondary flex flex-row items-center justify-between">
          <CardTitle className="font-headline text-2xl text-primary">
            Line Items
          </CardTitle>

          <Button
            type="button"
            onClick={addItem}
            variant="outline"
            size="sm"
            className="bg-white border-secondary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 pb-3 border-b border-secondary text-xs uppercase tracking-widest font-bold opacity-60 px-2">
              <div>Description</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Unit Price</div>
              <div className="text-right">Total</div>
              <div></div>
            </div>

            <div className="divide-y divide-secondary/30">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="py-6 md:py-3 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_40px] gap-4 items-end md:items-center group px-2"
                >
                  <div className="space-y-2 md:space-y-0">
                    <Label className="md:hidden text-[10px] uppercase font-bold opacity-60">
                      Description
                    </Label>

                    <Input
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      className="border-secondary md:border-none focus-visible:ring-1 focus-visible:ring-primary shadow-none bg-transparent"
                    />
                  </div>

                  <div className="space-y-2 md:space-y-0">
                    <Label className="md:hidden text-[10px] uppercase font-bold opacity-60">
                      Quantity
                    </Label>

                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="text-left md:text-center border-secondary md:border-none focus-visible:ring-1 shadow-none bg-transparent"
                    />
                  </div>

                  <div className="space-y-2 md:space-y-0">
                    <Label className="md:hidden text-[10px] uppercase font-bold opacity-60">
                      Unit Price
                    </Label>

                    <div className="relative">
                      <span className="absolute left-3 md:left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₵
                      </span>

                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="pl-7 md:pl-6 text-left md:text-right border-secondary md:border-none focus-visible:ring-1 shadow-none bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between md:block items-center pt-2 md:pt-0">
                    <Label className="md:hidden text-[10px] uppercase font-bold opacity-60">
                      Total
                    </Label>

                    <div className="text-right font-semibold">
                      ₵ {(item.quantity * item.unitPrice).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 md:pt-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-8 flex flex-col items-end border-t border-secondary pt-6 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between w-full md:w-80 text-sm px-2">
              <span className="opacity-60 uppercase tracking-widest text-xs font-bold">
                Subtotal:
              </span>
              <span>
                ₵{" "}
                {subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between w-full md:w-80 px-2 gap-6">
              <Label
                htmlFor="discount"
                className="opacity-60 uppercase tracking-widest text-xs font-bold whitespace-nowrap"
              >
                Discount:
              </Label>

              <div className="relative w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₵
                </span>

                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max={subtotal}
                  step="0.01"
                  placeholder="0.00"
                  value={data.discount || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      discount: Math.min(
                        Math.max(parseFloat(e.target.value) || 0, 0),
                        subtotal
                      ),
                    })
                  }
                  className="pl-7 text-right"
                />
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between w-full md:w-80 text-sm px-2 pt-2 border-t border-secondary">
              <span className="opacity-60 uppercase tracking-widest text-xs font-bold">
                Total:
              </span>
              <span>
                ₵{" "}
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Tax Rate */}
            <div className="flex items-center justify-between w-full md:w-80 px-2 gap-6">
              <Label
                htmlFor="taxRate"
                className="opacity-60 uppercase tracking-widest text-xs font-bold whitespace-nowrap"
              >
                Tax Rate:
              </Label>

              <div className="relative w-40">
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={data.taxRate || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      taxRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="pr-8 text-right"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            {/* Tax Amount */}
            <div className="flex justify-between w-full md:w-80 text-sm px-2">
              <span className="opacity-60 uppercase tracking-widest text-xs font-bold">
                Tax Amount:
              </span>

              <span>
                ₵{" "}
                {taxAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Net Total */}
            <div className="flex justify-between items-center w-full md:w-80 text-lg font-bold text-primary pt-3 px-2 border-t border-secondary mt-2">
              <span className="uppercase tracking-widest">Net Total:</span>

              <span>
                ₵{" "}
                {netTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes / Payment Terms */}
      <Card className="border-secondary shadow-sm">
        <CardHeader className="bg-[#F5F0E8]/50 border-b border-secondary">
          <CardTitle className="font-headline text-2xl text-primary">
            Notes / Payment Terms
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <Textarea
            id="notes"
            placeholder="Payment terms, bank details, etc."
            rows={3}
            value={data.notes}
            onChange={(e) =>
              setData({
                ...data,
                notes: e.target.value,
              })
            }
          />
        </CardContent>
      </Card>

      {/* Preview */}
      <div className="flex justify-center">
        <Button
          type="button"
          size="lg"
          onClick={() => onPreview(data)}
          className="bg-primary text-white hover:bg-primary/90 px-12 h-14 text-lg shadow-md"
        >
          <Eye className="mr-2 h-5 w-5" />
          Preview Invoice
        </Button>
      </div>
    </div>
  );
}