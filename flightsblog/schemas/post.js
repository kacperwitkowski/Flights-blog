export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "originCity",
      title: "Origin City",
      type: "string",
    },
    {
      name: "destinationCity",
      title: "Destination City",
      type: "string",
    },
    {
      name: "fullPrice",
      title: "Price",
      type: "number",
    },
    {
      name: "tourLenght",
      title: "Tour Length",
      type: "string",
    },
    {
      name: "nmbOfTransfers",
      title: "Transfers",
      type: "number",
    },
    {
      name: "dateWhen",
      title: "Date of Travel",
      type: "string",
    },
    {
      name: "accomodationLink",
      title: "Accomodation",
      type: "string",
    },
    {
      name: "ticketLink",
      title: "Ticket Link",
      type: "string",
    },
    {
      name: "travelDatesLink",
      title: "Travel Days Link",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
