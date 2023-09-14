import { z } from 'zod';

const validateAsteroid = z.object({
  close_approach_date_full: z.string(),
  miss_distance: z.object({
    kilometers: z.string(),
    lunar: z.string(),
  }),
  orbiting_body: z.string(),
  relative_velocity: z.object({
    kilometers_per_second: z.string(),
  }),
});

export type Asteroid = z.infer<typeof validateAsteroid>;

const validateResponse = z.object({
  close_approach_data: z.array(validateAsteroid),
  id: z.string(),
  name: z.string(),
});

type ResponseType = z.infer<typeof validateResponse>;

export const getAsteroid = async ({
  id,
}: {
  id: string;
}): Promise<ResponseType> => {
  const queryParams = new URLSearchParams({
    api_key: 'DEMO_KEY',
  });

  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?${queryParams}`,
  );

  const validatedResponse = validateResponse.safeParse(await response.json());

  if (validatedResponse.success) {
    return validatedResponse.data;
  }

  throw new Error('Сервер вернул неверный формат данных');
};

getAsteroid.queryKey = 'getAsteroid';
