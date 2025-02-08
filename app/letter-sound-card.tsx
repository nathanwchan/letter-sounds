"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { ArrowRight, ArrowLeft, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const LETTER_SOUNDS = [
  {
    letters: "b",
    sound: "b",
    examples: ["ball", "big", "box", "bear", "blue", "bird", "book", "baby", "bus", "bike", "bed", "boy", "bag", "bee"],
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
      "desk",
      "dish",
      "dance",
      "draw",
      "drum",
      "doll",
      "drink",
    ],
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
      "face",
      "five",
      "frog",
      "fire",
      "farm",
      "fall",
      "flower",
      "fly",
    ],
  },
  {
    letters: "g",
    sound: "g",
    examples: [
      "got",
      "get",
      "go",
      "girl",
      "good",
      "game",
      "give",
      "green",
      "goat",
      "grass",
      "grow",
      "gift",
      "gold",
      "gum",
    ],
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
      "hair",
      "hill",
      "heart",
      "horse",
      "happy",
      "house",
      "hug",
      "hop",
      "hide",
    ],
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
      "jog",
      "jungle",
      "jeans",
      "jet",
      "job",
      "jug",
      "join",
      "joy",
    ],
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
      "kind",
      "keep",
      "koala",
      "kitchen",
      "kitten",
      "kangaroo",
      "ketchup",
    ],
  },
  {
    letters: "l",
    sound: "l",
    examples: [
      "lip",
      "leg",
      "log",
      "lamp",
      "love",
      "leaf",
      "lion",
      "lemon",
      "laugh",
      "light",
      "long",
      "little",
      "look",
      "like",
    ],
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
      "money",
      "music",
      "monkey",
      "mango",
      "me",
      "my",
    ],
  },
  {
    letters: "n",
    sound: "n",
    examples: ["net", "nap", "not", "new", "nose", "nut", "nine", "nest", "night", "name", "neck", "no", "now", "nice"],
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
      "push",
      "pear",
      "pizza",
      "paper",
      "pencil",
      "puppy",
    ],
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
      "river",
      "road",
      "rice",
      "ring",
      "rope",
      "rug",
    ],
  },
  {
    letters: "s",
    sound: "s",
    examples: [
      "sit",
      "sun",
      "see",
      "say",
      "sand",
      "star",
      "sock",
      "sing",
      "smile",
      "snow",
      "sleep",
      "school",
      "spoon",
      "swim",
    ],
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
      "talk",
      "tall",
      "tiger",
      "table",
      "tooth",
      "train",
      "turtle",
      "toes",
    ],
  },
  {
    letters: "v",
    sound: "v",
    examples: [
      "van",
      "very",
      "vest",
      "voice",
      "visit",
      "vase",
      "vet",
      "vote",
      "vine",
      "vegetable",
      "vacuum",
      "valley",
      "vanilla",
      "violin",
    ],
  },
  {
    letters: "w",
    sound: "w",
    examples: [
      "wet",
      "win",
      "way",
      "walk",
      "water",
      "wind",
      "wood",
      "watch",
      "wave",
      "window",
      "wish",
      "wolf",
      "wheel",
      "wall",
    ],
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
      "yolk",
      "yogurt",
      "yak",
      "yarn",
      "yummy",
      "yoyo",
    ],
  },
  {
    letters: "z",
    sound: "z",
    examples: [
      "zip",
      "zoo",
      "zero",
      "zebra",
      "zap",
      "zoom",
      "zone",
      "zigzag",
      "zipper",
      "zucchini",
      "zebra",
      "zoo",
      "zoom",
      "zap",
    ],
  },
  {
    letters: "th",
    sound: "th",
    examples: [
      "this",
      "that",
      "them",
      "there",
      "then",
      "these",
      "those",
      "think",
      "three",
      "thumb",
      "throw",
      "thank",
      "thirsty",
      "thunder",
    ],
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
      "shine",
      "shade",
      "shape",
      "share",
      "sheep",
      "shower",
    ],
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
      "beach",
      "teach",
      "reach",
      "lunch",
      "march",
      "catch",
      "watch",
    ],
  },
  {
    letters: "ng",
    sound: "ng",
    examples: [
      "ring",
      "sing",
      "long",
      "king",
      "song",
      "wing",
      "bring",
      "spring",
      "strong",
      "young",
      "hang",
      "swing",
      "thing",
      "string",
    ],
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
      "while",
      "white",
      "whale",
      "wheel",
      "whisper",
      "whistle",
      "whisk",
      "whip",
      "whirl",
    ],
  },
  {
    letters: "ph",
    sound: "f",
    examples: [
      "photo",
      "dolphin",
      "elephant",
      "alphabet",
      "graph",
      "nephew",
      "pharmacy",
      "sphere",
      "trophy",
      "photo",
      "dolphin",
      "elephant",
    ],
  },
  {
    letters: "a",
    sound: "æ",
    examples: ["cat", "hat", "map", "tap", "apple", "ant", "ask", "add", "and", "at", "as", "am", "animal", "answer"],
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
      "else",
      "every",
      "empty",
      "enter",
      "exit",
      "echo",
      "elf",
      "edge",
    ],
  },
  {
    letters: "i",
    sound: "i",
    examples: ["pin", "hit", "sit", "big", "in", "is", "it", "if", "ink", "ill", "inch", "insect", "igloo", "itch"],
  },
  {
    letters: "o",
    sound: "o",
    examples: [
      "hot",
      "pot",
      "lot",
      "got",
      "on",
      "off",
      "odd",
      "ox",
      "octopus",
      "olive",
      "orange",
      "office",
      "otter",
      "ostrich",
    ],
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
      "ugly",
      "umbrella",
      "uncle",
      "until",
      "umpire",
      "udder",
      "utter",
      "upset",
    ],
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
      "space",
      "brave",
      "cave",
      "save",
      "wave",
      "date",
      "gate",
      "plate",
    ],
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
      "free",
      "three",
      "green",
      "sleep",
      "deep",
      "keep",
      "seed",
      "need",
      "feed",
    ],
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
      "side",
      "wide",
      "smile",
      "while",
      "mile",
      "line",
      "fine",
      "nine",
    ],
  },
  {
    letters: "o_e",
    sound: "oh",
    examples: [
      "bone",
      "home",
      "note",
      "rope",
      "nose",
      "rose",
      "close",
      "those",
      "stone",
      "alone",
      "hope",
      "vote",
      "code",
      "rode",
    ],
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
      "mute",
      "flute",
      "rule",
      "june",
      "prune",
      "rude",
      "dune",
      "fume",
      "plume",
    ],
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
      "hard",
      "jar",
      "mark",
      "part",
      "sharp",
    ],
  },
  {
    letters: "er",
    sound: "er",
    examples: [
      "her",
      "term",
      "verb",
      "serve",
      "fern",
      "herd",
      "perch",
      "were",
      "germ",
      "jerk",
      "clerk",
      "sister",
      "water",
      "letter",
    ],
  },
  {
    letters: "ir",
    sound: "er",
    examples: [
      "bird",
      "girl",
      "shirt",
      "first",
      "dirt",
      "firm",
      "stir",
      "third",
      "skirt",
      "birth",
      "sir",
      "circle",
      "thirty",
      "thirsty",
    ],
  },
  {
    letters: "or",
    sound: "or",
    examples: [
      "corn",
      "for",
      "fork",
      "born",
      "horse",
      "north",
      "short",
      "storm",
      "torch",
      "porch",
      "sport",
      "sort",
      "port",
      "morning",
    ],
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
      "nurse",
      "purse",
      "burst",
      "curve",
      "curb",
      "blur",
      "purple",
      "turtle",
    ],
  },
  {
    letters: "oo",
    sound: "oo",
    examples: [
      "book",
      "look",
      "took",
      "cook",
      "foot",
      "good",
      "hood",
      "wood",
      "stood",
      "wool",
      "hook",
      "shook",
      "cookie",
      "looking",
    ],
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
      "root",
      "soon",
      "zoo",
      "pool",
      "roof",
      "spoon",
      "broom",
      "school",
      "tooth",
    ],
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
      "crowd",
      "crown",
      "flower",
      "power",
      "towel",
      "owl",
      "bow",
      "wow",
    ],
  },
  {
    letters: "oy",
    sound: "oy",
    examples: [
      "boy",
      "toy",
      "joy",
      "enjoy",
      "royal",
      "oyster",
      "soy",
      "ahoy",
      "annoy",
      "employ",
      "destroy",
      "loyal",
      "boy",
      "toy",
    ],
  },
]

