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
  name: string;
  totalData: number;
  currentPage: number;
  totalPages: number;
};
