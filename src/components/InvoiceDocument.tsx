import { InvoiceData, BUSINESS_DETAILS } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";

interface InvoiceDocumentProps {
  data: InvoiceData;
}

export function InvoiceDocument({ data }: InvoiceDocumentProps) {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  const discount = Math.min(Math.max(data.discount || 0, 0), subtotal);
  const total = Math.max(subtotal - discount, 0);
  const taxAmount = (total * (data.taxRate || 0)) / 100;
  const netTotal = total + taxAmount;

  const invoiceDate = data.invoiceDate
    ? new Date(data.invoiceDate)
    : new Date();

  return (
    <div className="invoice-document bg-white h-[11in] w-[8.5in] mx-auto p-12 shadow-sm border border-secondary text-[#1A1A1A] flex flex-col overflow-hidden box-border">
      {/* 1. Organization Details */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative w-32 h-32 mb-0">
          <Image
            src={BUSINESS_DETAILS.logoUrl}
            alt={BUSINESS_DETAILS.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-xl font-headline font-bold text-primary mb-1 uppercase tracking-wider">
          {BUSINESS_DETAILS.name}
        </h1>

        <div className="text-[10px] opacity-75 max-w-xl space-y-1">
          <p>{BUSINESS_DETAILS.address}</p>

          <p className="flex items-center justify-center gap-2">
            <span>
              <span className="font-semibold">Phone/Whatsapp:</span>{" "}
              {BUSINESS_DETAILS.phone}
            </span>

            <span>
              <span className="font-semibold">Email:</span>{" "}
              {BUSINESS_DETAILS.email}
            </span>

            <span>
              <span className="font-semibold">Tiktok/IG:</span>{" "}
              Thebeautyplush
            </span>
          </p>
        </div>
      </div>

      {/* 2. Invoice Info and Billed To */}
      <div className="flex justify-between items-start mb-8">
        <div className="text-left">
          <h2 className="text-2xl font-headline italic text-secondary opacity-70 uppercase tracking-tighter mb-2">
            INVOICE
          </h2>

          <div className="space-y-1 text-[10px]">
            <p>
              <span className="font-semibold uppercase text-[8px] tracking-widest opacity-60 mr-2">
                Invoice No:
              </span>
              {data.invoiceNumber || "---"}
            </p>

            <p>
              <span className="font-semibold uppercase text-[8px] tracking-widest opacity-60 mr-2">
                Date:
              </span>
              {format(invoiceDate, "MMM dd, yyyy")}
            </p>
          </div>
        </div>

        <div className="text-right max-w-xs">
          <h3 className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">
            Billed To
          </h3>

          <div className="text-sm font-semibold">
            {data.client.name || "---"}
          </div>

          <div className="text-[10px] opacity-75 truncate">
            {data.client.address}
          </div>
        </div>
      </div>

      {/* 3. Line Items Table */}
      <div className="mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F0E8] text-[8px] font-bold uppercase tracking-widest border-b border-secondary">
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4 text-center">Qty</th>
              <th className="py-2 px-4 text-right">Unit Price</th>
              <th className="py-2 px-4 text-right">Amount</th>
            </tr>
          </thead>

          <tbody className="text-[11px] divide-y divide-secondary/30">
            {data.items.map((item, idx) => (
              <tr
                key={item.id}
                className={
                  idx % 2 === 0 ? "bg-white" : "bg-[#F5F0E8]/20"
                }
              >
                <td className="py-2 px-4 font-medium">
                  {item.description}
                </td>

                <td className="py-2 px-4 text-center">
                  {item.quantity}
                </td>

                <td className="py-2 px-4 text-right">
                  ₵ {item.unitPrice.toFixed(2)}
                </td>

                <td className="py-2 px-4 text-right font-semibold">
                  ₵ {(item.quantity * item.unitPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Totals Block */}
      <div className="flex flex-col items-end gap-1 mb-6">
        <div className="w-56 space-y-1">
          {/* Subtotal */}
          <div className="flex justify-between text-[10px]">
            <span className="opacity-60 font-semibold uppercase tracking-wider text-[8px]">
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
          <div className="flex justify-between text-[10px]">
            <span className="opacity-60 font-semibold uppercase tracking-wider text-[8px]">
              Discount:
            </span>

            <span>
              ₵{" "}
              {discount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-[10px] pt-1 border-t border-secondary mt-1">
            <span className="opacity-60 font-semibold uppercase tracking-wider text-[8px]">
              Total:
            </span>

            <span>
              ₵{" "}
              {total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between text-[10px]">
            <span className="opacity-60 font-semibold uppercase tracking-wider text-[8px]">
              Tax ({data.taxRate || 0}%):
            </span>

            <span>
              ₵{" "}
              {taxAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Net Total */}
          <div className="flex justify-between items-center pt-2 border-t border-secondary mt-2">
            <span className="font-bold text-[12px] uppercase tracking-wider">
              Net Total:
            </span>

            <span className="font-bold text-lg text-primary">
              ₵{" "}
              {netTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Notes & Terms */}
      <div className="mb-6">
        <h3 className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">
          Notes & Terms
        </h3>

        <p className="text-[10px] opacity-75 whitespace-pre-line leading-relaxed">
          {data.notes ||
            "Payment should be made to provided account details on agreed terms. Thank you for doing business with us."}
        </p>
      </div>

      {/* 6. Footer */}
      <div className="pt-4 border-t border-secondary/30 mt-2">
        <div className="flex justify-between items-end">
          <div className="text-[10px] italic opacity-60 font-medium">
            <p>{BUSINESS_DETAILS.tagline}</p>
          </div>

          <div className="text-right text-[10px] uppercase tracking-widest opacity-50">
            <p className="font-bold">{BUSINESS_DETAILS.name}</p>
            <p>{BUSINESS_DETAILS.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
}