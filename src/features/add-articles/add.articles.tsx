import React from "react";
import { FormAddArticles } from "./components/form.add.articles";
import BackLink from "@/components/back.link";

export default function AddArticles() {
  return (
    <div className="space-y-5 rounded-md bg-gray-50 p-12 shadow-md">
      <BackLink text="Create Articles" href="/articles" />
      <FormAddArticles />
    </div>
  );
}
