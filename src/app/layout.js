export const metadata = {
  title: 'Admin Dashboaord',
  description: 'Created for HireQuotient',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
