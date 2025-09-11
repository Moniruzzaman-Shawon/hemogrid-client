import Sidebar from "./Sidebar";
import TopNav from "./TopNav";


const DashboardLayout = ({ children, role }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <TopNav role={role} />
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
