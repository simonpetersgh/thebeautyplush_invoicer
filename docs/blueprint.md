# **App Name**: Invoice Forge

## Core Features:

- Landing Page Display: Showcases business branding, tagline, and the prominent 'Generate Invoice' button to initiate the process.
- Invoice Form Management: Provides a clean form for entering client details, invoice number (editable), invoice date, tax rate, and notes. Includes dynamic 'Add Item' and 'Remove' functionalities for line items with description, quantity, and unit price.
- Real-time Invoice Calculations: Automatically calculates line item totals, subtotal, optional tax, and grand total in real time as the user inputs data.
- Print-Ready Invoice Preview: Generates a fully branded and styled invoice document based on entered data, ready for visual inspection before download, complete with alternating row shading and total block alignment.
- Invoice PDF Generation: Enables downloading a print-ready PDF version of the invoice document using browser print capabilities and media-specific CSS to ensure only the invoice content is visible.
- Application State Navigation: Manages seamless transitions between the Landing, Invoice Form, and Preview & Download states, including a 'Back to Edit' button from the preview state.
- Automated Business Information Inclusion: Utilizes hardcoded business details (name, address, phone, email, website, logo path) that are pre-set by the developer and automatically included in every generated invoice.

## Style Guidelines:

- Primary color: Deep Golden Brown (#996A19) for buttons and key interactive elements, reflecting a sense of enduring quality.
- Background color: Warm Cream (#F5F0E8) for page backgrounds, providing a soft, inviting canvas for the content.
- Accent color: Soft Coral (#FA998C) for subtle highlights and complementary design accents, adding a touch of gentle warmth.
- Additionally, pure White (#FFFFFF) is used for cards and the invoice document background, while a light Beige (#E8DCC8) provides subtle borders and table accents. Dark Charcoal (#1A1A1A) is designated for all primary text, ensuring excellent readability.
- Headline font: 'Playfair Display' (serif) for the business name and 'INVOICE' title, lending an elegant, fashionable aesthetic. Body font: 'Inter' (sans-serif) for all other text, providing a clean, modern, and highly legible experience. Note: currently only Google Fonts are supported.
- Minimalistic line-art icons that complement the clean, professional aesthetic, used sparingly for actions like 'Add Item' or 'Remove'.
- Clean, minimal design with a single-column layout on mobile devices (under 600px viewport width) to ensure full responsiveness. The landing page is centrally aligned for immediate focus on the main call to action.
- Subtle, non-distracting transitions for state changes and user interactions, such as adding new line items or switching between the form and preview views, enhancing the user experience without being flashy.