export default function LetterSoundCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedWords, setDisplayedWords] = useState<string[]>([])
  const [past, setPast] = useState<number[]>([])
  const [future, setFuture] = useState<number[]>([])
  const [isWrapped, setIsWrapped] = useState(false)
  const wordsContainerRef = useRef<HTMLDivElement>(null)

  const getRandomIndex = useCallback((exclude: number) => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * LETTER_SOUNDS.length)
    } while (newIndex === exclude)
    return newIndex
  }, [])

  const updateDisplayedWords = useCallback((index: number) => {
    const allWords = LETTER_SOUNDS[index].examples
    const newWords = allWords.sort(() => 0.5 - Math.random()).slice(0, 5)
    setDisplayedWords(newWords)
  }, [])

  const rotateWords = useCallback(() => {
    updateDisplayedWords(currentIndex)
  }, [currentIndex, updateDisplayedWords])

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
  }, [])

  const playWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.rate = 0.8 // Slightly slower for clarity
    utterance.pitch = 1 // Normal pitch
    utterance.volume = 1 // Full volume
    window.speechSynthesis.speak(utterance)
  }

  const next = () => {
    if (future.length > 0) {
      const nextIndex = future[0]
      setPast((prev) => [...prev, currentIndex])
      setCurrentIndex(nextIndex)
      setFuture((prev) => prev.slice(1))
    } else {
      const newIndex = getRandomIndex(currentIndex)
      setPast((prev) => [...prev, currentIndex])
      setCurrentIndex(newIndex)
    }
  }

  const back = () => {
    if (past.length > 0) {
      const previousIndex = past[past.length - 1]
      setFuture((prev) => [currentIndex, ...prev])
      setCurrentIndex(previousIndex)
      setPast((prev) => prev.slice(0, -1))
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
          <div className="text-8xl font-bold mb-4">
            {LETTER_SOUNDS[currentIndex].letters.split("_").map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && LETTER_SOUNDS[currentIndex].letters.includes("_") && (
                  <span className="text-4xl align-top">...</span>
                )}
              </span>
            ))}
          </div>
          <div className="text-sm text-muted-foreground my-6 h-5">{getSoundDisplay()}</div>
          <div
            ref={wordsContainerRef}
            className={`flex flex-wrap gap-x-2 gap-y-2 justify-center ${
              isWrapped ? "items-start" : "items-center"
            } h-[5rem] overflow-hidden py-2 px-4`}
          >
            {displayedWords.map((example, index) => (
              <button
                key={index}
                onClick={() => playWord(example)}
                className="bg-background hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-1 text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {example}
              </button>
            ))}
            <button
              onClick={rotateWords}
              className="bg-background hover:bg-accent hover:text-accent-foreground rounded-full p-1 text-sm border transition-colors focus:outline-none"
              aria-label="Show new words"
            >
              <RotateCw className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={back} className="w-14 h-14 p-0" disabled={past.length === 0}>
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <Button
          onClick={next}
          className="flex-1 h-14"
          disabled={future.length === 0 && past.length === LETTER_SOUNDS.length - 1}
        >
          <ArrowRight className="h-6 w-6 mr-2" />
          Next
        </Button>
      </div>
    </div>
  )
}

