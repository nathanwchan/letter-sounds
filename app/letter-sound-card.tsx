"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import { ArrowRight, ArrowLeft, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const LETTER_SOUNDS = [
  {
    letters: "b",
    sound: "b",
    examples: [
      "ball",
      "big",
      "box",
      "bear",
      "blue",
      "bird",
      "book",
      "baby",
      "bus",
      "boy"
    ]
  },
  {
    letters: "d",
    sound: "d",
    examples: [
      "dog",
      "dad",
      "dig",
      "duck",
      "door",
      "day",
      "doll",
      "dish",
      "draw",
      "drum"
    ]
  },
  {
    letters: "f",
    sound: "f",
    examples: [
      "fan",
      "fish",
      "fun",
      "fox",
      "food",
      "foot",
      "frog",
      "fire",
      "farm",
      "flower"
    ]
  },
  {
    letters: "g",
    sound: "g",
    examples: [
      "got",
      "get",
      "girl",
      "good",
      "game",
      "give",
      "goat",
      "grass",
      "gift",
      "gum"
    ]
  },
  {
    letters: "h",
    sound: "h",
    examples: [
      "hat",
      "hot",
      "hen",
      "hand",
      "home",
      "hill",
      "horse",
      "happy",
      "house",
      "hug"
    ]
  },
  {
    letters: "j",
    sound: "j",
    examples: [
      "jam",
      "jump",
      "juice",
      "jar",
      "jelly",
      "jacket",
      "jet",
      "joy",
      "job",
      "join"
    ]
  },
  {
    letters: "k",
    sound: "k",
    examples: [
      "kid",
      "key",
      "kite",
      "king",
      "kiss",
      "kick",
      "keep",
      "kitten",
      "koala",
      "kind"
    ]
  },
  {
    letters: "l",
    sound: "l",
    examples: [
      "lip",
      "leg",
      "log",
      "lamp",
      "lion",
      "lemon",
      "laugh",
      "light",
      "little",
      "look"
    ]
  },
  {
    letters: "m",
    sound: "m",
    examples: [
      "map",
      "man",
      "mom",
      "mix",
      "moon",
      "milk",
      "mouse",
      "mouth",
      "monkey",
      "music"
    ]
  },
  {
    letters: "n",
    sound: "n",
    examples: [
      "net",
      "nap",
      "not",
      "nose",
      "nut",
      "nest",
      "night",
      "name",
      "now",
      "nice"
    ]
  },
  {
    letters: "p",
    sound: "p",
    examples: [
      "pat",
      "pen",
      "pig",
      "pan",
      "pet",
      "park",
      "pink",
      "play",
      "pencil",
      "puppy"
    ]
  },
  {
    letters: "r",
    sound: "r",
    examples: [
      "rat",
      "red",
      "run",
      "rain",
      "rock",
      "read",
      "rose",
      "rabbit",
      "ring",
      "rope"
    ]
  },
  {
    letters: "s",
    sound: "s",
    examples: [
      "sit",
      "sun",
      "sand",
      "sock",
      "sing",
      "smile",
      "snow",
      "sleep",
      "school",
      "swim"
    ]
  },
  {
    letters: "t",
    sound: "t",
    examples: [
      "tap",
      "top",
      "ten",
      "toy",
      "tree",
      "time",
      "tiger",
      "table",
      "train",
      "turtle"
    ]
  },
  {
    letters: "v",
    sound: "v",
    examples: [
      "van",
      "very",
      "vet",
      "voice",
      "violin",
      "visit",
      "vest",
      "vase",
      "vine",
      "volcano"
    ]
  },
  {
    letters: "w",
    sound: "w",
    examples: [
      "wet",
      "win",
      "walk",
      "water",
      "wind",
      "wood",
      "watch",
      "wave",
      "wish",
      "wall"
    ]
  },
  {
    letters: "y",
    sound: "y",
    examples: [
      "yes",
      "you",
      "yard",
      "year",
      "yellow",
      "yawn",
      "yell",
      "young",
      "yummy",
      "yoyo"
    ]
  },
  {
    letters: "z",
    sound: "z",
    examples: [
      "zip",
      "zoo",
      "zebra",
      "zoom",
      "zero",
      "zigzag",
      "zap",
      "zipper",
      "zone",
      "zillion"
    ]
  },
  {
    letters: "th",
    sound: "th",
    examples: [
      "this",
      "that",
      "them",
      "three",
      "thumb",
      "thank",
      "thing",
      "think",
      "throw",
      "those"
    ]
  },
  {
    letters: "sh",
    sound: "sh",
    examples: [
      "ship",
      "shop",
      "shoe",
      "shell",
      "fish",
      "dish",
      "brush",
      "wash",
      "sheep",
      "shower"
    ]
  },
  {
    letters: "ch",
    sound: "ch",
    examples: [
      "chip",
      "chat",
      "chin",
      "chair",
      "cheese",
      "chicken",
      "church",
      "lunch",
      "catch",
      "watch"
    ]
  },
  {
    letters: "ng",
    sound: "ng",
    examples: [
      "ring",
      "sing",
      "king",
      "song",
      "wing",
      "hang",
      "swing",
      "thing",
      "long",
      "bang"
    ]
  },
  {
    letters: "wh",
    sound: "w",
    examples: [
      "what",
      "when",
      "why",
      "where",
      "which",
      "white",
      "whale",
      "wheel",
      "whistle",
      "while"
    ]
  },
  {
    letters: "ph",
    sound: "f",
    examples: [
      "dolphin",
      "elephant",
      "phone",
      "photo",
      "alphabet"
    ]
  },
  {
    letters: "a",
    sound: "æ",
    examples: [
      "cat",
      "hat",
      "map",
      "apple",
      "ant",
      "ask",
      "add",
      "and",
      "am",
      "animal"
    ]
  },
  {
    letters: "e",
    sound: "e",
    examples: [
      "bed",
      "red",
      "get",
      "pet",
      "egg",
      "end",
      "web",
      "led",
      "let",
      "men"
    ]
  },
  {
    letters: "i",
    sound: "i",
    examples: [
      "zipper",
      "sister",
      "spin",
      "stick",
      "kitten",
      "little",
      "dinner",
      "finish",
      "winter",
      "sniff"
    ]
  },
  {
    letters: "o",
    sound: "o",
    examples: [
      "hot",
      "pot",
      "on",
      "off",
      "odd",
      "ox",
      "octopus",
      "orange",
      "pop",
      "lock"
    ]
  },
  {
    letters: "u",
    sound: "u",
    examples: [
      "cup",
      "up",
      "but",
      "cut",
      "us",
      "under",
      "umbrella",
      "uncle",
      "upset",
      "mud"
    ]
  },
  {
    letters: "a_e",
    sound: "ay",
    examples: [
      "cake",
      "make",
      "take",
      "late",
      "face",
      "race",
      "wave",
      "gate",
      "plate",
      "came"
    ]
  },
  {
    letters: "ee",
    sound: "ee",
    examples: [
      "feet",
      "see",
      "tree",
      "meet",
      "bee",
      "three",
      "green",
      "sleep",
      "need",
      "feed"
    ]
  },
  {
    letters: "i_e",
    sound: "ai",
    examples: [
      "kite",
      "bike",
      "like",
      "time",
      "five",
      "ride",
      "smile",
      "nine",
      "line",
      "slide"
    ]
  },
  {
    letters: "o_e",
    sound: "oh",
    examples: [
      "bone",
      "home",
      "nose",
      "rose",
      "rope",
      "stone",
      "hope",
      "cone",
      "hole",
      "joke"
    ]
  },
  {
    letters: "u_e",
    sound: "oo",
    examples: [
      "tube",
      "cube",
      "use",
      "cute",
      "huge",
      "rule",
      "june",
      "rude",
      "flute",
      "tune"
    ]
  },
  {
    letters: "ar",
    sound: "ar",
    examples: [
      "car",
      "far",
      "star",
      "park",
      "arm",
      "art",
      "bark",
      "dark",
      "farm",
      "jar"
    ]
  },
  {
    letters: "er",
    sound: "er",
    examples: [
      "her",
      "sister",
      "water",
      "letter",
      "teacher",
      "mother",
      "father",
      "brother",
      "other",
      "never"
    ]
  },
  {
    letters: "ir",
    sound: "er",
    examples: [
      "bird",
      "girl",
      "shirt",
      "dirt",
      "stir",
      "skirt",
      "thirsty",
      "circle",
      "birthday",
      "sir"
    ]
  },
  {
    letters: "or",
    sound: "or",
    examples: [
      "corn",
      "for",
      "fork",
      "horse",
      "short",
      "storm",
      "morning",
      "north",
      "porch",
      "forest"
    ]
  },
  {
    letters: "ur",
    sound: "er",
    examples: [
      "turn",
      "burn",
      "hurt",
      "surf",
      "curl",
      "fur",
      "purple",
      "turtle",
      "nurse",
      "purse"
    ]
  },
  {
    letters: "oo",
    sound: "oo",
    examples: [
      "book",
      "look",
      "cook",
      "foot",
      "good",
      "wood",
      "cookie",
      "hook",
      "took",
      "wool"
    ]
  },
  {
    letters: "oo",
    sound: "oo",
    examples: [
      "moon",
      "food",
      "cool",
      "room",
      "boot",
      "zoo",
      "spoon",
      "school",
      "tooth",
      "pool"
    ]
  },
  {
    letters: "ow",
    sound: "ow",
    examples: [
      "cow",
      "now",
      "how",
      "down",
      "town",
      "brown",
      "flower",
      "owl",
      "wow",
      "bow"
    ]
  },
  {
    letters: "oy",
    sound: "oy",
    examples: [
      "boy",
      "toy",
      "joy",
      "royal",
      "oyster",
      "soy",
      "ahoy",
      "annoy",
      "employ",
      "loyal"
    ]
  }
]

