"use server"
import z from "zod"
import { v2 as cloudinary } from "cloudinary"
import { actionClient } from "@/lib/safe-action"
import { checkImageProcessing } from "@/lib/check-processing"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // Updated to use environment variable
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const bgRemoveSchema = z.object({
  activeImage: z.string(),
  format: z.string(),
})

export const bgRemoval = actionClient
  .schema(bgRemoveSchema)
  .action(async ({ parsedInput: { format, activeImage } }) => {
    const form = activeImage.split(format)
    const pngConvert = form[0] + "png"
    const parts = pngConvert.split("/upload/")
    //https://res.cloudinary.com/demo/image/upload/e_gen_remove:prompt_fork/docs/avocado-salad.jpg
    const bgUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`
    // Poll the URL to check if the image is processed
    let isProcessed = false
    const maxAttempts = 20
    const delay = 1000 // 1 second
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkImageProcessing(bgUrl)
      if (isProcessed) {
        break
      }
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    if (!isProcessed) {
      throw new Error("Image processing timed out")
    }
    console.log(bgUrl)
    return { success: bgUrl }
  })
