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

  const invoiceDate = data.invoiceDate ? new Date(data.invoiceDate) : new Date();

  return (
    <div className="invoice-document bg-white h-[11in] w-[8.5in] mx-auto p-5 shadow-sm border border-secondary text-[#1A1A1A] flex flex-col overflow-hidden box-border">
      {/* 1. Organization Details - CENTER ALIGNED */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative w-12 h-12 mb-2">
          <Image 
            src={BUSINESS_DETAILS.logoUrl} 
            alt={BUSINESS_DETAILS.name} 
            fill 
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-lg font-headline font-bold text-primary mb-1 uppercase tracking-wider">{BUSINESS_DETAILS.name}</h1>
        <div className="text-[10px] opacity-75 max-w-xl space-y-1">
          <p>{BUSINESS_DETAILS.address}</p>
          <p className="flex items-center justify-center gap-2">
            <span>Phone/Whatsapp: {BUSINESS_DETAILS.phone}</span>
            <span className="text-lg leading-none">•</span>
            <span>Email: {BUSINESS_DETAILS.email}</span>
          </p>
        </div>
      </div>

      {/* 2. Invoice Info (LEFT) and Billed To (RIGHT) */}
      <div className="flex justify-between items-start mb-6">
        {/* Invoice Info - LEFT ALIGNED */}
        <div className="text-left">
          <h2 className="text-xl font-headline italic text-secondary opacity-50 uppercase tracking-tighter mb-1">INVOICE</h2>
          <div className="space-y-1 text-[10px]">
            <p><span className="font-semibold uppercase text-[8px] tracking-widest opacity-60 mr-2">Invoice No:</span> {data.invoiceNumber || '---'}</p>
            <p><span className="font-semibold uppercase text-[8px] tracking-widest opacity-60 mr-2">Date:</span> {format(invoiceDate, 'MMM dd, yyyy')}</p>
          </div>
        </div>

        {/* Billed To - RIGHT ALIGNED */}
        <div className="text-right max-w-xs">
          <h3 className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">Billed To</h3>
          <div className="text-sm font-semibold">{data.client.name || '---'}</div>
          <div className="text-[10px] opacity-75">{data.client.address}</div>
        </div>
      </div>

      {/* 3. Line Items Table */}
      <div className="mb-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F0E8] text-[8px] font-bold uppercase tracking-widest border-b border-secondary">
              <th className="py-1.5 px-3">Description</th>
              <th className="py-1.5 px-3 text-center">Qty</th>
              <th className="py-1.5 px-3 text-right">Unit Price</th>
              <th className="py-1.5 px-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-[10px] divide-y divide-secondary/30">
            {data.items.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F0E8]/30'}>
                <td className="py-1.5 px-3 font-medium">{item.description}</td>
                <td className="py-1.5 px-3 text-center">{item.quantity}</td>
                <td className="py-1.5 px-3 text-right">GH₵ {item.unitPrice.toFixed(2)}</td>
                <td className="py-1.5 px-3 text-right font-semibold">GH₵ {(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center opacity-40 italic">No items added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Totals Block */}
      <div className="flex flex-col items-end gap-1 mb-4">
        <div className="w-48 space-y-0.5">
          <div className="flex justify-between text-[10px]">
            <span className="opacity-60 font-semibold uppercase tracking-wider text-[8px]">Subtotal:</span>
            <span>GH₵ {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-between text-[10px]">
              <span className="opacity-60 font-semibold uppercase tracking-wider text-[8px]">Tax ({data.taxRate}%):</span>
              <span>GH₵ {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-1 border-t border-secondary mt-1">
            <span className="font-bold text-xs uppercase tracking-wider">Total:</span>
            <span className="font-bold text-lg text-primary">GH₵ {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* 5. Notes & Terms */}
      <div className="mb-4">
        <h3 className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">Notes & Terms</h3>
        <p className="text-[9px] opacity-75 whitespace-pre-line">{data.notes || 'Please pay within 15 days of receiving this invoice. Thank you for your business!'}</p>
      </div>

      {/* 6. Footer - Flows directly below Notes */}
      <div className="pt-3 border-t border-secondary/30 mt-2">
        <div className="flex justify-between items-end">
          <div className="text-[9px]">
            <p className="font-bold text-primary mb-0.5">{BUSINESS_DETAILS.tagline}</p>
          </div>
          <div className="text-right text-[9px] uppercase tracking-widest opacity-50">
            <p className="font-bold">{BUSINESS_DETAILS.name}</p>
            <p>{BUSINESS_DETAILS.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
