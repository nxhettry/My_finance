import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Transaction = {
  id: string;
  user_id: string;
  transaction_type: "receivable" | "payable" | "lent" | "borrowed";
  amount: number;
  description: string;
  date: string;
  party_name: string;
};

const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[];
}) => (
  <div className="bg-white text-black p-4 rounded-lg shadow-lg">
    <h3 className="text-lg font-semibold mb-4 ">Transaction History</h3>
    {transactions.length === 0 ? (
      <p>No transactions found.</p>
    ) : (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.date}</TableCell>
              <TableCell>{item.transaction_type}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell className="text-right">{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )}
  </div>
);

export default TransactionHistory;
