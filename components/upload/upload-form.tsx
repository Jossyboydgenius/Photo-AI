"use client"

import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"
import { useLayerStore } from "@/lib/layer-store"
import { useState } from "react"
import UploadImage from "./upload-image"

export default function UploadForm() {
  const activeLayer = useLayerStore((state) => state.activeLayer)
  const [selectedType, setSelectedType] = useState("image")

  if (!activeLayer.url)
    return (
      <div className="w-full p-24 flex flex-col justify-center h-full">
        {selectedType === "image" ? <UploadImage /> : null}
      </div>
    )
}
