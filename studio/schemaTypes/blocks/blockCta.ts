import { defineType, defineField } from "sanity";

export default defineType({
  name: "blockCta",
  title: "CTA Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "reference",
      to: [{ type: "cta" }],
    }),
  ],
});
