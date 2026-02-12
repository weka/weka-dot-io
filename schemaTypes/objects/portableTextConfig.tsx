import { defineArrayMember, type Rule } from "sanity"
import { TbSuperscript, TbSubscript } from "react-icons/tb"

// Custom components for sup/sub rendering
const SuperscriptRenderer = (props: any) => (
  <sup style={{ fontSize: "0.75em", verticalAlign: "super" }}>
    {props.children}
  </sup>
);

const SubscriptRenderer = (props: any) => (
  <sub style={{ fontSize: "0.75em", verticalAlign: "sub" }}>
    {props.children}
  </sub>
);

export const portableTextConfig = {
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          {
            title: "Superscript",
            value: "sup",
            icon: TbSuperscript,
            component: SuperscriptRenderer, // Add component
          },
          {
            title: "Subscript",
            value: "sub",
            icon: TbSubscript,
            component: SubscriptRenderer, // Add component
          },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                validation: (Rule: Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                name: "target",
                type: "string",
                options: {
                  list: [
                    { title: "Same Window", value: "_self" },
                    { title: "New Window", value: "_blank" },
                  ],
                },
                initialValue: "_self",
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
    },
    defineArrayMember({
      type: "wistia",
    }),
    { type: "table" },
    defineArrayMember({
      type: "quoteBlock",
    }),
    defineArrayMember({
      type: "lottieAnimation",
    }),
    defineArrayMember({
      type: "tableOfContents",
    }),
  ],
  };
