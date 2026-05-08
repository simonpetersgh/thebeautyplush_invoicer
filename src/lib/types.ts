export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ClientDetails {
  name: string;
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
  name: "The Beauty Plush",
  tagline: "Haven for Glam and Glow",
  address: "Ashaley Botwe, Accra, Greater Accra, Ghana",
  phone: "02400879933",
  website: "www.thebeautyplush.com",
  email: "info@thebeautyplush.com",
  logoUrl: "https://picsum.photos/seed/beauty/200/200",
};
