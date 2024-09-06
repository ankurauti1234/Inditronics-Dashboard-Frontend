import "./globals.css";

export const metadata = {
  title: "IoT Dashboard",
  description: "Next.js Auth App with JWT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`relative min-h-screen w-full font-sans antialiased`}>
        <svg
          className="absolute -z-50 -top-10 opacity-20"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width="20"
              height="20"
              patternTransform="scale(2) rotate(0)"
            >
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="hsl(var(--background))"
              />
              <path
                d="M3.25 10h13.5M10 3.25v13.5"
                strokeLinecap="square"
                strokeWidth="0.5"
                stroke="hsl(var(--primary))"
                fill="none"
              />
            </pattern>
          </defs>
          <rect
            width="800%"
            height="800%"
            transform="translate(0,0)"
            fill="url(#a)"
          />
        </svg>
        <div className="relative flex min-h-screen w-full flex-col">
          <div className="flex-1 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
