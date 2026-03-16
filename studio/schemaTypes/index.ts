import {SchemaTypeDefinition} from 'sanity'

// Document types
import blogPost from './documents/blogPost'
import landingPage from './documents/landingPage'
import event from './documents/event'
import person from './documents/person'
import pressRelease from './documents/pressRelease'
import pressCoverage from './documents/pressCoverage'
import page from './documents/page'
import partner from './documents/partner'
import glossaryTerm from './documents/glossaryTerm'
import guide from './documents/guide'
import product from './documents/product'
import solution from './documents/solution'
import customer from './documents/customer'
import company from './documents/company'
import component from './documents/component'
import cta from './documents/cta'
import quote from './documents/quote'

// Resource document types
import analystReport from './documents/resources/analystReport'
import caseStudyResource from './documents/resources/caseStudyResource'
import datasheet from './documents/resources/datasheet'
import demo from './documents/resources/demo'
import eguide from './documents/resources/eguide'
import infographic from './documents/resources/infographic'
import legal from './documents/resources/legal'
import listicle from './documents/resources/listicle'
import referenceArchitecture from './documents/resources/referenceArchitecture'
import solutionBrief from './documents/resources/solutionBrief'
import technicalBrief from './documents/resources/technicalBrief'
import useCase from './documents/resources/useCase'
import video from './documents/resources/video'
import webinar from './documents/resources/webinar'
import whitePaper from './documents/resources/whitePaper'

// Reference types
import category from './documents/category'
import tag from './documents/tag'

// Singleton documents
import siteSettings from './singletons/siteSettings'
import navigation from './singletons/navigation'
import seoDefaults from './singletons/seoDefaults'

// Object types
import seo from './objects/seo'
import migrationMetadata from './objects/migrationMetadata'
import resourceMetadata from './objects/resourceMetadata'
import wistia from './objects/wistia'
import quoteBlock from './objects/quoteBlock'
import actionLink from './objects/actionLink'
import logoVariant from './objects/logoVariant'
import companyBoilerplate from './objects/companyBoilerplate'
import lottieAnimation from './objects/lottieAnimation'
import tableOfContents from './objects/tableOfContents'

// Block types
import blockHero from './blocks/blockHero'
import blockFeatureGrid from './blocks/blockFeatureGrid'
import blockCta from './blocks/blockCta'
import blockTestimonial from './blocks/blockTestimonial'
import blockStats from './blocks/blockStats'
import blockForm from './blocks/blockForm'
import blockGallery from './blocks/blockGallery'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  blogPost,
  landingPage,
  event,
  pressRelease,
  pressCoverage,
  page,
  partner,
  glossaryTerm,
  guide,
  product,
  solution,
  customer,
  company,
  component,
  cta,
  quote,

  // Resource types
  analystReport,
  caseStudyResource,
  datasheet,
  demo,
  eguide,
  infographic,
  legal,
  listicle,
  referenceArchitecture,
  solutionBrief,
  technicalBrief,
  useCase,
  video,
  webinar,
  whitePaper,

  // References
  category,
  tag,
  person,

  // Singletons
  siteSettings,
  navigation,
  seoDefaults,

  // Objects
  seo,
  migrationMetadata,
  resourceMetadata,
  wistia,
  quoteBlock,
  actionLink,
  logoVariant,
  companyBoilerplate,
  lottieAnimation,
  tableOfContents,

  // Blocks
  blockHero,
  blockFeatureGrid,
  blockCta,
  blockTestimonial,
  blockStats,
  blockForm,
  blockGallery,
]
