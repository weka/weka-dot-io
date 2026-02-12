import {defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'
import {LottieAnimationInput} from '../../components/LottieAnimationInput'
import {LottieAnimationPreview} from '../../components/LottieAnimationPreview'

export default defineType({
  name: 'lottieAnimation',
  title: 'Lottie Animation',
  type: 'object',
  icon: PlayIcon,
  fields: [
    {
      name: 'lottieFile',
      title: 'Lottie JSON File',
      type: 'file',
      options: {
        accept: '.json',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the animation for accessibility',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'loop',
      title: 'Loop Animation',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'speed',
      title: 'Playback Speed',
      type: 'number',
      validation: (Rule) => Rule.min(0.1).max(3),
      initialValue: 1,
    },
  ],
  preview: {
    select: {
      lottieFile: 'lottieFile',
      alt: 'alt',
      loop: 'loop',
      autoplay: 'autoplay',
      speed: 'speed',
    },
  },
  components: {
    input: LottieAnimationInput,
    preview: LottieAnimationPreview as any,
  },
})
