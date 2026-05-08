import { InvoiceData, BUSINESS_DETAILS } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";

interface InvoiceDocumentProps {
  data: InvoiceData;
}

export function InvoiceDocument({ data }: InvoiceDocumentProps) {
  const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal * (data.taxRate || 0)) / 100;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="invoice-document bg-white min-h-[11in] w-[8.5in] mx-auto p-12 shadow-sm border border-secondary text-[#1A1A1A] flex flex-col overflow-hidden">
      {/* Organization Details - CENTER ALIGNED */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="relative w-20 h-20 mb-4 grayscale">
          <Image 
            src={BUSINESS_DETAILS.logoUrl} 
            alt={BUSINESS_DETAILS.name} 
            fill 
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-headline font-bold text-primary mb-2 uppercase tracking-wider">{BUSINESS_DETAILS.name}</h1>
        <div className="text-sm opacity-75 max-w-sm space-y-1">
          <p>{BUSINESS_DETAILS.address}</p>
          <p>{BUSINESS_DETAILS.phone} • {BUSINESS_DETAILS.email}</p>
        </div>
      </div>

      {/* Invoice Info and Billed To - ALIGNED LEFT/RIGHT */}
      <div className="flex justify-between items-start mb-16">
        {/* Invoice Info - LEFT ALIGNED */}
        <div className="space-y-4">
          <h2 className="text-4xl font-headline italic text-secondary opacity-50 uppercase tracking-tighter mb-4">INVOICE</h2>
          <div className="space-y-1 text-sm">
            <p><span className="font-semibold uppercase text-xs tracking-widest opacity-60 mr-2">Invoice No:</span> {data.invoiceNumber || '---'}</p>
            <p><span className="font-semibold uppercase text-xs tracking-widest opacity-60 mr-2">Date:</span> {format(new Date(data.invoiceDate || new Date()), 'MMM dd, yyyy')}</p>
          </div>
        </div>

        {/* Bill To - RIGHT ALIGNED */}
        <div className="text-right border-r-4 border-secondary pr-4">
          <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Bill To:</h3>
          <div className="text-lg font-semibold">{data.client.name || '---'}</div>
          <div className="text-sm opacity-75">{data.client.email}</div>
          <div className="text-sm opacity-75 whitespace-pre-line">{data.client.address}</div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="flex-grow">
        <table className="w-full text-left mb-8 border-collapse">
          <thead>
            <tr className="bg-[#F5F0E8] text-xs font-bold uppercase tracking-widest border-b border-secondary">
              <th className="py-4 px-3">Description</th>
              <th className="py-4 px-3 text-center">Qty</th>
              <th className="py-4 px-3 text-right">Unit Price</th>
              <th className="py-4 px-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-secondary/30">
            {data.items.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F0E8]/30'}>
                <td className="py-4 px-3 font-medium">{item.description}</td>
                <td className="py-4 px-3 text-center">{item.quantity}</td>
                <td className="py-4 px-3 text-right">${item.unitPrice.toFixed(2)}</td>
                <td className="py-4 px-3 text-right font-semibold">${(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center opacity-40 italic">No items added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals Block */}
      <div className="flex flex-col items-end gap-2 mb-12">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="opacity-60 font-semibold uppercase tracking-wider text-xs">Subtotal:</span>
            <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="opacity-60 font-semibold uppercase tracking-wider text-xs">Tax ({data.taxRate}%):</span>
              <span>${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-secondary">
            <span className="font-bold text-lg uppercase tracking-wider">Total:</span>
            <span className="font-bold text-2xl text-primary">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-12 pt-8 border-t border-secondary/30 mt-auto">
        <div className="text-xs">
          <h3 className="font-bold uppercase tracking-widest opacity-60 mb-2">Notes & Terms:</h3>
          <p className="opacity-75 whitespace-pre-line">{data.notes || 'Please pay within 15 days of receiving this invoice. Thank you for your business!'}</p>
        </div>
        <div className="text-right text-[10px] uppercase tracking-widest opacity-50 flex flex-col justify-end">
          <p>{BUSINESS_DETAILS.name}</p>
          <p>{BUSINESS_DETAILS.website}</p>
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}