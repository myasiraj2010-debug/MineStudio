import { z } from 'zod';
export const projectSchema = z.object({ name:z.string().trim().min(1,'Enter a project name').max(48), duration:z.coerce.number().min(1).max(300) });
export type ProjectFormValues = z.infer<typeof projectSchema>;
