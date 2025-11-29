import { quicksand } from "./ui/fonts";
import "./globals.css";

export const metadata = {
  title: "Inglés Vocabulario",
  description: "Aprende Inglés de manera divertida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${quicksand.className} antialiased`}>{children}</body>
    </html>
  );
}
