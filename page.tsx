"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function SpellDiary() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tarotCard, setTarotCard] = useState("")
  const [spells, setSpells] = useState("")
  const [reflection, setReflection] = useState("")

  const handleDownload = () => {
    const formattedDate = date ? format(date, "MMMM d, yyyy") : "No date selected"

    const content = `SPELL DIARY ENTRY
=================
Date: ${formattedDate}

TAROT CARD OF THE DAY:
${tarotCard || "None recorded"}

SPELLS OF THE DAY:
${spells || "None recorded"}

REFLECTION OF THE DAY:
${reflection || "None recorded"}
`

    // Create a blob with the text content
    const blob = new Blob([content], { type: "text/plain" })

    // Create a URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a")
    a.href = url
    a.download = `spell-diary-${date ? format(date, "yyyy-MM-dd") : "entry"}.txt`
    document.body.appendChild(a)
    a.click()

    // Clean up
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-800">Spell Diary</CardTitle>
          <CardDescription>Record your magical journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label htmlFor="tarot-card" className="block text-sm font-medium">
              Tarot Card of the Day
            </label>
            <Textarea
              id="tarot-card"
              placeholder="Enter your tarot card reading..."
              className="min-h-[80px]"
              value={tarotCard}
              onChange={(e) => setTarotCard(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="spells" className="block text-sm font-medium">
              Spells of the Day
            </label>
            <Textarea
              id="spells"
              placeholder="Record the spells you cast today..."
              className="min-h-[120px]"
              value={spells}
              onChange={(e) => setSpells(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reflection" className="block text-sm font-medium">
              Reflection of the Day
            </label>
            <Textarea
              id="reflection"
              placeholder="Share your thoughts and reflections..."
              className="min-h-[120px]"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-700 hover:bg-purple-800" onClick={handleDownload}>
            Download Entry
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

