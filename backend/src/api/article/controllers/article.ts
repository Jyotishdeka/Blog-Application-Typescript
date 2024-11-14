import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { title, description, category, Body, author } = ctx.request.body;

       // Generate slug from title
       const slug = title
       .toLowerCase()
       .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
       .replace(/\s+/g, '-')         // Replace spaces with hyphens
       .replace(/-+/g, '-')          // Remove multiple hyphens
       .trim();

     console.log('Generated Slug:', slug);

      console.log('Request Body:', ctx.request.body);
      console.log('Request Files:', ctx.request.files);

      // Adjust file reference to match your actual file structure
      const files = ctx.request.files;
      let cover;

      if (files && files['files.cover']) {  // Adjusted file reference
        const coverFile = Array.isArray(files['files.cover']) ? files['files.cover'][0] : files['files.cover'];
        console.log('Cover File:', coverFile);

        const uploadService = strapi.plugin('upload').service('upload');
        const uploadedFile = await uploadService.upload({
          files: coverFile,
          data: {
            fileInfo: {
              caption: title,
              alternativeText: title,
              name: coverFile.originalFilename,  // Use original filename here
            },
          },
        });

        cover = uploadedFile[0]?.id;  // Get the ID of the uploaded file if successful
      }

      console.log('Uploaded Cover ID:', cover);

      // Create the article with the collected data
      const article = await strapi.entityService.create('api::article.article', {
        data: {
          title,
          description,
          slug,
          cover,
          category,
          Body,
          author,
        },
      });

      ctx.send({
        data: article,
        message: 'Article created successfully!',
      });
    } catch (error) {
      console.error('Error creating article:', error);
      ctx.throw(400, error);
    }
  },
}));
