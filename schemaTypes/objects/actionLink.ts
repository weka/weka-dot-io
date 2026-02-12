import { defineType, defineField } from "sanity";
import {
  actionTypeField,
  internalLinkField,
  relativeUrlField,
  externalUrlField,
  targetField,
  generateLinkPreview,
} from "../shared/linkFields";

export default defineType({
  name: "actionLink",
  title: "Action Link",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Link Text",
      type: "string",
      description:
        "Visible text for buttons/links (optional for clickable cards)",
    }),
    defineField({
      name: "ariaLabel",
      title: "Accessibility Label",
      type: "string",
      description: "Screen reader label. Recommended for clickable cards.",
    }),
    {
      ...actionTypeField,
      initialValue: "external",
    },
    internalLinkField,
    relativeUrlField,
    externalUrlField,
    {
      ...targetField,
      initialValue: "_blank",
    },
  ],
  preview: {
    select: {
      text: "text",
      ariaLabel: "ariaLabel",
      actionType: "actionType",
      externalUrl: "externalUrl",
      relativeUrl: "relativeUrl",
    },
    prepare({ text, ariaLabel, actionType, externalUrl, relativeUrl }) {
      const label = text || ariaLabel || "No label";
      const subtitle = generateLinkPreview(
        actionType,
        externalUrl,
        relativeUrl,
      );

      return {
        title: label,
        subtitle,
      };
    },
  },
});
