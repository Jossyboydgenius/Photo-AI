"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Ellipsis, EllipsisIcon, Trash, Trash2 } from "lucide-react"
import { Layer, useLayerStore } from "@/lib/layer-store"

export default function LayerInfo({
  layer,
  layerIndex,
}: {
  layer: Layer
  layerIndex: number
}) {
  const layers = useLayerStore((state) => state.layers)
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer)
  const removeLayer = useLayerStore((state) => state.removeLayer)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <EllipsisIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="text-lg font-medium text-center mb-2">
          Layer {layer.id}
        </h3>
        <div className="py-4 space-y-0.5">
          <p>
            <span className="font-bold">Filename:</span> {layer.name}
          </p>
          <p>
            <span className="font-bold">Format:</span> {layer.format}
          </p>
          <p>
            <span className="font-bold"> Size:</span> {layer.width}X
            {layer.height}
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation()
            setActiveLayer(layerIndex === 0 ? layers[1].id : layers[0].id)
            removeLayer(layer.id)
          }}
        >
          <span>Delete Layer</span>
          <Trash2 size={14} />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
