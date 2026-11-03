import "./globals.css";

export const metadata = {
  title: "Mi app de cine",
  description: "Películas agrupadas por categoría",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
