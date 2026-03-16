import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'logoVariant',
  title: 'Logo Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Black', value: 'black' },
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Color', value: 'color' },
          { title: 'Hero', value: 'hero' },
          { title: 'Tile', value: 'tile' },
          { title: 'Monochrome', value: 'monochrome' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional description of when to use this variant (e.g., "For dark backgrounds")',
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      media: 'image',
      description: 'description',
    },
    prepare({ variant, media, description }) {
      return {
        title: variant ? `${variant.charAt(0).toUpperCase()}${variant.slice(1)} variant` : 'Logo variant',
        subtitle: description || undefined,
        media,
      };
    },
  },
});
