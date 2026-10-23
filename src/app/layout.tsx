import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexis Alfaro Salazar — ProfileOS | Arquitecto de TI & Soluciones Cloud",
  description: "Plataforma ejecutiva y espacial de arquitectura de TI, gobierno del ciclo de vida de APIs, microservicios y adaptación dinámica de CV para el sector bancario y asegurador.",
  keywords: ["Arquitecto de TI", "Alexis Alfaro Salazar", "Soluciones Cloud", "API Governance", "Apigee", "Kafka", "BIAN", "Lima Perú"],
  authors: [{ name: "Alexis Alfaro Salazar" }],
  openGraph: {
    title: "Alexis Alfaro Salazar — ProfileOS",
    description: "Arquitecto de TI & Soluciones Cloud. Gobierno de APIs, Event-Driven & Microservicios en Banca y Seguros.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth" suppressHydrationWarning>
      <body 
        className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-200"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
