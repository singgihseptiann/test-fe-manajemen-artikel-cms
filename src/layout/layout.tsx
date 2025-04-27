import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
