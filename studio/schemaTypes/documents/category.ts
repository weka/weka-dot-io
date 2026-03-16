import { defineType, defineField } from "sanity";
import { FiFolder } from "react-icons/fi";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: FiFolder,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name' // Changed from 'title' to 'name'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: 'taxonomy',
      title: 'Taxonomy',
      type: 'string',
      options: {
        list: [
          {title: 'Resource Type', value: 'resourceType'},
          {title: 'Blog Category', value: 'blogCategory'},
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Optional parent category for hierarchical organization",
      // Only allow parent from same taxonomy
      options: {
        filter: ({document}) => {
          return {
            filter: 'taxonomy == $taxonomy && _id != $currentId',
            params: {
              taxonomy: document.taxonomy,
              currentId: document._id
            }
          }
        }
      }
    }),
  ],
  preview: {
    select: {
      title: 'name', // Select 'name' field (not 'title' which doesn't exist)
      taxonomy: 'taxonomy',
      parent: 'parent.name'
    },
    prepare({title, taxonomy, parent}) {
      // Helper function to format taxonomy to human-readable
      const formatTaxonomy = (tax: string): string => {
        const taxonomyMap: Record<string, string> = {
          'resourceType': 'Resource Type',
          'blogCategory': 'Blog Category',
          // Add more as you add taxonomies
        }
        return taxonomyMap[tax] || tax
          .split(/(?=[A-Z])/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      return {
        title: title || 'Untitled', // Use title from select (which is 'name' field)
        subtitle: parent
          ? `${formatTaxonomy(taxonomy)} • Child of ${parent}`
          : formatTaxonomy(taxonomy)
      }
    }
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