export default function LetterSoundCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedWords, setDisplayedWords] = useState<string[]>([])
  const [seenIndices, setSeenIndices] = useState<number[]>([])
  const [isWrapped, setIsWrapped] = useState(false)
  const wordsContainerRef = useRef<HTMLDivElement>(null)

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Create a memoized shuffled array of indices
  const shuffledIndices = useMemo(
    () => shuffleArray([...Array(LETTER_SOUNDS.length).keys()]),
    [LETTER_SOUNDS.length], // Added LETTER_SOUNDS.length as a dependency
  )

  const getNextIndex = useCallback(() => {
    if (seenIndices.length === LETTER_SOUNDS.length) {
      // All letter sounds have been seen, reset and reshuffle
      setSeenIndices([])
      return shuffledIndices[0]
    }

    for (const index of shuffledIndices) {
      if (!seenIndices.includes(index)) {
        return index
      }
    }

    // This should never happen, but TypeScript wants a return statement
    return 0
  }, [seenIndices, shuffledIndices])

  const updateDisplayedWords = useCallback((index: number) => {
    const allWords = LETTER_SOUNDS[index].examples
    const newWords = shuffleArray([...allWords]).slice(0, 5)
    setDisplayedWords(newWords)
  }, [])

  const rotateWords = useCallback(() => {
    updateDisplayedWords(currentIndex)
  }, [currentIndex, updateDisplayedWords])

  useEffect(() => {
    // Initialize with a random letter sound
    const initialIndex = getNextIndex()
    setCurrentIndex(initialIndex)
    setSeenIndices([initialIndex])
    updateDisplayedWords(initialIndex)
  }, [])

  useEffect(() => {
    updateDisplayedWords(currentIndex)
  }, [currentIndex, updateDisplayedWords])

  useEffect(() => {
    const checkIfWrapped = () => {
      if (wordsContainerRef.current) {
        const children = wordsContainerRef.current.children
        if (children.length > 0) {
          const firstChildTop = children[0].getBoundingClientRect().top
          const lastChildTop = children[children.length - 1].getBoundingClientRect().top
          setIsWrapped(lastChildTop > firstChildTop)
        }
      }
    }

    checkIfWrapped()
    window.addEventListener("resize", checkIfWrapped)
    return () => window.removeEventListener("resize", checkIfWrapped)
  }, [displayedWords])

  const playWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.rate = 0.8 // Slightly slower for clarity
    utterance.pitch = 1 // Normal pitch
    utterance.volume = 1 // Full volume
    window.speechSynthesis.speak(utterance)
  }

  const next = () => {
    const nextIndex = getNextIndex()
    setCurrentIndex(nextIndex)
    setSeenIndices((prev) => [...prev, nextIndex])
    updateDisplayedWords(nextIndex)
  }

  const back = () => {
    if (seenIndices.length > 1) {
      const previousIndex = seenIndices[seenIndices.length - 2]
      setCurrentIndex(previousIndex)
      setSeenIndices((prev) => prev.slice(0, -1))
      updateDisplayedWords(previousIndex)
    }
  }

  const getSoundDisplay = () => {
    const { letters, sound } = LETTER_SOUNDS[currentIndex]
    if (letters !== sound) {
      return `Sounds like: "${sound}"`
    }
    return "\u00A0" // Non-breaking space
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-primary/5 p-6 pb-4">
        <div className="text-center">
          <div className="mb-4">
            <div className="text-8xl font-bold inline-block">
              {LETTER_SOUNDS[currentIndex].letters.split("_").map((part, index) => (
                <span key={index}>
                  {part}
                  {index === 0 && LETTER_SOUNDS[currentIndex].letters.includes("_") && (
                    <span className="text-4xl align-top">...</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground my-6 h-5">{getSoundDisplay()}</div>
          <div
            ref={wordsContainerRef}
            className={`flex flex-wrap gap-x-2 gap-y-2 justify-center ${
              isWrapped ? "items-start" : "items-center"
            } h-[6rem] overflow-hidden py-2 px-4 pb-4`}
          >
            {displayedWords.map((example, index) => (
              <button
                key={index}
                onClick={() => playWord(example)}
                className="bg-background hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-1.5 text-base border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {example}
              </button>
            ))}
            <button
              onClick={rotateWords}
              className="bg-background hover:bg-accent hover:text-accent-foreground rounded-full p-1.5 text-base border transition-colors focus:outline-none self-center"
              aria-label="Show new words"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={back} className="w-14 h-14 p-0" disabled={seenIndices.length <= 1}>
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <Button onClick={next} className="flex-1 h-14">
          <ArrowRight className="h-6 w-6 mr-2" />
          Next
        </Button>
      </div>
    </div>
  )
}

