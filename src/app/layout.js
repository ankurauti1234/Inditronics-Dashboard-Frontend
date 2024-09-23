import "./globals.css";

export const metadata = {
  title: "Inditronics Dashboard",
  description: "Next.js Auth App with JWT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<body 
  className={`
    relative min-h-screen w-full antialiased suse
    bg-gradient-to-b from-background to-background
    before:absolute before:inset-0 
    before:bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.1),transparent_50%)]
    before:pointer-events-none before:content-['']
  `}
  style={{
    '--tw-gradient-from': 'hsl(var(--background))',
    '--tw-gradient-to': 'hsl(var(--accent)/0.05)',
  }}
>
        {/* <svg
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
              patternTransform="scale(0.75) rotate(45)"
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
                stroke="hsl(var(--foreground))"
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
        </svg> */}
        <div className="relative flex min-h-screen w-full flex-col">
          <div className="flex-1 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
