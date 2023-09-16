import { Header } from "@/components";
import AccountContent from "./components/AccountContent";

const Account = () => {
  return (
    <div className="sectionCard">
      <Header className="from-neutral-900">
        <div className="flexCol mb-2 gap-y-6">
          <h1 className="text-3xl font-semibold text-white">
            Account settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};
export default Account;
