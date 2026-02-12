import { defineType } from "sanity";

export default defineType({
  name: "companyBoilerplate",
  title: "Company Boilerplate",
  type: "object",
  fields: [
    {
      name: "company",
      title: "Company",
      type: "reference",
      to: [{ type: "company" }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "company.name",
    },
    prepare({ title }: { title?: string }) {
      return {
        title: title || "Company Boilerplate",
        subtitle: "Press boilerplate",
      };
    },
  },
});
