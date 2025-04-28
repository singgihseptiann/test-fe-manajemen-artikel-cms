export type Category = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoriesResponse = {
  id: string;
  data: Category[];
  totalData: number;
  currentPage: number;
  totalPages: number;
};
