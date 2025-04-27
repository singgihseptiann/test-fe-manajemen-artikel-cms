export type Article = {
    id: string;
    title: string;
    content: string;
    userId: string;
    categoryId: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    category: {
      id: string;
      name: string;
      userId: string;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      id: string;
      username: string;
      role: string;
    };
  };