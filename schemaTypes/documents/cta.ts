import { defineType, defineField } from "sanity";
import { FiExternalLink, FiLink, FiMessageSquare } from "react-icons/fi";
import {
  actionTypeField,
  internalLinkField,
  relativeUrlField,
  externalUrlField,
  targetField,
  generateLinkPreview,
} from "../shared/linkFields";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal name for this CTA",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Button Text",
      type: "string",
      description: "The text displayed on the button",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ariaLabel",
      title: "Accessibility Label",
      type: "string",
      description: "Screen reader label (optional, defaults to button text)",
    }),
    {
      ...actionTypeField,
      options: {
        list: [
          { title: "Internal Link (Sanity)", value: "internal" },
          { title: "Internal URL (Relative)", value: "relativeUrl" },
          { title: "External Link or URL", value: "external" },
          { title: "Pop-up Modal", value: "modal" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    },
    internalLinkField,
    {
      ...relativeUrlField,
      description:
        "Relative path (e.g., /about, /products/widget). Use this for pages not yet in Sanity.",
    },
    externalUrlField,
    defineField({
      name: "modalContent",
      title: "Modal Content",
      type: "object",
      hidden: ({ parent }) => parent?.actionType !== "modal",
      fields: [
        {
          name: "modalTitle",
          title: "Modal Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "hubspotFormId",
          title: "HubSpot Form ID",
          type: "string",
          description: "The HubSpot form ID to embed in the modal",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any;
          if (parent?.actionType === "modal" && !value) {
            return "Modal content is required when Action Type is Pop-up Modal";
          }
          return true;
        }),
    }),
    {
      ...targetField,
      initialValue: "_self",
      hidden: ({ parent }) => parent?.actionType === "modal",
      description: "Only applies to link-type CTAs",
    },
    defineField({
      name: "style",
      title: "Button Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Text Link", value: "text" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "analyticsLabel",
      title: "Analytics Label",
      type: "string",
      description: "Optional tracking label for analytics",
    }),
    defineField({
      name: "migrationData",
      title: "Migration Data",
      type: "migrationMetadata",
      description: "Tracking information from WordPress migration",
    }),
  ],
  preview: {
    select: {
      title: "title",
      text: "text",
      actionType: "actionType",
      externalUrl: "externalUrl",
      relativeUrl: "relativeUrl",
      style: "style",
    },
    prepare({ title, text, actionType, externalUrl, relativeUrl, style }) {
      const linkPreview = generateLinkPreview(actionType, externalUrl, relativeUrl);
      const subtitle = text ? `${linkPreview} "${text}"` : linkPreview;

      return {
        title,
        subtitle,
      };
    },
  },
});
