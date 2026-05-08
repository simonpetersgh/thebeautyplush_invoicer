
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ClientDetails {
  name: string;
  email: string;
  address: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  client: ClientDetails;
  items: LineItem[];
  taxRate: number;
  notes: string;
}

export const BUSINESS_DETAILS = {
  name: "Invoice Forge",
  tagline: "Generate professional invoices instantly",
  address: "123 Creative Lane, Design District, NY 10001",
  phone: "(555) 000-1111",
  email: "hello@invoiceforge.com",
  website: "www.invoiceforge.com",
  logoUrl: "/logo.png", // Provision for logo in public folder
};
