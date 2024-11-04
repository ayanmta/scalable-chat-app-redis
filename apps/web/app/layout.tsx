
import { SocketProvider } from "../context/SocketProvider";
import "./globals.css";
import "./output.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <SocketProvider>
      <body>
        {children}
      </body>
      </SocketProvider>
    </html>
  );
}
