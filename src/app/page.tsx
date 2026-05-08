"use client";

import { useState } from "react";
import { InvoiceData, BUSINESS_DETAILS } from "@/lib/types";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoiceDocument } from "@/components/InvoiceDocument";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Sparkles } from "lucide-react";
import Image from "next/image";

type AppState = "landing" | "form" | "preview";

export default function Home() {
  const [state, setState] = useState<AppState>("landing");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    client: { name: "", address: "" },
    items: [
      { id: "1", description: "Professional Services", quantity: 1, unitPrice: 0 }
    ],
    taxRate: 0,
    notes: "",
  });

  const handleGenerateClick = () => setState("form");
  const handlePreview = (data: InvoiceData) => {
    setInvoiceData(data);
    setState("preview");
  };
  const handleBackToEdit = () => setState("form");
  
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${dd}-${mm}-${yyyy}-${hh}${min}`;
      
      const originalTitle = document.title;
      document.title = `TheBeautyPlush_Invoice_${timeStr}`;
      window.print();
      document.title = originalTitle;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Landing State */}
      {state === "landing" && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
          <div className="mb-8 relative w-32 h-32 transition-all duration-500">
            <Image 
              src={BUSINESS_DETAILS.logoUrl} 
              alt={BUSINESS_DETAILS.name} 
              fill 
              className="object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary mb-4 tracking-tight">
            {BUSINESS_DETAILS.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-light italic">
            "{BUSINESS_DETAILS.tagline}"
          </p>
          <Button 
            size="lg" 
            onClick={handleGenerateClick}
            className="bg-primary text-white hover:bg-primary/90 h-16 px-10 text-xl rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            Generate Invoice <Sparkles className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl opacity-60">
            <div className="p-6">
              <h3 className="font-headline text-lg mb-2">Elegant Design</h3>
              <p className="text-sm">Carefully crafted typography and spacing for high readability.</p>
            </div>
            <div className="p-6">
              <h3 className="font-headline text-lg mb-2">Instant PDF</h3>
              <p className="text-sm">Download professional-grade PDFs directly from your browser.</p>
            </div>
            <div className="p-6">
              <h3 className="font-headline text-lg mb-2">Clean Interface</h3>
              <p className="text-sm">A distraction-free experience focused on getting you paid.</p>
            </div>
          </div>

          <div className="mt-12 py-8 opacity-40 text-xs tracking-widest uppercase">
            Designed by <a href="http://www.simonpetersgh.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary transition-colors">Simon Peters</a>
          </div>
        </div>
      )}

      {/* Form State */}
      {state === "form" && (
        <div className="py-12 animate-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-4xl mx-auto px-4 mb-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setState("landing")} className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Exit to Home
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src={BUSINESS_DETAILS.logoUrl} alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-headline font-bold text-primary">{BUSINESS_DETAILS.name}</span>
            </div>
          </div>
          <InvoiceForm 
            initialData={invoiceData} 
            onPreview={handlePreview} 
          />
        </div>
      )}

      {/* Preview State */}
      {state === "preview" && (
        <div className="py-12 bg-[#F5F0E8] min-h-screen">
          <div className="no-print max-w-4xl mx-auto px-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
            <Button 
              variant="outline" 
              onClick={handleBackToEdit}
              className="w-full md:w-auto border-secondary hover:bg-[#E8DCC8]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Edit
            </Button>
            <div className="flex items-center gap-3 w-full md:w-auto">
               <Button 
                onClick={handlePrint}
                className="flex-1 md:flex-none bg-primary text-white hover:bg-primary/90 shadow-md"
              >
                <Printer className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto pb-12">
            <div className="animate-in zoom-in-95 duration-500 w-fit mx-auto px-4">
              <InvoiceDocument data={invoiceData} />
            </div>
          </div>

          <div className="no-print text-center py-12 opacity-40 text-xs tracking-widest uppercase">
            Designed by <a href="http://www.simonpetersgh.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary transition-colors">Simon Peters</a>
          </div>
        </div>
      )}
    </main>
  );
}
