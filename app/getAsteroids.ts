import { z } from 'zod';

const validateAsteroidData = z.object({
  close_approach_data: z.array(
    z.object({
      close_approach_date: z.string(),
      miss_distance: z.object({
        kilometers: z.string(),
        lunar: z.string(),
      }),
    }),
  ),
  estimated_diameter: z.object({
    meters: z.object({
      estimated_diameter_max: z.number(),
    }),
  }),
  id: z.string(),
  name: z.string(),
  is_potentially_hazardous_asteroid: z.boolean(),
  links: z.object({
    self: z.string(),
  }),
});

export type AsteroidDataType = z.infer<typeof validateAsteroidData>;

const validateResponse = z.object({
  links: z.object({
    next: z.string(),
    prev: z.string(),
    self: z.string(),
  }),
  near_earth_objects: z.record(z.array(validateAsteroidData)),
});

type ResponseType = z.infer<typeof validateResponse>;

export const getAsteroids = async ({
  pageParam,
}: {
  pageParam: string;
}): Promise<ResponseType> => {
  const date = new Date();
  const formatDate = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2,
  )}-${`0${date.getDate()}`.slice(-2)}`;

  const queryParams = new URLSearchParams({
    start_date: formatDate,
    end_date: formatDate,
    api_key: 'DEMO_KEY',
  });

  const initLink = `https://api.nasa.gov/neo/rest/v1/feed?${queryParams}`;
  const currentLink = pageParam ?? initLink;

  const response = await fetch(currentLink);

  const validatedResponse = validateResponse.safeParse(await response.json());

  if (validatedResponse.success) {
    return validatedResponse.data;
  }

  throw new Error('Сервер вернул неверный формат данных');
};

getAsteroids.queryKey = 'getAsteroids';
