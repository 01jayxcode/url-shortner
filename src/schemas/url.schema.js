const { z } = require("zod");

const shortenSchema = z.object({
  long_url: z
    .string({ required_error: "URL is required" })
    .min(1, "URL is required")
    .refine(
      (val) => {
        try {
          const url = new URL(val);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "Invalid URL — must start with http:// or https://" },
    ),
  uid: z.string().optional(),
});

module.exports = { shortenSchema };
