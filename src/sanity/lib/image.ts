import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env'; // Ensure you have these variables in your env file
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).url();
};
export default urlFor;