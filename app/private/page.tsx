import ExpandableCard from "@/components/ExpandableCards";
import { Toaster } from "sonner";
import TransactionHistory from "@/components/screens/home/TransactionHistory";
import AddNew from "@/components/screens/home/AddNew";


const FinancePage = () => {


  return (
    <div className="min-h-screen bg-gray-100 py-8 ">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <ExpandableCard />

        <AddNew />

        {/* <TransactionHistory transactions={transactions} /> */}
      </div>
    </div>
  );
};



export default FinancePage;
