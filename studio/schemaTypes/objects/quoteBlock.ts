import { defineType, defineField } from "sanity";
import { FiMessageSquare } from "react-icons/fi";

export default defineType({
  name: "quoteBlock",
  title: "Quote",
  type: "object",
  icon: FiMessageSquare,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "reference",
      to: [{ type: "quote" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "center",
    }),
  ],
  preview: {
    select: {
      quoteText: "quote.text",
      author: "quote.author",
    },
    prepare({ quoteText, author }) {
      return {
        title: quoteText ? `"${quoteText.substring(0, 60)}${quoteText.length > 60 ? '...' : ''}"` : "Quote",
        subtitle: author || "Select a quote",
      };
    },
  },
});
