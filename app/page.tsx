import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LetterSoundCard from "./letter-sound-card"
import { ThemeProvider } from "./theme-provider"
import { ModeToggle } from "./mode-toggle"

export default function HomePage() {
  return (
    <ThemeProvider>
      <main className="container max-w-md mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Letter Sounds</CardTitle>
          </CardHeader>
          <CardContent>
            <LetterSoundCard />
          </CardContent>
        </Card>
        <div className="mt-4">
          <ModeToggle />
        </div>
      </main>
    </ThemeProvider>
  )
}

