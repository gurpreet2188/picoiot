import './globals.css'

export const metadata = {
  title: 'Pico IoT Telemetry',
  description: 'Simple Example of loading data from Pico W to Azure IoT Central and to here through Fetch API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
