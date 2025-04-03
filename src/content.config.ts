import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { defineConfig } from 'astro/config';

const home = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    contact: z.object({
      text: z.string(),
      anchor: z.object({
        text: z.string(),
        href: z.string().email(),
      }),
    }),
  }),
});

const aboutUs = defineCollection({
  type: 'data',
  schema: z.object({
    whoWeAre: z.object({
      title: z.string(),
      description: z.string()
    }),
    whyToChooseUs: z.object({
      title: z.string(),
      description: z.string(),
      experiences: z.array(z.object({
        title: z.string(),
        description: z.string()
      }))
    }),
  }),
});

const services = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      abbreviation: z.string()
    })
  )
})

const portafolio = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    clients: z.array(
      z.object({
        name: z.string(),
        url: z.string().url().optional()
      })
    )
  })
})

const contact = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subtitle: z.string(),
    form: z.object({
      fields: z.array(
        z.object({
          type: z.string(),
          placeholder: z.string(),
          name: z.string(),
          required: z.boolean().default(false),
        })
      ),
      anchor: z.object({
        text: z.string(),
        action: z.string(),
        href: z.string()
      })
    })
  }),
});

export const collections = {
  home,
  aboutUs,
  services,
  portafolio,
  contact
};
